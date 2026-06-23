import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏠 DivMorada</Text>
      </View>

      {/* Card de Saldo */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Seu Saldo Líquido</Text>
        <Text style={styles.balanceValue}>+ R$ 250,50</Text>
        <View style={styles.divider} />
        <View style={styles.row}>
          <View style={styles.infoBox}>
            <View style={[styles.dot, { backgroundColor: '#ff4d4d' }]} />
            <Text style={styles.subValue}>- R$ 120,00</Text>
            <Text style={styles.subLabel}>Você deve</Text>
          </View>
          <View style={styles.infoBox}>
            <View style={[styles.dot, { backgroundColor: '#2ecc71' }]} />
            <Text style={styles.subValue}>+ R$ 370,50</Text>
            <Text style={styles.subLabel}>Te devem</Text>
          </View>
        </View>
      </View>

      {/* Botões de Ação */}
      <View style={styles.buttonRow}>
        {/* Quem Me Deve → ReceivablesScreen */}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#2ecc71' }]}
          onPress={() => router.push('/receivables')}
        >
          <MaterialCommunityIcons name="arrow-down-circle-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Quem Me Deve</Text>
        </TouchableOpacity>

        {/* A Pagar → DebtorsScreen */}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#e74c3c' }]}
          onPress={() => router.push('/debtors')}
        >
          <MaterialCommunityIcons name="arrow-up-circle-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>A Pagar</Text>
        </TouchableOpacity>
      </View>

      {/* Atividades Recentes */}
      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>Atividades Recentes</Text>
        <View style={styles.activityItem}>
          <View style={[styles.iconCircle, { backgroundColor: '#5D6D7E' }]}>
            <MaterialCommunityIcons name="wifi" size={24} color="white" />
          </View>
          <View>
            <Text style={styles.activityText}>Internet (João pagou)</Text>
            <Text style={styles.activitySubtext}>Sua parte: -R$ 45,00</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9f9', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 40 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1abc9c' },

  balanceCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  balanceLabel: { color: '#7f8c8d', fontSize: 16 },
  balanceValue: { fontSize: 32, fontWeight: 'bold', color: '#1abc9c', marginVertical: 10 },
  divider: { height: 1, backgroundColor: '#ecf0f1', width: '100%', marginVertical: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  infoBox: { alignItems: 'center' },
  dot: { width: 10, height: 10, borderRadius: 5, marginBottom: 5 },
  subValue: { fontWeight: 'bold', fontSize: 16 },
  subLabel: { color: '#7f8c8d', fontSize: 12 },

  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, gap: 12 },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 14 },

  activitySection: { marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  activityItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  iconCircle: { width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  activityText: { fontSize: 16, fontWeight: '600' },
  activitySubtext: { color: '#7f8c8d' },
});
