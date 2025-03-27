import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

const SignUp = () => {
  const router = useRouter();

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

          
          <View
            style={{
              position: "absolute",
              width: 280,
              height: "50%",
              backgroundColor: "rgba(244, 223, 205, 0.3)",
              top: 280,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 16,
              borderRadius: 20,
              marginTop: 8,
              overflow: "hidden",
            }}
          >
            <Text className="font-playBold text-4xl text-burgundy mb-4">Sign Up</Text>

            
            <TextInput
              placeholder="Name"
              className="border border-gray-300 rounded-lg p-3 w-full mb-4 bg-white text-black"
              placeholderTextColor="#666"
            />

            
            <TextInput
              placeholder="Email"
              className="border border-gray-300 rounded-lg p-3 w-full mb-4 bg-white text-black"
              keyboardType="email-address"
              placeholderTextColor="#666"
            />

            
            <TextInput
              placeholder="Password"
              className="border border-gray-300 rounded-lg p-3 w-full mb-6 bg-white text-black"
              secureTextEntry
              placeholderTextColor="#666"
            />

           
            <TouchableOpacity className="bg-burgundy p-3 rounded-lg w-full">
              <Text className="text-white text-center font-bold">Sign Up</Text>
            </TouchableOpacity>

            
            <TouchableOpacity onPress={() => router.replace("/sign-in")} className="mt-4">
              <Text className="text-burgundy text-sm">Already have an account? <Text className="font-bold">Login</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
