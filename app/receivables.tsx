import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert, Linking,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Receivable = {
  id: string;
  name: string;
  category: string;
  amount: number;
  avatarLetter: string;
  avatarColor: string;
  email?: string;
};

const RECEIVABLES: Receivable[] = [
  { id: '1', name: 'Ana Clara Silva', category: 'Internet',             amount: 80, avatarLetter: 'A', avatarColor: '#c0392b', email: 'ana@email.com' },
  { id: '2', name: 'João Pedro',      category: 'Mercado',              amount: 80, avatarLetter: 'J', avatarColor: '#2980b9', email: 'joao@email.com' },
  { id: '3', name: 'Maria do Silva',  category: 'Ação Recomendada Luz', amount: 80, avatarLetter: 'M', avatarColor: '#1abc9c', email: 'maria@email.com' },
  { id: '4', name: 'João Clara Silva',category: 'Ação Recomendada Luz', amount: 80, avatarLetter: 'J', avatarColor: '#8e44ad', email: 'joaoclara@email.com' },
];

export default function ReceivablesScreen() {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState<string[]>([]);

  const handleMarkPaid = (id: string, name: string) => {
    Alert.alert('Confirmar', `Marcar pagamento de ${name} como recebido?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Confirmar', onPress: () => setConfirmed(prev => [...prev, id]) },
    ]);
  };

  const handleSendEmail = (name: string, amount: number, email?: string) => {
    if (!email) {
      Alert.alert('Erro', 'E-mail não cadastrado para este morador.');
      return;
    }

    const subject = encodeURIComponent('Lembrete de Pagamento — DivMorada');
    const body = encodeURIComponent(
      `Olá, ${name}!\n\nPassando para lembrar que você ainda tem R$ ${amount.toFixed(2).replace('.', ',')} pendente no DivMorada.\n\nPor favor, realize o pagamento assim que possível.\n\nObrigado! 😊`
    );
    const url = `mailto:${email}?subject=${subject}&body=${body}`;

    Linking.openURL(url).catch(() =>
      Alert.alert('Erro', 'Não foi possível abrir o aplicativo de e-mail.')
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🏠 <Text style={styles.brand}>DivMorada</Text></Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Recebíveis (Quem Me Deve)</Text>

        {RECEIVABLES.map(item => (
          <View key={item.id} style={[styles.card, confirmed.includes(item.id) && styles.cardDone]}>
            <View style={styles.cardTop}>
              {/* Avatar */}
              <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
                <Text style={styles.avatarText}>{item.avatarLetter}</Text>
              </View>

              {/* Info */}
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>

              {/* Valor */}
              <Text style={styles.amount}>R$ {item.amount.toFixed(2).replace('.', ',')}</Text>
            </View>

            {/* Ações */}
            <View style={styles.actions}>
              {confirmed.includes(item.id) ? (
                <View style={styles.receivedBadge}>
                  <Text style={styles.receivedBadgeText}>✓ Recebido</Text>
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.btnMark}
                    onPress={() => handleMarkPaid(item.id, item.name)}
                  >
                    <Text style={styles.btnMarkText}>Marcar como Pago</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.btnEmail}
                    onPress={() => handleSendEmail(item.name, item.amount, item.email)}
                  >
                    <Text style={styles.btnEmailText}> Enviar Cobrança</Text>
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
  safe:        { flex: 1, backgroundColor: '#f4f6f5' },
  header:      { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
  backBtn:     { marginRight: 10, padding: 4 },
  backArrow:   { fontSize: 30, color: '#1abc9c', lineHeight: 32 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  brand:       { color: '#1abc9c' },

  content:   { padding: 16, paddingBottom: 32 },
  pageTitle: { fontSize: 20, fontWeight: '700', color: '#1abc9c', marginBottom: 18 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardDone: { opacity: 0.6 },

  cardTop:    { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar:     { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },

  info:     { flex: 1 },
  name:     { fontSize: 15, fontWeight: '700', color: '#222' },
  category: { fontSize: 12, color: '#888', marginTop: 2 },
  amount:   { fontSize: 16, fontWeight: 'bold', color: '#222' },

  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },

  btnMark:     { backgroundColor: '#1abc9c', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  btnMarkText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  btnEmail:     { backgroundColor: '#2980b9', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  btnEmailText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  receivedBadge:     { backgroundColor: '#eafaf1', borderWidth: 1, borderColor: '#1abc9c', borderRadius: 8, paddingVertical: 7, paddingHorizontal: 16 },
  receivedBadgeText: { color: '#1abc9c', fontWeight: '700', fontSize: 13 },
});
