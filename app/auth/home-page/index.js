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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  logo: {
    width: 280,
    height: 150,
    resizeMode: "contain",
    marginBottom: 25,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
    marginLeft: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#222",
    marginBottom: 6,
    textAlign: "center",
  },
  welcomeText2: {
    fontSize: 16,
    color: "#555",
    marginBottom: 3,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  welcomeText3: {
    fontSize: 15,
    color: "#777",
    marginBottom: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: 14,
    color: "#999",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#FF8A00",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginVertical: 8,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "600",
  },
});
