import { useEffect } from "react";
import { supabase } from "../../constants/supabaseClient";
import { useRouter } from "expo-router";
import { Text, Button, View } from "react-native";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
      }
    };
    checkSession();
  }, []);

    const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <View>
    <Text>Selamat datang ke Kuiz Sejarah!</Text>
      <Button title="Logout" onPress={handleLogout} />
      </View>
  );
}
