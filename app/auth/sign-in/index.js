import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../configs/FirebaseConfig"; // Firebase config dosyasının yolu

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loadStoredCredentials = async () => {
      const storedPassword = await AsyncStorage.getItem("savedPassword");
      if (storedPassword) {
        setPassword(storedPassword);
        setRememberMe(true);
      }
    };
    loadStoredCredentials();
  }, []);

  const handleSignIn = async () => {
    if (rememberMe) {
      await AsyncStorage.setItem("savedPassword", password);
    } else {
      await AsyncStorage.removeItem("savedPassword");
    }

    // Firebase Authentication ile giriş işlemi
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Giriş başarılı:", user.email);
        ToastAndroid.show("Giriş başarılı!", ToastAndroid.SHORT);
        router.push("/auth/home-page"); // Başarılı giriş sonrası yönlendirme
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Firebase'den dönen hatalar
        if (errorCode === 'auth/wrong-password') {
          ToastAndroid.show("Şifre yanlış. Lütfen tekrar deneyin.", ToastAndroid.LONG);
        } else if (errorCode === 'auth/user-not-found') {
          ToastAndroid.show("Bu e-posta ile bir hesap bulunamadı.", ToastAndroid.LONG);
        } else {
          ToastAndroid.show(`Hata: ${errorMessage}`, ToastAndroid.LONG);
        }
      });
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Giriş Yap</Text>
      <Text style={styles.subtitle}>Tekrar Hoş Geldiniz!</Text>

      <Text style={styles.label}>E-posta</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta adresinizi girin"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Şifre</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Şifrenizi girin"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons
            name={secureText ? "eye-off" : "eye"}
            size={24}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.rememberMeContainer}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setRememberMe(!rememberMe)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkedBox]}>
            {rememberMe && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={styles.rememberMeText}>Beni Hatırla</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={() => router.push("/auth/forgot-password")} // Yönlendirme burada
        >
          <Text style={styles.forgotPasswordText}>Şifremi Unuttum?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => router.push("/auth/sign-up")}
      >
        <Text style={styles.createAccountText}>Hesap Oluştur</Text>
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
    marginBottom: 10,
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "#fff",
  },
  checkedBox: {
    backgroundColor: "#f7931a",
    borderColor: "#f7931a",
  },
  rememberMeText: {
    fontSize: 14,
  },
  forgotPasswordContainer: {
    marginLeft: 140,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#1e90ff",
    textDecorationLine: "underline",
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
  createAccountButton: {
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  createAccountText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignIn;
