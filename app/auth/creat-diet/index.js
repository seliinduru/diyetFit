import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
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
    options: [
      "1 Ana Öğün 🍽️", 
      "2 Ana Öğün 🍽️", 
      "2 Ana + 1 Ara Öğün 🍴", 
      "3 Ana Öğün 🍽️", 
      "3 Ana + 2 Ara Öğün 🍴", 
      "5-6 küçük öğün 🍱"
    ],
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Fixed header with progress bar */}
        <View style={styles.header}>
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
        </View>

        {/* Scrollable content area */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
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
            <View style={styles.optionsContainer}>
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
                        { transform: [{ scale: isSelected ? scaleAnim : 1 }] },
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
            </View>
          )}
        </ScrollView>

        {/* Fixed footer with navigation buttons */}
        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            {currentQuestionIndex > 0 ? (
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.buttonText}>← Geri</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.emptyButton} />
            )}
            <TouchableOpacity 
              style={styles.nextButton} 
              onPress={handleNext}
              disabled={currentQuestion.type === "input" && !currentInput}
            >
              <Text style={styles.buttonText}>
                {currentQuestionIndex === questions.length - 1
                  ? "Bitir ✓"
                  : "İleri →"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff8f0",
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff8f0",
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0e0d0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 10,
  },
  progressContainer: {
    width: "100%",
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
    fontSize: 16,
    color: "#ff8c00",
    marginTop: 5,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ff8c00",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    backgroundColor: "#fff",
    fontSize: 18,
    marginBottom: 20,
    elevation: 1,
    shadowColor: "#ff8c00",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  optionsContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },
  optionButton: {
    backgroundColor: "#ffa726",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 8,
    width: "100%",
    maxWidth: 320,
    alignItems: "flex-start",
    elevation: 2,
    shadowColor: "#ff8c00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  selectedOption: {
    backgroundColor: "#fb8c00",
    borderWidth: 2,
    borderColor: "#e65100",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "white",
    marginRight: 15,
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
    fontWeight: "500",
    flex: 1,
  },
  footer: {
    backgroundColor: "#fff8f0",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0e0d0",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  backButton: {
    backgroundColor: "#e64a19",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
  },
  emptyButton: {
    minWidth: 120,
  },
  nextButton: {
    backgroundColor: "#ff8c00",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DietPlan;
