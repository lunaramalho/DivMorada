import React, { useState } from 'react';
import { 
  StyleSheet, View, Text, Image, TouchableOpacity, 
  SafeAreaView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { COLORS } from '@/styles/theme';
import { Input } from '@/components/Input';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        {/* LOGO */}
        <View style={styles.header}>
          <Text style={styles.logo}>🏠 <Text style={{color: COLORS.primary}}>DivMorada</Text></Text>
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
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        
        <Input 
          label="Senha" 
          placeholder="........" 
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* LOGIN BUTTON */}
        <TouchableOpacity style={styles.mainBtn}>
          <Text style={styles.mainBtnText}>Entrar</Text>
        </TouchableOpacity>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Não tem conta? </Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Criar conta</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { fontSize: 32, fontWeight: 'bold' },
  subtitle: { color: COLORS.textSecondary, fontSize: 16, marginTop: 10 },
  
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 30,
  },
  googleIcon: { width: 20, height: 20, marginRight: 10 },
  googleBtnText: { fontSize: 16, fontWeight: '500', color: '#333' },
  
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  line: { flex: 1, height: 1, backgroundColor: '#eee' },
  dividerText: { marginHorizontal: 15, color: '#999', fontSize: 12 },
  
  mainBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  mainBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  footerText: { color: COLORS.textSecondary, fontSize: 14 },
  linkText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14 },
});