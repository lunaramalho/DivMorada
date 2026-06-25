import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Image, TouchableOpacity,
  SafeAreaView, KeyboardAvoidingView, Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/styles/theme';
import { Input } from '@/components/Input';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const router      = useRouter();
  const { login }   = useAuth();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  async function handleLogin() {
    setError('');
    if (!email.trim()) { setError('Informe seu e-mail.'); return; }
    if (!password)     { setError('Informe sua senha.');  return; }

    try {
      setLoading(true);
      await login(email.trim(), password);
      // AuthGuard redireciona automaticamente para /(tabs) após login
    } catch (e: any) {
      setError(e.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        {/* LOGO */}
        <View style={styles.header}>
          <Text style={styles.logo}>
            🏠 <Text style={{ color: COLORS.primary }}>DivMorada</Text>
          </Text>
          <Text style={styles.subtitle}>Entre na sua conta</Text>
        </View>

        {/* GOOGLE BUTTON */}
        <TouchableOpacity style={styles.googleBtn}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
            style={styles.googleIcon}
          />
          <Text style={styles.googleBtnText}>Continuar com Google</Text>
        </TouchableOpacity>

        {/* DIVIDER */}
        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>OU</Text>
          <View style={styles.line} />
        </View>

        {/* FORM */}
        <Input
          label="Email"
          placeholder="seu@email.com"
          value={email}
          onChangeText={t => { setEmail(t); setError(''); }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Senha"
          placeholder="........"
          value={password}
          onChangeText={t => { setPassword(t); setError(''); }}
          secureTextEntry
        />

        {/* ERRO */}
        {!!error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}

        {/* BOTÃO ENTRAR */}
        <TouchableOpacity
          style={[styles.mainBtn, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#FFF" />
            : <Text style={styles.mainBtnText}>Entrar</Text>
          }
        </TouchableOpacity>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Não tem conta? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text style={styles.linkText}>Criar conta</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content:   { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },
  header:    { alignItems: 'center', marginBottom: 40 },
  logo:      { fontSize: 32, fontWeight: 'bold' },
  subtitle:  { color: '#888', fontSize: 16, marginTop: 10 },

  googleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#ddd', borderRadius: 12,
    paddingVertical: 14, marginBottom: 30,
  },
  googleIcon:    { width: 20, height: 20, marginRight: 10 },
  googleBtnText: { fontSize: 16, fontWeight: '500', color: '#333' },

  dividerRow:  { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  line:        { flex: 1, height: 1, backgroundColor: '#eee' },
  dividerText: { marginHorizontal: 15, color: '#999', fontSize: 12 },

  errorBox:  { backgroundColor: '#fdecea', borderRadius: 10, padding: 12, marginTop: 8 },
  errorText: { color: '#c0392b', fontSize: 13, fontWeight: '500' },

  mainBtn:     { backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 18, alignItems: 'center', marginTop: 20 },
  mainBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },

  footer:     { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  footerText: { color: '#888', fontSize: 14 },
  linkText:   { color: COLORS.primary, fontWeight: 'bold', fontSize: 14 },
});
