import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase"; // adjust if needed
import { useAuth } from "../../context/authContext";

const SignIn = () => {
  const router = useRouter();
  const { setSession } = useAuth(); // grab setSession from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert("Login Failed", error.message);
        setIsLoading(false);
        return;
      }

      // Save session to context and navigate
      setSession(data.session);
      router.replace("/(tabs)/chat-screen");

      const userId = data.session?.user?.id;

      try {
        await fetch("http://192.168.0.105:3000/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.session.access_token}`, // optional
          },
          body: JSON.stringify({
            userId,
          }),
        });

        console.log("User ID sent to backend:", userId);
      } catch (err) {
        console.error("Failed to send userId to backend:", err);
      }
    } catch (err) {
      Alert.alert(
        "Unexpected Error",
        "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center items-center">
            <Image
              source={require("../../assets/images/EmoBoat.png")}
              className="w-[220px] h-[220px]"
              resizeMode="contain"
              style={{ marginBottom: 20 }}
            />

            <View
              style={{
                width: 280,
                backgroundColor: "rgba(244, 223, 205, 0.3)",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 16,
                paddingVertical: 24,
                borderRadius: 20,
                marginTop: 10,
              }}
            >
              <Text className="font-playBold text-3xl text-burgundy mb-4">
                Login
              </Text>

              <TextInput
                placeholder="Email"
                className="border border-gray-300 rounded-lg p-3 w-full mb-4 bg-white text-black"
                keyboardType="email-address"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />

              <View className="w-full relative mb-6">
                <TextInput
                  placeholder="Password"
                  className="border border-gray-300 rounded-lg p-3 w-full bg-white text-black pr-10"
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#666"
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable
                  style={{
                    position: "absolute",
                    right: 12,
                    top: 0,
                    height: "100%",
                    justifyContent: "center",
                    width: 40,
                    alignItems: "center",
                  }}
                  onPressIn={() => setShowPassword(true)}
                  onPressOut={() => setShowPassword(false)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#666"
                  />
                </Pressable>
              </View>

              <TouchableOpacity
                className={`bg-burgundy p-3 rounded-lg w-full ${
                  isLoading ? "opacity-70" : "opacity-100"
                }`}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text className="text-white text-center font-bold">
                  {isLoading ? "Logging in..." : "Login"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.replace("/sign-up")}
                className="mt-4"
              >
                <Text className="text-burgundy text-sm">
                  Don't have an account?{" "}
                  <Text className="font-bold">Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
