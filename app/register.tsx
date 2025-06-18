import { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
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

    if (password.length < 6) {
      Alert.alert("Sign Up", "Password mesti sekurang-kurangnya 6 aksara.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      Alert.alert("Daftar Gagal", error.message);
    } else {
      Alert.alert("Berjaya!", "Sila semak emel untuk pengesahan.");
      router.replace("/login");
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-6 bg-[#FFFDF7] p-4 sm:p-6 md:p-8 lg:p-320">
      {/* Avatar */}
      {/* <Image
        source={require("../assets/avatar.png")}
        className="w-24 h-24 rounded-full mb-6"
      /> */}

      <Text className="text-3xl font-bold text-[#333] mb-2">Daftar Akaun</Text>
      <Text className="text-base text-gray-500 mb-6 text-center">
        Masukkan maklumat anda untuk mula belajar
      </Text>

      <TextInput
        placeholder="Nama Penuh"
        onChangeText={(value) => (nameRef.current = value)}
        className="w-full bg-white p-4 rounded-xl mb-4 border border-gray-300"
      />
      <TextInput
        placeholder="Email"
        onChangeText={(value) => (emailRef.current = value)}
        className="w-full bg-white p-4 rounded-xl mb-4 border border-gray-300"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Kata Laluan"
        onChangeText={(value) => (passwordRef.current = value)}
        secureTextEntry
        className="w-full bg-white p-4 rounded-xl mb-6 border border-gray-300"
      />

      <TouchableOpacity
        onPress={handleRegister}
        className="bg-green-400 w-full py-4 rounded-xl items-center mb-3 shadow-lg"
      >
        <Text className="text-white font-bold text-lg">DAFTAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text className="text-blue-500">
          Sudah ada akaun? <Text className="underline">Log Masuk</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
