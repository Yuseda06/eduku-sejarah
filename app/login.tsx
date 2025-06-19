import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../constants/supabaseClient";

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
    <View className="flex-1 justify-center items-center px-6 bg-[#FFFDF7] p-4 sm:p-6 md:p-8 lg:p-320">
      {/* Cute Avatar */}
      <Image
        source={require("../assets/images/logo-sekolah.png")}
        style={{ width: "35%", height: "35%", resizeMode: "contain" }}
        className="rounded-full mb-0 sm:mb-4 md:mb-6 lg:mb-8"
        alt="Cute Avatar"
      />

      <Text className="font-baloo text-3xl text-modernGray mb-2 mt-0">
        Selamat Datang! 👋
      </Text>

      <Text className="font-poppins text-modern-base  text-gray-600 mb-0 mt-4">
        Pelajar Tahun 5 Efektif
      </Text>
      <Text className="text-base text-gray-500 mb-4 mt-0">
        Sila log masuk ke akaun anda
      </Text>

      {/* Email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="w-full bg-white p-4 rounded-xl mb-4 border border-gray-300"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password */}
      <TextInput
        placeholder="Kata Laluan"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full bg-white p-4 rounded-xl mb-6 border border-gray-300"
      />

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-yellow-400 w-full py-4 rounded-xl items-center mb-3 shadow-lg"
      >
        <Text className="text-white font-bold text-lg">Log Masuk</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text className="text-blue-500">
          Belum ada akaun? <Text className="underline">Daftar</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
