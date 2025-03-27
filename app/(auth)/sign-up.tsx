import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-1 h-full justify-center items-center">
          {/* Logo Image */}
          <Image
            source={require("../../assets/images/EmoBoat.png")}
            className="w-[260px] h-[260px] top-[-190px]"
            resizeMode="contain"
          />

          {/* Signup Card */}
          <View className="absolute w-[280px] h-3/5 bg-opacity-50 bg-sand flex top-[280px] items-center justify-center px-4 rounded-3xl mt-8 overflow-hidden">
            <Text className="font-playBold text-4xl text-burgundy mb-4">Sign Up</Text>

            {/* Name Input */}
            <TextInput
              placeholder="Name"
              className="border border-gray-300 rounded-lg p-3 w-full mb-4 bg-white"
            />

            {/* Email Input */}
            <TextInput
              placeholder="Email"
              className="border border-gray-300 rounded-lg p-3 w-full mb-4 bg-white"
              keyboardType="email-address"
            />

            {/* Password Input */}
            <TextInput
              placeholder="Password"
              className="border border-gray-300 rounded-lg p-3 w-full mb-6 bg-white"
              secureTextEntry
            />

            {/* Sign Up Button */}
            <TouchableOpacity className="bg-burgundy p-3 rounded-lg w-full">
              <Text className="text-white text-center font-bold">Sign Up</Text>
            </TouchableOpacity>

            {/* Navigate to Login */}
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")} className="mt-4">
              <Text className="text-burgundy text-sm">Already have an account? <Text className="font-bold">Login</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
