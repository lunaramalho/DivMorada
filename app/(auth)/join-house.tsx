// app/(auth)/join-house.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert, KeyboardAvoidingView, Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Tab = 'join' | 'create';

export default function JoinHouseScreen() {
  const router = useRouter();
  const [tab, setTab]           = useState<Tab>('join');
  const [code, setCode]         = useState('');
  const [houseName, setHouseName] = useState('');

  const handleJoin = () => {
    if (!code.trim()) {
      Alert.alert('Atenção', 'Digite o código de convite da casa.');
      return;
    }
    Alert.alert('Solicitação enviada!', `Pedido para entrar na casa com código "${code.toUpperCase()}" enviado. Aguarde o administrador confirmar.`, [
      { text: 'OK', onPress: () => router.replace('/(tabs)') },
    ]);
  };

  const handleCreate = () => {
    if (!houseName.trim()) {
      Alert.alert('Atenção', 'Digite um nome para a sua casa.');
      return;
    }
    Alert.alert('Casa criada!', `"${houseName}" foi criada com sucesso! Compartilhe o código de convite com os moradores.`, [
      { text: 'OK', onPress: () => router.replace('/(tabs)') },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

          {/* LOGO */}
          <View style={styles.logoRow}>
            <Text style={styles.logo}>🏠 <Text style={styles.brand}>DivMorada</Text></Text>
          </View>

          {/* ÍCONE */}
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons name="home-group" size={72} color="#1abc9c" />
          </View>

          <Text style={styles.title}>Bem-vindo ao DivMorada!</Text>
          <Text style={styles.subtitle}>
            Para começar, entre em uma casa existente usando o código de convite, ou crie uma nova casa para seus moradores.
          </Text>

          {/* ABAS */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tabBtn, tab === 'join' && styles.tabBtnActive]}
              onPress={() => setTab('join')}
            >
              <Text style={[styles.tabText, tab === 'join' && styles.tabTextActive]}>
                Entrar em uma Casa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, tab === 'create' && styles.tabBtnActive]}
              onPress={() => setTab('create')}
            >
              <Text style={[styles.tabText, tab === 'create' && styles.tabTextActive]}>
                Criar Nova Casa
              </Text>
            </TouchableOpacity>
          </View>

          {/* CONTEÚDO DA ABA */}
          {tab === 'join' ? (
            <View style={styles.card}>
              <View style={styles.cardIconRow}>
                <MaterialCommunityIcons name="key-variant" size={28} color="#1abc9c" />
                <Text style={styles.cardTitle}>Código de Convite</Text>
              </View>
              <Text style={styles.cardDesc}>
                Peça o código ao administrador da casa e cole abaixo.
              </Text>
              <View style={styles.codeInputRow}>
                <TextInput
                  style={styles.codeInput}
                  placeholder="Ex: R7XY39"
                  placeholderTextColor="#bbb"
                  value={code}
                  onChangeText={t => setCode(t.toUpperCase())}
                  autoCapitalize="characters"
                  maxLength={8}
                />
              </View>
              <TouchableOpacity style={styles.btnPrimary} onPress={handleJoin}>
                <Text style={styles.btnPrimaryText}>Entrar na Casa</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.card}>
              <View style={styles.cardIconRow}>
                <MaterialCommunityIcons name="home-plus-outline" size={28} color="#1abc9c" />
                <Text style={styles.cardTitle}>Nova Casa</Text>
              </View>
              <Text style={styles.cardDesc}>
                Você será o administrador. Depois poderá convidar os moradores com um código.
              </Text>
              <View style={styles.inputWrap}>
                <MaterialCommunityIcons name="home-outline" size={20} color="#aaa" style={{ marginRight: 8 }} />
                <TextInput
                  style={styles.nameInput}
                  placeholder="Nome da casa (ex: República Central)"
                  placeholderTextColor="#bbb"
                  value={houseName}
                  onChangeText={setHouseName}
                />
              </View>
              <TouchableOpacity style={styles.btnPrimary} onPress={handleCreate}>
                <Text style={styles.btnPrimaryText}>Criar Casa 🏠</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* VOLTAR */}
          <TouchableOpacity style={styles.btnBack} onPress={() => router.back()}>
            <Text style={styles.btnBackText}>← Voltar para o Login</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: '#f4f6f5' },
  content: { padding: 24, paddingBottom: 48, alignItems: 'center' },

  logoRow: { width: '100%', marginBottom: 8 },
  logo:    { fontSize: 22, fontWeight: 'bold', color: '#333' },
  brand:   { color: '#1abc9c' },

  iconWrap: { marginTop: 16, marginBottom: 16 },
  title:    { fontSize: 22, fontWeight: 'bold', color: '#222', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#777', textAlign: 'center', lineHeight: 20, marginBottom: 28, paddingHorizontal: 8 },

  /* Abas */
  tabRow: {
    flexDirection: 'row', width: '100%',
    backgroundColor: '#e8f8f5', borderRadius: 12,
    padding: 4, marginBottom: 20,
  },
  tabBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center',
  },
  tabBtnActive: { backgroundColor: '#1abc9c' },
  tabText:      { fontSize: 13, fontWeight: '600', color: '#888' },
  tabTextActive:{ color: '#fff' },

  /* Card */
  card: {
    width: '100%', backgroundColor: '#fff',
    borderRadius: 16, padding: 20,
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 6,
    marginBottom: 20,
  },
  cardIconRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  cardTitle:   { fontSize: 17, fontWeight: 'bold', color: '#222' },
  cardDesc:    { fontSize: 13, color: '#888', lineHeight: 18, marginBottom: 18 },

  /* Input código */
  codeInputRow: {
    borderWidth: 2, borderColor: '#1abc9c', borderRadius: 12,
    marginBottom: 18, paddingHorizontal: 16,
  },
  codeInput: {
    height: 52, fontSize: 26, fontWeight: 'bold',
    color: '#222', textAlign: 'center', letterSpacing: 6,
  },

  /* Input nome */
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#ddd', borderRadius: 12,
    paddingHorizontal: 14, marginBottom: 18, backgroundColor: '#fafafa',
  },
  nameInput: { flex: 1, height: 48, fontSize: 14, color: '#333' },

  btnPrimary: {
    backgroundColor: '#1abc9c', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center',
  },
  btnPrimaryText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },

  btnBack:     { marginTop: 8 },
  btnBackText: { color: '#888', fontSize: 14 },
});
