import { useEffect, useState } from "react";
import { supabase } from "../../constants/supabaseClient";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState("Pelajar");

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
      } else {
        const { data: profile } = await supabase.auth.getUser();
        const name = profile?.user?.user_metadata?.name || "Pelajar";
        setUserName(name);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const topics = [
    {
      id: 1,
      title: "👑 Institusi Raja Payung Negara",
      desc: "Fahami peranan raja-raja Melayu dan sistem Raja Berperlembagaan.",
    },
    {
      id: 2,
      title: "🕌 Agama Islam di Malaysia",
      desc: "Ketahui peranan Islam sebagai agama Persekutuan dan kesannya dalam kehidupan.",
    },
    {
      id: 3,
      title: "📝 Bahasa Melayu Warisan Kita",
      desc: "Pelajari kepentingan Bahasa Melayu sebagai bahasa rasmi dan warisan negara.",
    },
    {
      id: 4,
      title: "🛡️ Kedaulatan Negara Dicabar",
      desc: "Kenali ancaman luar dan perjuangan mempertahankan kedaulatan negara.",
    },
    {
      id: 5,
      title: "⚔️ Bangkit Berjuang Penjajah Ditentang",
      desc: "Ikuti perjuangan rakyat menentang penjajahan demi kemerdekaan.",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-[#FFFDF7] px-6 pt-12">
      <View className="items-center mb-6">
        {/* <Image
          source={require("../../assets/avatar.png")}
          className="w-20 h-20 rounded-full mb-3"
        /> */}
        <Text className="text-2xl font-bold text-[#333]">
          Hai {userName} 👋
        </Text>
      </View>

      <Text className="text-xl font-normal text-[#333] mb-4 text-center mt-0">
        Pilih topik untuk mulakan kuiz:
      </Text>

      {topics.map((topic) => (
        <TouchableOpacity
          key={topic.id}
          className="bg-orange-100 p-4 rounded-2xl mb-4 shadow-sm"
          onPress={() => router.push(`/kuiz/${topic.id}`)}
        >
          <Text className="text-lg font-bold text-orange-800">
            {topic.title}
          </Text>
          <Text className="text-sm text-gray-600 mt-1">{topic.desc}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-400 mt-6 py-4 rounded-xl items-center mb-8"
      >
        <Text className="text-white font-bold text-base">Log Keluar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
