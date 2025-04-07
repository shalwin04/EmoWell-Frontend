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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../lib/supabase"; // make sure path is correct

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [concerns, setConcerns] = useState("");
  const [treatmentHistory, setTreatmentHistory] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    console.log("handle SIGN UP TRIGGERED");
    if (!name || !email || !password) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    // 1. Create user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log("SIGN UP RESPONSE:", { data, error });

    if (error) {
      setIsLoading(false);
      Alert.alert("Sign Up Error", error.message);
      return;
    }

    // 2. Get the user ID from session
    const userId = data.user?.id;

    // 3. Store session for auto-login
    if (data.session) {
      await AsyncStorage.setItem("session", JSON.stringify(data.session));
    }

    // 4. Save additional user info to 'profiles' table
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: userId, // should match the user id
        name,
        age,
        concerns,
        treatment_history: treatmentHistory,
        emergency_contact: emergencyContact,
        email, // optional
      },
    ]);

    if (profileError) {
      setIsLoading(false);
      Alert.alert("Profile Save Error", profileError.message);
      return;
    }

    setIsLoading(false);
    Alert.alert("Success", "Account created successfully!", [
      { text: "Login", onPress: () => router.replace("/(auth)/sign-in") },
    ]);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              paddingVertical: 30,
            }}
          >
            <View className="flex-1 justify-center items-center">
              {/* Logo Image */}
              <Image
                source={require("../../assets/images/EmoBoat.png")}
                className="w-[180px] h-[180px]"
                resizeMode="contain"
                style={{ marginBottom: 10 }}
              />

              <View
                style={{
                  width: 320,
                  backgroundColor: "rgba(244, 223, 205, 0.3)",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 24,
                  borderRadius: 20,
                  marginTop: 5,
                  marginBottom: 10,
                }}
              >
                <Text className="font-playBold text-3xl text-burgundy mb-4">
                  Sign Up
                </Text>

                {/* Required Fields Section */}
                <Text className="font-bold text-burgundy self-start mb-2">
                  Required Information
                </Text>

                <TextInput
                  placeholder="Full Name"
                  className="border border-gray-300 rounded-lg p-3 w-full mb-3 bg-white text-black"
                  placeholderTextColor="#666"
                  value={name}
                  onChangeText={setName}
                  style={{ textAlignVertical: "center" }}
                />

                <TextInput
                  placeholder="Email"
                  className="border border-gray-300 rounded-lg p-3 w-full mb-3 bg-white text-black"
                  keyboardType="email-address"
                  placeholderTextColor="#666"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  style={{ textAlignVertical: "center" }}
                />

                <View className="w-full relative mb-4">
                  <TextInput
                    placeholder="Password"
                    className="border border-gray-300 rounded-lg p-3 w-full bg-white text-black pr-10"
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#666"
                    value={password}
                    onChangeText={setPassword}
                    style={{ textAlignVertical: "center" }}
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

                {/* Optional/Additional Fields Section */}
                <Text className="font-bold text-burgundy self-start mb-2 mt-2">
                  Additional Information
                </Text>

                <TextInput
                  placeholder="Age"
                  className="border border-gray-300 rounded-lg p-3 w-full mb-3 bg-white text-black"
                  keyboardType="numeric"
                  placeholderTextColor="#666"
                  value={age}
                  onChangeText={setAge}
                  style={{ textAlignVertical: "center" }}
                />

                {/* Health Information Section */}
                <Text className="font-bold text-burgundy self-start mb-2 mt-2">
                  Health Information
                </Text>

                <TextInput
                  placeholder="Health Concerns (If none, write 'none')"
                  className="border border-gray-300 rounded-lg p-3 w-full mb-3 bg-white text-black"
                  placeholderTextColor="#666"
                  value={concerns}
                  onChangeText={setConcerns}
                  multiline={true}
                  numberOfLines={3}
                  style={{ textAlignVertical: "top", height: 80 }}
                />

                <TextInput
                  placeholder="Treatment History (If none, write 'none')"
                  className="border border-gray-300 rounded-lg p-3 w-full mb-3 bg-white text-black"
                  placeholderTextColor="#666"
                  value={treatmentHistory}
                  onChangeText={setTreatmentHistory}
                  multiline={true}
                  numberOfLines={3}
                  style={{ textAlignVertical: "top", height: 80 }}
                />

                <TextInput
                  placeholder="Emergency Contact (Email)"
                  className="border border-gray-300 rounded-lg p-3 w-full mb-5 bg-white text-black"
                  keyboardType="email-address"
                  placeholderTextColor="#666"
                  value={emergencyContact}
                  onChangeText={setEmergencyContact}
                  style={{ textAlignVertical: "center" }}
                />

                <TouchableOpacity
                  className={`bg-burgundy p-3 rounded-lg w-full ${
                    isLoading ? "opacity-70" : "opacity-100"
                  }`}
                  onPress={handleSignUp}
                  disabled={isLoading}
                >
                  <Text className="text-white text-center font-bold">
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.replace("/(auth)/sign-in")}
                  className="mt-4"
                >
                  <Text className="text-burgundy text-sm">
                    Already have an account?{" "}
                    <Text className="font-bold">Login</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
