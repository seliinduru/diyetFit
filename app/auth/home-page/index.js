import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // 👈 ikonları ekledik



export default function HomePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const day = currentDate.toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <View style={styles.container}>
      {/* Geri Butonu (ikonlu) */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#333" />
        <Text style={styles.backButtonText}>Geri</Text>
      </TouchableOpacity>

      <Image
        source={require("../../../assets/images/diyetfit_logoo.png")}
        style={styles.logo}
      />

      <Text style={styles.welcomeText}>HOŞ GELDİN!</Text>
      <Text style={styles.welcomeText2}>
        Sağlıklı bir sen için harika bir gün!💪
      </Text>
      <Text style={styles.welcomeText3}>Şimdi sana en uygun adımı seç.</Text>
      <Text style={styles.dateText}>{day}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/creat-diet")}
        >
          <Text style={styles.buttonText}>🥗 Diyet Oluştur</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/kac-kalori")}
        >
          <Text style={styles.buttonText}>🔥 Kaç Kalori</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/yemek-tarifleri")}
        >
          <Text style={styles.buttonText}>🍲 Yemek Tarifleri</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/bki-hesapla")}
        >
          <Text style={styles.buttonText}>⚖️ BKİ Hesapla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  logo: {
    position: "absolute",
    top: 80,
    left: 22,
    width: 350,
    height: 200,
    resizeMode: "contain",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginLeft: 5,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2e2e2e",
    marginTop: 200,
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 1,
  },
  welcomeText2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555",
    marginBottom: 5,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  welcomeText3: {
    fontSize: 18,
    fontWeight: "500",
    color: "#777",
    marginBottom: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: 16,
    color: "#999",
    marginBottom: 30,
    textAlign: "center",
  },
  
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#f7931a",
    paddingVertical: 18,
    paddingHorizontal: 90,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
