import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = () => {
    const auth = getAuth();

    if (!email) {
      ToastAndroid.show("Lütfen e-posta adresinizi girin", ToastAndroid.LONG);
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Şifre sıfırlama linki başarıyla gönderildi
        ToastAndroid.show(
          "Şifre sıfırlama bağlantısı gönderildi!",
          ToastAndroid.LONG
        );
      })
      .catch((error) => {
        // Hata durumunu kontrol et
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/invalid-email") {
          ToastAndroid.show("Geçersiz e-posta adresi", ToastAndroid.LONG);
        } else if (errorCode === "auth/user-not-found") {
          ToastAndroid.show(
            "Bu e-posta ile kayıtlı bir kullanıcı bulunamadı",
            ToastAndroid.LONG
          );
        } else {
          ToastAndroid.show(
            "Bir hata oluştu: " + errorMessage,
            ToastAndroid.LONG
          );
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Şifremi Unuttum</Text>
      <Text style={styles.subtitle}>
        E-posta adresinizi girin, şifrenizi sıfırlamak için bir bağlantı
        gönderelim.
      </Text>

      <Text style={styles.label}>E-posta</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta adresinizi girin"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Şifreyi Sıfırla</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "left",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#f7931a",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgotPassword;
