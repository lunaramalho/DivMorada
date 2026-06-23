import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, TextInput, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Modality = 'Administrador' | 'Morador';

export default function ProfileScreen() {
  const router = useRouter();
  const [name,     setName]     = useState('João Pedro');
  const [email,    setEmail]    = useState('joao.pedro@gmail.com');
  const [modality, setModality] = useState<Modality>('Administrador');
  const [editName, setEditName] = useState(false);

  const handleSave = () => {
    Alert.alert('Salvo!', 'Suas alterações foram salvas com sucesso.', [
      { text: 'OK' },
    ]);
    setEditName(false);
  };

  const handleChangePhoto = () => {
    Alert.alert('Alterar Foto', 'Funcionalidade de câmera/galeria em breve (use expo-image-picker).');
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

        {/* TÍTULO */}
        <Text style={styles.pageTitle}>Seu Perfil</Text>

        {/* FOTO */}
        <View style={styles.photoSection}>
          <View style={styles.photoCircle}>
            <Text style={styles.photoLetter}>
              {name.trim().charAt(0).toUpperCase()}
            </Text>
          </View>
          <TouchableOpacity style={styles.btnPhoto} onPress={handleChangePhoto}>
            <Text style={styles.btnPhotoText}>Alterar Foto</Text>
          </TouchableOpacity>
        </View>

        {/* CARD DE DADOS */}
        <View style={styles.card}>

          {/* NOME */}
          <View style={styles.fieldRow}>
            <MaterialCommunityIcons name="account-outline" size={20} color="#888" style={styles.fieldIcon} />
            <View style={styles.fieldContent}>
              <Text style={styles.fieldLabel}>Nome:</Text>
              {editName ? (
                <TextInput
                  style={styles.fieldInput}
                  value={name}
                  onChangeText={setName}
                  autoFocus
                  onBlur={() => setEditName(false)}
                />
              ) : (
                <Text style={styles.fieldValue}>{name}</Text>
              )}
            </View>
            <TouchableOpacity onPress={() => setEditName(true)}>
              <MaterialCommunityIcons name="pencil-outline" size={20} color="#1abc9c" />
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          {/* EMAIL */}
          <View style={styles.fieldRow}>
            <MaterialCommunityIcons name="email-outline" size={20} color="#888" style={styles.fieldIcon} />
            <View style={styles.fieldContent}>
              <Text style={styles.fieldLabel}>E-mail:</Text>
              <Text style={styles.fieldValue}>{email}</Text>
            </View>
          </View>

          <View style={styles.separator} />

          {/* MODALIDADE */}
          <View style={styles.fieldRow}>
            <MaterialCommunityIcons name="account-group-outline" size={20} color="#888" style={styles.fieldIcon} />
            <View style={styles.fieldContent}>
              <Text style={styles.fieldLabel}>Modalidade</Text>
              <View style={styles.modalityRow}>
                <TouchableOpacity
                  style={styles.modalityOption}
                  onPress={() => setModality('Administrador')}
                >
                  <Text style={[
                    styles.modalityText,
                    modality === 'Administrador' && styles.modalityActive,
                  ]}>
                    Administrador {modality === 'Administrador' ? '✓' : ''}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalityOption}
                  onPress={() => setModality('Morador')}
                >
                  <Text style={[
                    styles.modalityText,
                    modality === 'Morador' && styles.modalityActive,
                  ]}>
                    Morador {modality === 'Morador' ? '✓' : ''}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>

        {/* BOTÃO SALVAR */}
        <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
          <Text style={styles.btnSaveText}>Salvar Alterações </Text>
        </TouchableOpacity>

        {/* SAIR */}
        <TouchableOpacity
          style={styles.btnLogout}
          onPress={() => {
            Alert.alert('Sair', 'Deseja sair da conta?', [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Sair', style: 'destructive', onPress: () => router.replace('/login') },
            ]);
          }}
        >
          <MaterialCommunityIcons name="logout" size={18} color="#e74c3c" />
          <Text style={styles.btnLogoutText}>Sair da Conta</Text>
        </TouchableOpacity>

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

  content:   { padding: 20, paddingBottom: 48, alignItems: 'center' },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#888', marginBottom: 24, alignSelf: 'center' },

  /* Foto */
  photoSection: { alignItems: 'center', marginBottom: 28 },
  photoCircle: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: '#bdc3c7',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 14,
  },
  photoLetter: { color: '#fff', fontSize: 44, fontWeight: 'bold' },
  btnPhoto: {
    backgroundColor: '#1abc9c', borderRadius: 20,
    paddingVertical: 8, paddingHorizontal: 24,
  },
  btnPhotoText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  /* Card */
  card: {
    backgroundColor: '#fff', borderRadius: 16,
    width: '100%', padding: 4,
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 4,
    marginBottom: 24,
  },
  separator: { height: 1, backgroundColor: '#f0f0f0', marginHorizontal: 16 },

  fieldRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 16, gap: 10,
  },
  fieldIcon:    {},
  fieldContent: { flex: 1 },
  fieldLabel:   { fontSize: 11, color: '#aaa', fontWeight: '600', marginBottom: 2 },
  fieldValue:   { fontSize: 15, color: '#222', fontWeight: '600' },
  fieldInput: {
    fontSize: 15, color: '#222', fontWeight: '600',
    borderBottomWidth: 1.5, borderColor: '#1abc9c', paddingVertical: 2,
  },

  /* Modalidade */
  modalityRow: { flexDirection: 'row', gap: 20, marginTop: 4 },
  modalityOption: {},
  modalityText: { fontSize: 14, color: '#aaa', fontWeight: '600' },
  modalityActive: { color: '#1abc9c' },

  /* Botões */
  btnSave: {
    backgroundColor: '#1abc9c', borderRadius: 14,
    paddingVertical: 18, alignItems: 'center',
    width: '100%', marginBottom: 16,
  },
  btnSaveText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  btnLogout: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 12,
  },
  btnLogoutText: { color: '#e74c3c', fontWeight: '600', fontSize: 14 },
});
