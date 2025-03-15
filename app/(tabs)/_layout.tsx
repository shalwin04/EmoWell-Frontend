import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const TabsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="chat-screen" options={{ headerShown: false }} />
      {/* <Stack.Screen name="sign-up" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default TabsLayout;
