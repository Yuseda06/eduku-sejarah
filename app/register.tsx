import { useState, useRef } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { supabase } from "../constants/supabaseClient";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const router = useRouter();

  const handleRegister = async () => {
    let name = nameRef.current.trim() || "Pelajar";
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    console.log("REGISTER", { name, email, password });

    if (password.length < 6) {
      Alert.alert("Sign Up", "Password mesti sekurang-kurangnya 6 aksara.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      console.log("REGISTER ERROR", error);
      Alert.alert("Daftar Gagal", error.message);
    } else {
      Alert.alert("Berjaya!", "Sila semak emel untuk pengesahan.");
      router.replace("/login");
    }
  };

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Daftar Akaun</Text>
      <TextInput
        placeholder="Nama Penuh"
        onChangeText={(value) => (nameRef.current = value)}
        className="border p-2 mb-4"
      />
      <TextInput
        placeholder="Email"
        onChangeText={(value) => (emailRef.current = value)}
        className="border p-2 mb-4"
      />
      <TextInput
        placeholder="Password"
        onChangeText={(value) => (passwordRef.current = value)}
        secureTextEntry
        className="border p-2 mb-4"
      />
      <Button title="DAFTAR" onPress={handleRegister} />
    </View>
  );
}
