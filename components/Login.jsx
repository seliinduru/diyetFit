import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image, // Image bileşenini ekliyoruz
} from "react-native";
import { useRouter } from "expo-router"; // useRouter import ediyoruz

const Login = () => {
  const [scale] = useState(new Animated.Value(1)); // Başlangıçta buton boyutu 1
  const router = useRouter(); // Router hook'u

  // Mouse butonun üzerine geldiğinde animasyonu büyütme
  const handleMouseEnter = () => {
    Animated.spring(scale, {
      toValue: 1.1, // Büyütme oranı
      useNativeDriver: true, // Daha akıcı animasyon için
    }).start();
  };

  // Mouse butondan ayrıldığında orijinal boyutuna dönme
  const handleMouseLeave = () => {
    Animated.spring(scale, {
      toValue: 1, // Orijinal boyuta dönme
      useNativeDriver: true, // Daha akıcı animasyon için
    }).start();
  };

  return (
    <ImageBackground
      source={require("./../assets/images/baslangic.jpeg")} // Resmin doğru adlandırıldığını kontrol et
      style={styles.background}
      resizeMode="cover"
    >
      {/* DiyetFit logosunu ekliyoruz */}
      <Image
        source={require("./../assets/images/diyetfit_logoo.png")} // Logonun yolu
        style={styles.logo} // Logo stilini burada tanımlıyoruz
      />
      
      <View style={styles.overlay}>
        <Text style={styles.description}>
          Sağlıklı bir yaşam için adım atın ve DiyetFit’in kişisel diyet
          planlarıyla her gün bir adım daha güçlü hissedin, yapay zeka destekli
          önerilerle hedeflerinize ulaşmak hiç bu kadar kolay olmamıştı!
        </Text>
        <Animated.View style={{ transform: [{ scale }] }}>
          {/* Animasyonlu buton */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("auth/sign-in")} // Burada yönlendirme yapılıyor
            onMouseEnter={handleMouseEnter} // Mouse butonun üstüne geldiğinde büyütme
            onMouseLeave={handleMouseLeave} // Mouse butondan ayrıldığında küçültme
          >
            <Text style={styles.buttonText}>Haydi Başlayalım!</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    position: "absolute",
    top: 40, // Logo için üstten boşluk
    left: 22, // Sol taraftan boşluk
    width: 350, // Logonun genişliği
    height: 200, // Logonun yüksekliği
    resizeMode: "contain", // Logonun boyutunu koruyarak yerleştirme
  },
  overlay: {
    position: "absolute", // Overlay'i sabit konuma getirme
    top: 240, // Üstten boşluk
    right: 40, // Sağdan boşluk
    backgroundColor: "white", // Tam beyaz arka plan
    padding: 40,
    borderTopLeftRadius: 15, // Üst sol köşeyi yuvarlatma
    borderTopRightRadius: 15, // Üst sağ köşeyi yuvarlatma
    borderBottomLeftRadius: 15, // Alt sol köşe yuvarlatma
    borderBottomRightRadius: 15, // Alt sağ köşe yuvarlatma
    width: "80%", // Genişlik ayarı
    shadowColor: "#000", // Hafif gölge efekti
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5, // Android için gölge efekti
  },

  description: {
    fontSize: 16,
    color: "#7F7F7F", // Daha koyu gri
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#f7931a",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Login;
