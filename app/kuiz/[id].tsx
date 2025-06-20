import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { supabase } from "../../constants/supabaseClient";

export default function QuizScreen() {
  const { id, type } = useLocalSearchParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<
    {
      question: string;
      answer: string;
      choice_a: string;
      choice_b: string;
      choice_c: string;
      choice_d: string;
    }[]
  >([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<Choice | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      let query = supabase
        .from("sejarah_questions")
        .select("*")
        .eq("unit_id", Number(id));

      if (type === "spot") {
        query = query.ilike("question", "%spot peperiksaan%");
      }

      const { data, error } = await query;

      if (data) {
        const shuffled = data.sort(() => Math.random() - 0.5).slice(0, 25); // limit spot ke 15
        setQuestions(shuffled);
      }

      setLoading(false);
    };

    fetchQuestions();
  }, [id]);

  interface Question {
    question: string;
    answer: string;
    choice_a: string;
    choice_b: string;
    choice_c: string;
    choice_d: string;
  }

  type Choice = "A" | "B" | "C" | "D";

  const handleAnswer = (choice: Choice): void => {
    const correct = questions[current].answer;
    if (choice === correct) setScore((prev) => prev + 1);
    setSelected(choice);
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 4000);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#f59e0b" />
        <Text className="mt-2 text-gray-500">Memuatkan soalan...</Text>
      </View>
    );
  }

  if (finished) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-2xl font-bold mb-4 text-green-600">
          Tahniah! 🎉
        </Text>
        <Text className="text-lg text-gray-700 mb-2">
          Skor anda: {score} / {questions.length}
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("/")}
          className="mt-4 bg-blue-500 px-6 py-3 rounded-full"
        >
          <Text className="text-white font-bold">Kembali ke Laman Utama</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = questions[current];

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 px-6 py-12">
        {/* Existing content */}
        <Text className="text-xl font-semibold mb-4 text-orange-600">
          Soalan {current + 1} / {questions.length}
        </Text>
        <Text className="text-lg font-bold text-[#333] mb-6">{q.question}</Text>

        {["A", "B", "C", "D"].map((opt) => (
          <TouchableOpacity
            key={opt}
            onPress={() => handleAnswer(opt as Choice)}
            disabled={!!selected}
            className={`p-4 mb-3 rounded-xl border ${
              selected === opt
                ? opt === q.answer
                  ? "border-green-500 bg-green-100"
                  : "border-red-500 bg-red-100"
                : "border-gray-300 bg-white"
            }`}
          >
            <Text className="text-base text-gray-800">
              {opt}. {q[`choice_${opt.toLowerCase()}` as keyof Question]}
            </Text>
          </TouchableOpacity>
        ))}

        {selected && (
          <Text className="text-base text-orange-600 mb-4">
            {selected === q.answer ? "" : `Jawapan betul: ${q.answer}`}
          </Text>
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={() => router.replace("/")}
        className="absolute bottom-6 left-6 right-6 bg-blue-500 px-6 py-3 rounded-full"
      >
        <Text className="text-white font-bold text-center">
          Kembali ke Laman Utama
        </Text>
      </TouchableOpacity>
    </View>
  );
}
