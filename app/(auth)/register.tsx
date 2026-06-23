import { Input } from '@/components/Input';
import { COLORS } from '@/styles/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView, Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();

  const [fullName, setFullName]         = useState('');
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [confirmPassword, setConfirm]   = useState('');

  const handleRegister = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }
    // TODO: chamar API de cadastro
    Alert.alert('Sucesso', 'Conta criada com sucesso!', [
      { text: 'OK', onPress: () => router.replace('/login') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* LOGO */}
          <View style={styles.header}>
            <Text style={styles.logo}>
              🏠 <Text style={{ color: COLORS.primary }}>DivMorada</Text>
            </Text>
          </View>

          {/* CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Criar Nova Conta</Text>

            <Text style={styles.sectionLabel}>Informações do Usuário</Text>

            {/* AVATAR */}
            <View style={styles.avatarRow}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarLetter}>
                  {fullName.trim().charAt(0).toUpperCase() || 'A'}
                </Text>
              </View>
              <TouchableOpacity style={styles.avatarTextBox}>
                <Text style={styles.avatarHint}>Clique para escolher sua foto{'\n'}de perfil</Text>
              </TouchableOpacity>
            </View>

            {/* NOME */}
            <Input
              label="Nome Completo:"
              placeholder="Ana Paula Silva"
              value={fullName}
              onChangeText={setFullName}
            />

            {/* EMAIL */}
            <Input
              label="E-mail:"
              placeholder="ana.silva@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* SENHA */}
            <Input
              label="Senha (mínimo 6 caracteres):"
              placeholder="••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* CONFIRMAR SENHA */}
            <Input
              label="Confirmar Senha:"
              placeholder="••••••"
              value={confirmPassword}
              onChangeText={setConfirm}
              secureTextEntry
            />
          </View>

          {/* BOTÃO */}
          <TouchableOpacity style={styles.mainBtn} onPress={handleRegister}>
            <Text style={styles.mainBtnText}>Cadastrar &amp; Começar</Text>
          </TouchableOpacity>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Já tem conta? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.linkText}>Entrar</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  content:   { paddingHorizontal: 24, paddingVertical: 32 },

  header: { alignItems: 'center', marginBottom: 24 },
  logo:   { fontSize: 28, fontWeight: 'bold', color: '#333' },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginBottom: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  /* Avatar */
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  avatarTextBox: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  avatarHint: { color: '#777', fontSize: 13, lineHeight: 18 },

  /* Botão principal */
  mainBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  mainBtnText: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },

  /* Rodapé */
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#888', fontSize: 14 },
  linkText:   { color: COLORS.primary, fontWeight: 'bold', fontSize: 14 },
});
