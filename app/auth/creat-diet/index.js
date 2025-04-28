import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";

const questions = [
  {
    question: "Cinsiyetiniz nedir? 🧑‍🤝‍🧑",
    options: ["Kadın 👩", "Erkek 👨", "Diğer 🤷‍♂️"],
    type: "select",
  },
  {
    question: "Yaşınızı girin: 🎂",
    type: "input",
  },
  {
    question: "Boyunuz kaç cm? 📏",
    type: "input",
  },
  {
    question: "Kilonuz kaç kg? ⚖️",
    type: "input",
  },
  {
    question: "Günlük hareketliliğinizi nasıl tanımlarsınız? 🏃‍♂️",
    options: ["Hareketsiz 🛋️", "Az aktif 🚶‍♂️", "Orta aktif 🏃‍♂️", "Çok aktif 🏋️‍♂️"],
    type: "select",
  },
  {
    question: "Diyet amacınız nedir? 🎯",
    options: [
      "Kilo vermek ➖",
      "Kilo almak ➕",
      "Kilomu korumak ⚖️",
      "Kas kütlesi artırmak 💪",
    ],
    type: "select",
  },
  {
    question: "Hedef kilonuz nedir? 🎯",
    type: "input",
  },
  {
    question: "Özel bir beslenme tercihiniz var mı? 🥗",
    options: [
      "Vejetaryen 🥦",
      "Vegan 🌱",
      "Glutensiz 🍞🚫",
      "Ketojenik 🥩",
      "Paleo 🍗",
      "Özel yok 🍽️",
    ],
    type: "select",
  },
  {
    question: "Günde kaç öğün yemek istersiniz? 🍽️",
    options: ["3 Ana Öğün 🍽️", "3 Ana + 2 Ara Öğün 🍴", "5-6 küçük öğün 🍱"],
    type: "select",
  },
  {
    question: "Diyetinizde nelere öncelik vermek istersiniz? 🍎",
    options: [
      "Yüksek protein 🍗",
      "Düşük karbonhidrat 🍞🚫",
      "Lif oranı yüksek 🌾",
      "Düşük yağ 🧈🚫",
      "Dengeli beslenme 🥗",
    ],
    type: "select",
  },
];

const DietPlan = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [currentInput, setCurrentInput] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0)); // Animated value for fade transition
  const [scaleAnim] = useState(new Animated.Value(1)); // Animated value for option scale transition
  const currentQuestion = questions[currentQuestionIndex];
  const router = useRouter();

  const handleNext = () => {
    const updatedAnswers = [...answers];
    if (currentQuestion.type === "input") {
      updatedAnswers[currentQuestionIndex] = currentInput;
    }
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentInput(updatedAnswers[currentQuestionIndex + 1] || "");
      fadeTransition();
    } else {
      console.log("Final answers:", updatedAnswers);
      // Burada yönlendirme yapabilirsin, örn: router.push('/results');
    }
  };

  const handleOptionSelect = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = option;
    setAnswers(updatedAnswers);
    scaleOption(); // Option selection animation
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousAnswer = answers[currentQuestionIndex - 1];
      setCurrentInput(currentQuestion.type === "input" ? previousAnswer : "");
      fadeTransition();
    }
  };

  // Fade transition for questions
  const fadeTransition = () => {
    fadeAnim.setValue(0); // Reset fade to start position
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Scale animation for option selection
  const scaleOption = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.2,
        friction: 2,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Calculate progress as a percentage
  const progress = (currentQuestionIndex + 1) / questions.length;

  return (
    <View style={styles.container}>
      {/* Scroll progress bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[styles.progressBar, { width: `${progress * 100}%` }]}
          />
        </View>
      </View>

      <Text style={styles.progress}>
        {currentQuestionIndex + 1}/{questions.length}
      </Text>

      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.question}>{currentQuestion.question}</Text>
      </Animated.View>

      {currentQuestion.type === "input" ? (
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Cevabınızı yazın"
          value={currentInput}
          onChangeText={setCurrentInput}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = answers[currentQuestionIndex] === option;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  isSelected && styles.selectedOption,
                ]}
                onPress={() => handleOptionSelect(option)}
              >
                <Animated.View
                  style={[
                    styles.optionContent,
                    { transform: [{ scale: scaleAnim }] }, // Apply scale animation
                  ]}
                >
                  <View
                    style={[styles.circle, isSelected && styles.selectedCircle]}
                  >
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.optionText}>{option}</Text>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      <View style={styles.buttonContainer}>
        {currentQuestionIndex > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.buttonText}>← Geri</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentQuestionIndex === questions.length - 1
              ? "Bitir ✓"
              : "İleri →"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8f0",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  progressContainer: {
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  progressText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff8c00",
    marginBottom: 5,
  },
  progressBarBackground: {
    width: "100%",
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#ff8c00",
    borderRadius: 3,
  },
  progress: {
    fontSize: 18,
    color: "#ff8c00",
    marginBottom: 10,
  },
  question: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ff8c00",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  optionsContainer: {
    width: "100%",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  optionButton: {
    backgroundColor: "#ffa726",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    width: 300,
    alignItems: "flex-start",
  },
  selectedOption: {
    backgroundColor: "#fb8c00",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCircle: {
    backgroundColor: "white",
  },
  checkmark: {
    color: "#fb8c00",
    fontSize: 16,
    fontWeight: "bold",
  },
  optionText: {
    color: "white",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    justifyContent: "space-between",
  },
  backButton: {
    backgroundColor: "#e64a19",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  nextButton: {
    backgroundColor: "#ff8c00",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default DietPlan;
