import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Person = {
  id: string;
  name: string;
  short: string;
  avatarLetter: string;
  avatarColor: string;
};

const PEOPLE: Person[] = [
  { id: '1', name: 'Ana',   short: 'Ana',  avatarLetter: 'A', avatarColor: '#c0392b' },
  { id: '2', name: 'João',  short: 'João', avatarLetter: 'J', avatarColor: '#2980b9' },
  { id: '3', name: 'Maria', short: 'Maria',avatarLetter: 'M', avatarColor: '#1abc9c' },
  { id: '4', name: 'Você',  short: 'You',  avatarLetter: 'Y', avatarColor: '#e67e22' },
];

export default function AddExpenseScreen() {
  const router = useRouter();

  const [expenseName, setExpenseName]     = useState('');
  const [totalValue, setTotalValue]       = useState('');
  const [payerId, setPayerId]             = useState<string | null>(null);
  const [participants, setParticipants]   = useState<string[]>([]);

  const toggleParticipant = (id: string) => {
    setParticipants(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const valuePerPerson = useMemo(() => {
    const total = parseFloat(totalValue.replace(',', '.'));
    if (!total || participants.length === 0) return 0;
    return total / participants.length;
  }, [totalValue, participants]);

  const handleCancel = () => {
    router.back();
  };

  const handleSave = () => {
    if (!expenseName.trim()) {
      Alert.alert('Atenção', 'Informe o nome da despesa.');
      return;
    }
    if (!totalValue || parseFloat(totalValue.replace(',', '.')) <= 0) {
      Alert.alert('Atenção', 'Informe o valor total.');
      return;
    }
    if (!payerId) {
      Alert.alert('Atenção', 'Selecione quem pagou.');
      return;
    }
    if (participants.length === 0) {
      Alert.alert('Atenção', 'Selecione os participantes.');
      return;
    }

    Alert.alert(
      '✅ Despesa adicionada com sucesso!',
      `"${expenseName}" de R$ ${parseFloat(totalValue.replace(',', '.')).toFixed(2)} foi registrada e dividida entre ${participants.length} pessoa(s).`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.backBtn}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>🏠 <Text style={styles.brand}>DivMorada</Text></Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* CARD DETALHES BÁSICOS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nova Despesa</Text>

          <Text style={styles.fieldLabel}>Detalhes Básicos</Text>
          <Text style={styles.subLabel}>Nome da Despesa:</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="ex: Internet"
              placeholderTextColor="#bbb"
              value={expenseName}
              onChangeText={setExpenseName}
            />
            <Text style={styles.inputIcon}>✏️</Text>
          </View>

          <Text style={styles.subLabel}>Valor total (R$):</Text>
          <View style={styles.valueRow}>
            <Text style={styles.currencyLabel}>R$</Text>
            <TextInput
              style={styles.valueInput}
              placeholder="0.00"
              placeholderTextColor="#bbb"
              keyboardType="decimal-pad"
              value={totalValue}
              onChangeText={setTotalValue}
            />
          </View>
        </View>

        {/* QUEM PAGOU */}
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Quem Participa e Como Divide</Text>
          <Text style={styles.subLabel}>Quem Pagou? (Selecione um)</Text>
          <View style={styles.avatarRow}>
            {PEOPLE.map(p => (
              <TouchableOpacity
                key={p.id}
                style={styles.avatarCol}
                onPress={() => setPayerId(p.id)}
              >
                <View style={[
                  styles.avatarCircle,
                  { backgroundColor: p.avatarColor },
                  payerId === p.id && styles.avatarSelected,
                ]}>
                  <Text style={styles.avatarLetter}>{p.avatarLetter}</Text>
                  {payerId === p.id && (
                    <View style={styles.checkBadge}>
                      <Text style={styles.checkText}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.avatarName}>{p.short}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* QUEM PARTICIPA */}
        <View style={styles.card}>
          <Text style={styles.subLabel}>Quem Participa e Valor p/ Pessoa</Text>
          <Text style={styles.subLabel}>Quem Participa? (Selecione todos)</Text>
          <View style={styles.avatarRow}>
            {PEOPLE.map(p => (
              <TouchableOpacity
                key={p.id}
                style={styles.avatarCol}
                onPress={() => toggleParticipant(p.id)}
              >
                <View style={[
                  styles.avatarCircle,
                  { backgroundColor: p.avatarColor },
                  participants.includes(p.id) && styles.avatarSelected,
                ]}>
                  <Text style={styles.avatarLetter}>{p.avatarLetter}</Text>
                  {participants.includes(p.id) && (
                    <View style={styles.checkBadge}>
                      <Text style={styles.checkText}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.avatarName}>{p.short}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* RESUMO DO CÁLCULO */}
          {participants.length > 0 && valuePerPerson > 0 && (
            <View style={styles.calcBox}>
              <Text style={styles.calcTitle}>
                VALOR P/ PESSOA: R$ {valuePerPerson.toFixed(2).replace('.', ',')}
              </Text>
              <View style={styles.calcGrid}>
                {participants.map(pid => {
                  const person = PEOPLE.find(p => p.id === pid);
                  return (
                    <Text key={pid} style={styles.calcItem}>
                      {person?.name} (R$ {valuePerPerson.toFixed(0)})
                    </Text>
                  );
                })}
              </View>
            </View>
          )}
        </View>

        {/* BOTÕES SALVAR + CANCELAR */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.btnCancel} onPress={handleCancel}>
            <Text style={styles.btnCancelText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
            <Text style={styles.btnSaveText}>Salvar Despesa</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#f4f6f5' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 10,
    backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee',
  },
  backBtn:   { marginRight: 10, padding: 4 },
  backArrow: { fontSize: 30, color: '#1abc9c', lineHeight: 32 },
  logo:      { fontSize: 20, fontWeight: 'bold', color: '#333' },
  brand:     { color: '#1abc9c' },

  content: { padding: 16, paddingBottom: 40 },

  card: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16,
    marginBottom: 16, elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 4,
  },
  cardTitle:  { fontSize: 20, fontWeight: 'bold', color: '#222', marginBottom: 14 },
  fieldLabel: { fontSize: 15, fontWeight: '700', color: '#333', marginBottom: 10 },
  subLabel:   { fontSize: 13, color: '#555', marginBottom: 6, fontWeight: '600' },

  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#ddd', borderRadius: 10,
    paddingHorizontal: 12, marginBottom: 14, backgroundColor: '#fafafa',
  },
  input:     { flex: 1, height: 44, fontSize: 14, color: '#333' },
  inputIcon: { fontSize: 16 },

  valueRow: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#1abc9c', borderRadius: 10,
    paddingHorizontal: 14, height: 52, backgroundColor: '#fafafa',
  },
  currencyLabel: { fontSize: 16, fontWeight: '700', color: '#1abc9c', marginRight: 8 },
  valueInput:    { flex: 1, fontSize: 22, fontWeight: 'bold', color: '#222' },

  avatarRow: { flexDirection: 'row', gap: 16, marginTop: 6, marginBottom: 4 },
  avatarCol: { alignItems: 'center', gap: 6 },
  avatarCircle: {
    width: 52, height: 52, borderRadius: 26,
    alignItems: 'center', justifyContent: 'center', position: 'relative',
  },
  avatarSelected: { borderWidth: 3, borderColor: '#1abc9c' },
  avatarLetter:   { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  avatarName:     { fontSize: 12, color: '#555', fontWeight: '600' },

  checkBadge: {
    position: 'absolute', bottom: -2, right: -2,
    backgroundColor: '#1abc9c', borderRadius: 10, width: 18, height: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  checkText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },

  calcBox: {
    backgroundColor: '#f0fdf8', borderRadius: 10,
    padding: 14, marginTop: 14, borderWidth: 1, borderColor: '#b2dfdb',
  },
  calcTitle: { fontWeight: 'bold', color: '#1abc9c', fontSize: 14, marginBottom: 8 },
  calcGrid:  { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  calcItem:  { fontSize: 13, color: '#444', width: '45%' },

  // Linha com os dois botões lado a lado
  btnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },

  btnCancel: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#1abc9c',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  btnCancelText: {
    color: '#1abc9c',
    fontWeight: 'bold',
    fontSize: 16,
  },

  btnSave: {
    flex: 1,
    backgroundColor: '#1abc9c',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  btnSaveText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
