import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    if (!name || !email || !password) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Account Created",
        "Your account has been created successfully!",
        [
          {
            text: "Login Now",
            onPress: () => router.replace("/(auth)/sign-in")
          }
        ]
      );
    }, 1500);
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
            {/* Logo Image */}
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
              <Text className="font-playBold text-3xl text-burgundy mb-4">Sign Up</Text>

              <TextInput
                placeholder="Name"
                className="border border-gray-300 rounded-lg p-3 w-full mb-4 bg-white text-black"
                placeholderTextColor="#666"
                value={name}
                onChangeText={setName}
                style={{ textAlignVertical: 'center' }}
              />

              <TextInput
                placeholder="Email"
                className="border border-gray-300 rounded-lg p-3 w-full mb-4 bg-white text-black"
                keyboardType="email-address"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={{ textAlignVertical: 'center' }}
              />

              <View className="w-full relative mb-6">
                <TextInput
                  placeholder="Password"
                  className="border border-gray-300 rounded-lg p-3 w-full bg-white text-black pr-10"
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#666"
                  value={password}
                  onChangeText={setPassword}
                  style={{ textAlignVertical: 'center' }}
                />
                <Pressable 
                  style={{ 
                    position: 'absolute', 
                    right: 12, 
                    top: 0, 
                    height: '100%', 
                    justifyContent: 'center',
                    width: 40,
                    alignItems: 'center'
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
                className={`bg-burgundy p-3 rounded-lg w-full ${isLoading ? 'opacity-70' : 'opacity-100'}`}
                onPress={handleSignUp}
                disabled={isLoading}
              >
                <Text className="text-white text-center font-bold">
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.replace("/(auth)/sign-in")} className="mt-4">
                <Text className="text-burgundy text-sm">Already have an account? <Text className="font-bold">Login</Text></Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
