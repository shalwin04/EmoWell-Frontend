import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="mx-8 w-auto h-1/2 bg-white flex items-center justify-center px-4 rounded-3xl mt-8">
          <Image
            source={require("../assets/images/EmoBalloon.png")}
            className="w-72 h-72"
          />
          <Text className="text-3xl font-playBold mt-4">EmoWell.</Text>
        </View>
        <Text className="px-6 text-6xl font-playBold mt-8">Hi,</Text>
        <Text className="">Let's get started!</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
