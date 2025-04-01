import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="mx-8 w-auto h-1/2 bg-black flex items-center justify-center px-4 rounded-3xl mt-8 overflow-hidden">
          <Image
            source={require("../assets/images/EmoClust.png")}
            className="w-[395px] h-120 absolute transform rotate-90 top-[-400px]"
            resizeMode="contain"
          />
          <Image
            source={require("../assets/images/EmoQuest.png")}
            className="w-[70px] h-[70px] absolute bottom-[0px] left-[10px] transform rotate-20"
            resizeMode="contain"
          />
          <Image
            source={require("../assets/images/EmoMeditation.png")}
            className="w-[160px] h-[160px] absolute justify-center"
            resizeMode="contain"
          />
          <Image
            source={require("../assets/images/EmoSun.png")}
            className="w-[60px] h-[60px] absolute bottom-[35px] left-[220px] transform rotate-20"
            resizeMode="contain"
          />
          <Text className="text-3xl color-purple-50 font-playBold bottom-[-130px] mt-4">
            EmoWell.
          </Text>
        </View>
        
        <View className="flex mx-4 px-4 mt-8">
          <Text className="text-6xl font-playItalic tracking-wider mt-20">
            Let's get
          </Text>
          <Text className="text-6xl font-playItalic tracking-wider mt-4">
            Started !
          </Text>
          <CustomButton
            title="Login"
            handlePress={() => {
              router.push("/(auth)/sign-in");
              console.log("Login button pressed");
            }}
            containerStyles="absolute bg-black right-[240px] bottom-[-80px]"
            textStyles="text-white"
          />
          <CustomButton
            title="Sign Up"
            handlePress={() => {
              router.push("/(auth)/sign-up");
              console.log("Sign Up button pressed");
            }}
            containerStyles="absolute bg-primary right-[40px] bottom-[-80px]"
          />
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}
