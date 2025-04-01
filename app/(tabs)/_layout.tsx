import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const TabsLayout = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar style="dark" backgroundColor="#ffffff" translucent={true} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#3b82f6", // blue-500
          tabBarInactiveTintColor: "#6b7280", // gray-500
          tabBarStyle: {
            borderTopWidth: 3,
            borderTopColor: "#e5e7eb", // gray-200
            height: 80,
            paddingBottom: 8,
            paddingTop: 12,
            paddingHorizontal: 16,
            marginBottom: 10,
            backgroundColor: "#ffffff",
          },
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTintColor: "#000000",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      >
        <Tabs.Screen
          name="chat-screen"
          options={{
            title: "Chat",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="journal"
          options={{
            title: "Journal",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="journal-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="blogs"
          options={{
            title: "Blogs",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="triangle-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabsLayout;
