import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { supabase } from "../constants/supabaseClient"; 
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Login gagal", error.message);
    } else {
      router.replace("/"); 
    }
  };

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border p-2 mb-4"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border p-2 mb-4"
      />
      <Button title="Log Masuk" onPress={handleLogin} />
      <Button
            title="Belum ada akaun? Daftar"
            onPress={() => router.push("/register")}
            />

    </View>
  );
}
