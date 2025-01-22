import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import "../global.css";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Playfair-Italic": require("../assets/fonts/PlayfairDisplay-Italic.ttf"),
    "Playfair-Regular": require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
    "Playfair-Bold": require("../assets/fonts/PlayfairDisplay-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen name="profile" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
