import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';

// Sample blog data - replace with actual data from your backend
const blogPosts = [
  {
    id: 1,
    title: 'Understanding Anxiety: A Comprehensive Guide',
    excerpt: 'Learn about the different types of anxiety and effective coping strategies...',
    author: 'Dr. Sarah Johnson',
    date: 'March 28, 2024',
    readTime: '5 min read',
    image: 'https://picsum.photos/400/200',
  },
  {
    id: 2,
    title: 'The Power of Mindfulness in Daily Life',
    excerpt: 'Discover how mindfulness practices can improve your mental well-being...',
    author: 'Dr. Michael Chen',
    date: 'March 27, 2024',
    readTime: '4 min read',
    image: 'https://picsum.photos/400/201',
  },
  // Add more blog posts as needed
];

const BlogPost = ({ post }: { post: typeof blogPosts[0] }) => (
  <TouchableOpacity className="bg-white rounded-3xl shadow-md mb-6 overflow-hidden border border-gray-200">
    <Image
      source={{ uri: post.image }}
      className="w-full h-48"
      resizeMode="cover"
    />
    <View className="p-6">
      <Text className="text-xl font-playBold text-burgundy mb-3">{post.title}</Text>
      <Text className="text-gray-600 mb-4 font-pRegular">{post.excerpt}</Text>
      <View className="flex-row justify-between items-center">
        <Text className="text-sm text-gray-500 font-pLight">{post.author}</Text>
        <View className="flex-row items-center">
          <Text className="text-sm text-gray-500 mr-3 font-pLight">{post.date}</Text>
          <Text className="text-sm text-gray-500 font-pLight">{post.readTime}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default function BlogsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Stack.Screen
        options={{
          title: 'Blogs',
          headerStyle: {
            backgroundColor: '#EAE5D6',
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'Playfair-Bold',
            color: '#402522',
          },
        }}
      />
      <View className="flex-row items-center px-4 py-2">
        <CustomButton
          title="Back"
          handlePress={() => router.back()}
          containerStyles="bg-black"
          textStyles="text-white"
        />
      </View>
      <ScrollView className="flex-1 px-4">
        <Text className="text-3xl font-playBold text-burgundy mb-6 mt-4">Latest Articles</Text>
        {blogPosts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
} 