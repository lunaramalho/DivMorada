// src/components/Input.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { COLORS } from '../styles/theme';

interface Props extends TextInputProps {
  label: string;
}

export const Input = ({ label, ...rest }: Props) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput 
      style={styles.input} 
      placeholderTextColor="#999"
      {...rest} 
    />
  </View>
);

const styles = StyleSheet.create({
  container: { width: '100%', marginBottom: 15 },
  label: { fontWeight: 'bold', marginBottom: 8, color: COLORS.textMain, fontSize: 16 },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    fontSize: 16,
  },
});