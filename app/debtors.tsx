import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

type Debt = {
  id: string;
  name: string;
  category: string;
  amount: number;
  avatarLetter: string;
  avatarColor: string;
};

const DEBTS: Debt[] = [
  { id: '1', name: 'Ana Clara Silva', category: 'Internet',            amount: 80, avatarLetter: 'A', avatarColor: '#c0392b' },
  { id: '2', name: 'João Pedro',      category: 'Mercado',             amount: 80, avatarLetter: 'J', avatarColor: '#2980b9' },
  { id: '3', name: 'Maria do Silva',  category: 'Ação Recomendada Luz',amount: 80, avatarLetter: 'M', avatarColor: '#1abc9c' },
  { id: '4', name: 'João Clara Silva',category: 'Ação Recomendada Luz',amount: 80, avatarLetter: 'J', avatarColor: '#8e44ad' },
];

export default function DebtorsScreen() {
  const router = useRouter();
  const [paid, setPaid] = useState<string[]>([]);

  const handlePay = (id: string, name: string) => {
    Alert.alert('Pagar', `Confirmar pagamento para ${name}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Confirmar', onPress: () => setPaid(prev => [...prev, id]) },
    ]);
  };

  const handleAttach = (name: string) => {
    Alert.alert('Comprovante', `Anexar comprovante para ${name} (em breve).`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>🏠 <Text style={styles.brand}>DivMorada</Text></Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Dívidas a Pagar (Eu Devo)</Text>

        {DEBTS.map(debt => (
          <View key={debt.id} style={[styles.card, paid.includes(debt.id) && styles.cardPaid]}>
            <View style={styles.cardTop}>
              <View style={[styles.avatar, { backgroundColor: debt.avatarColor }]}>
                <Text style={styles.avatarText}>{debt.avatarLetter}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{debt.name}</Text>
                <Text style={styles.category}>{debt.category}</Text>
              </View>
              <Text style={styles.amount}>R$ {debt.amount.toFixed(2).replace('.', ',')}</Text>
            </View>

            <View style={styles.actions}>
              {paid.includes(debt.id) ? (
                <View style={styles.paidBadge}>
                  <Text style={styles.paidBadgeText}>✓ Pago</Text>
                </View>
              ) : (
                <>
                  <TouchableOpacity style={styles.btnPay} onPress={() => handlePay(debt.id, debt.name)}>
                    <Text style={styles.btnPayText}>Pagar Agora</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAttach} onPress={() => handleAttach(debt.name)}>
                    <Text style={styles.btnAttachText}>Anexar Comprovante</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        ))}
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

  content:   { padding: 16, paddingBottom: 32 },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 18 },

  card: {
    backgroundColor: '#fff', borderRadius: 14,
    padding: 16, marginBottom: 14,
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 4,
  },
  cardPaid: { opacity: 0.6 },
  cardTop:  { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },

  avatar:     { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  info:       { flex: 1 },
  name:       { fontSize: 15, fontWeight: '700', color: '#222' },
  category:   { fontSize: 12, color: '#888', marginTop: 2 },
  amount:     { fontSize: 16, fontWeight: 'bold', color: '#222' },

  actions: { flexDirection: 'row', gap: 10 },
  btnPay:  { backgroundColor: '#1abc9c', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  btnPayText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  btnAttach:     { borderWidth: 1, borderColor: '#ccc', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  btnAttachText: { color: '#555', fontSize: 13 },

  paidBadge:     { backgroundColor: '#eafaf1', borderWidth: 1, borderColor: '#1abc9c', borderRadius: 8, paddingVertical: 7, paddingHorizontal: 16 },
  paidBadgeText: { color: '#1abc9c', fontWeight: '700', fontSize: 13 },
});
