import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Clipboard,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type Role = 'Administrador' | 'Membro';

type Resident = {
  id: string;
  name: string;
  role: Role;
  avatarLetter: string;
  avatarColor: string;
  confirmed: boolean;
};

const INITIAL_RESIDENTS: Resident[] = [
  { id: '1', name: 'Ana',   role: 'Administrador', avatarLetter: 'A', avatarColor: '#c0392b', confirmed: true },
  { id: '2', name: 'João',  role: 'Membro',        avatarLetter: 'J', avatarColor: '#2980b9', confirmed: true },
  { id: '3', name: 'Maria', role: 'Membro',        avatarLetter: 'M', avatarColor: '#1abc9c', confirmed: true },
  { id: '4', name: 'Carlos',role: 'Membro',        avatarLetter: 'C', avatarColor: '#8e44ad', confirmed: true },
  { id: '5', name: 'Pedro', role: 'Membro',        avatarLetter: 'P', avatarColor: '#e67e22', confirmed: false },
];

const INVITE_CODE = 'R7XY39';

export default function HouseScreen() {
  const router = useRouter();
  const [residents, setResidents] = useState<Resident[]>(INITIAL_RESIDENTS);
  const [inviteInput, setInviteInput] = useState('');

  const handleCopyCode = () => {
    Clipboard.setString(INVITE_CODE);
    Alert.alert('Copiado!', `Código ${INVITE_CODE} copiado.`);
  };

  const handleConfirm = (id: string) => {
    setResidents(prev =>
      prev.map(r => r.id === id ? { ...r, confirmed: true } : r)
    );
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert('Remover', `Remover ${name} da casa?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () =>
          setResidents(prev => prev.filter(r => r.id !== id))
      },
    ]);
  };

  const handleJoinHouse = () => {
    if (!inviteInput.trim()) {
      Alert.alert('Atenção', 'Cole ou digite o código de convite.');
      return;
    }
    Alert.alert('Solicitação enviada', `Pedido para entrar na casa com código "${inviteInput.trim()}" enviado!`);
    setInviteInput('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>🏠 <Text style={styles.brand}>DivMorada</Text></Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Moradores da Casa</Text>

        {/* NOME DA CASA */}
        <View style={styles.houseNameBadge}>
          <Text style={styles.houseNameText}>CASA REPÚBLICA CENTRAL</Text>
        </View>

        {/* LISTA DE MORADORES */}
        {residents.map(r => (
          <View key={r.id} style={styles.residentRow}>
            {/* Avatar */}
            <View style={[styles.avatar, { backgroundColor: r.avatarColor }]}>
              <Text style={styles.avatarText}>{r.avatarLetter}</Text>
            </View>

            {/* Nome e papel */}
            <View style={styles.residentInfo}>
              <Text style={styles.residentName}>{r.name}</Text>
              <Text style={[
                styles.residentRole,
                r.role === 'Administrador' && styles.roleAdmin,
              ]}>{r.role}</Text>
            </View>

            {/* Ações */}
            <View style={styles.residentActions}>
              {!r.confirmed ? (
                <TouchableOpacity
                  style={styles.btnConfirm}
                  onPress={() => handleConfirm(r.id)}
                >
                  <Text style={styles.btnConfirmText}>Confirmar Novo</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity style={styles.iconBtn}>
                    <MaterialCommunityIcons name="phone" size={20} color="#1abc9c" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBtn}>
                    <MaterialCommunityIcons name="account-edit" size={20} color="#2980b9" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => handleDelete(r.id, r.name)}
                  >
                    <MaterialCommunityIcons name="trash-can-outline" size={20} color="#e74c3c" />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        ))}

        {/* CÓDIGO DE CONVITE */}
        <View style={styles.inviteSection}>
          <Text style={styles.inviteLabel}>CÓDIGO DE CONVITE:</Text>
          <TouchableOpacity style={styles.inviteCodeRow} onPress={handleCopyCode}>
            <Text style={styles.inviteCode}>{INVITE_CODE}</Text>
            <MaterialCommunityIcons name="content-copy" size={18} color="#555" />
          </TouchableOpacity>
        </View>

        {/* BOTÃO ADICIONAR DESPESA */}
        <TouchableOpacity
          style={styles.btnAddExpense}
          onPress={() => router.push('/add-expense')}
        >
          <Text style={styles.btnAddExpenseText}>Adicionar Nova Despesa </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: '#f4f6f5' },
  header:  { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
  logo:    { fontSize: 22, fontWeight: 'bold', color: '#333' },
  brand:   { color: '#1abc9c' },

  content:  { padding: 20, paddingBottom: 40 },
  pageTitle:{ fontSize: 22, fontWeight: 'bold', color: '#222', marginBottom: 14 },

  houseNameBadge: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
    paddingVertical: 8, paddingHorizontal: 14,
    alignSelf: 'flex-start', marginBottom: 20,
  },
  houseNameText: { fontWeight: '700', color: '#333', fontSize: 13, letterSpacing: 0.5 },

  residentRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 12,
    padding: 12, marginBottom: 10,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 3,
  },
  avatar:      { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText:  { color: '#fff', fontWeight: 'bold', fontSize: 17 },
  residentInfo:{ flex: 1 },
  residentName:{ fontSize: 15, fontWeight: '700', color: '#222' },
  residentRole:{ fontSize: 12, color: '#888', marginTop: 2 },
  roleAdmin:   { color: '#1abc9c', fontWeight: '600' },

  residentActions: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  iconBtn:         { padding: 6 },

  btnConfirm:     { backgroundColor: '#1abc9c', borderRadius: 8, paddingVertical: 7, paddingHorizontal: 12 },
  btnConfirmText: { color: '#fff', fontWeight: '700', fontSize: 12 },

  inviteSection: { flexDirection: 'row', alignItems: 'center', marginTop: 22, marginBottom: 12, gap: 8 },
  inviteLabel:   { fontWeight: '700', color: '#444', fontSize: 13 },
  inviteCodeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#eee', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12 },
  inviteCode:    { fontWeight: 'bold', fontSize: 16, color: '#222', letterSpacing: 2 },

  joinRow:  { flexDirection: 'row', gap: 8, marginBottom: 24 },
  joinInput:{
    flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 10,
    paddingVertical: 10, paddingHorizontal: 14, fontSize: 13, color: '#333', backgroundColor: '#fff',
  },
  btnJoin:     { backgroundColor: '#1abc9c', borderRadius: 10, paddingHorizontal: 16, justifyContent: 'center' },
  btnJoinText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  btnAddExpense: {
    backgroundColor: '#1abc9c', borderRadius: 14,
    paddingVertical: 18, alignItems: 'center',
  },
  btnAddExpenseText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
