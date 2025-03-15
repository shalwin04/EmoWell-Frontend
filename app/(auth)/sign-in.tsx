import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-1 h-full justify-center items-center">
          <Image
            source={require("../../assets/images/EmoBoat.png")}
            className="w-[260px] h-[260px] top-[-190px]"
            resizeMode="contain"
          />
          <View className="absolute justify-centerx-8 w-[280px] h-1/2 bg-sand flex top-[280px] items-center justify-center px-4 rounded-3xl mt-8 overflow-hidden">
            <Text className="font-playBold text-4xl text-burgundy">Login</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
