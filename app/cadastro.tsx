import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { supabase } from "@/services/supabase";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function cadastrar() {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: senha,
    });

    if (error) {
      alert("Erro: " + error.message);
    } else {
      alert("Conta criada com sucesso!");
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Cadastro
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />

      <TouchableOpacity onPress={cadastrar}>
        <Text style={{ color: "blue" }}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}