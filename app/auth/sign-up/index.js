import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './../../../configs/FirebaseConfig';

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onCreateAccount = () => {
    if (!email || !password || !confirmPassword) {
      ToastAndroid.show("Lütfen tüm alanları doldurun.", ToastAndroid.LONG);
      return;
    }
  
    if (password !== confirmPassword) {
      ToastAndroid.show("Şifreler uyuşmuyor!", ToastAndroid.LONG);
      return;
    }
  
    if (password.length < 6) {
      ToastAndroid.show("Şifreniz en az 6 karakter olmalı.", ToastAndroid.LONG);
      return;
    }
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Kayıt başarılı:", user.email);
        ToastAndroid.show("Kayıt başarılı!", ToastAndroid.SHORT);
        router.push("/auth/sign-in");
      })
      .catch((error) => {
        console.error("Kayıt hatası:", error.message);
        ToastAndroid.show(`Hata: ${error.message}`, ToastAndroid.LONG);
      });
  };
  

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      <Text style={styles.subtitle}>DiyetFit'e hoş geldiniz!</Text>

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

      <Text style={styles.label}>Şifre</Text>
      <TextInput
        style={styles.input}
        placeholder="Şifrenizi girin"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={styles.label}>Şifreyi Doğrula</Text>
      <TextInput
        style={styles.input}
        placeholder="Şifrenizi tekrar girin"
        placeholderTextColor="#aaa"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={onCreateAccount}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => router.push("/auth/sign-in")}
      >
        <Text style={styles.signInText}>Zaten bir hesabın var mı? Giriş Yap</Text>
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
  signInButton: {
    marginTop: 15,
    alignItems: "center",
  },
  signInText: {
    color: "#f7931a",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignUp;
