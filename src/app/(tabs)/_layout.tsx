import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Platform } from "react-native";
import { FontAwesomeIcon as RNFontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FontAwesomeIcon as WebFontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import {
  faBroadcastTower,
  faFire,
  faShield,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const FontAwesomeIcon =
    Platform.OS === "web" ? WebFontAwesomeIcon : RNFontAwesomeIcon;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Authentication",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faShield} style={{ fontSize: 25, color }} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="realtime"
        options={{
          title: "Realtime",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon
              icon={faBroadcastTower}
              style={{ fontSize: 25, color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="firestore"
        options={{
          title: "Firestore",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faFire} style={{ fontSize: 25, color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="storage"
        options={{
          title: "Firestorage",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon
              icon={faDatabase}
              style={{ fontSize: 25, color }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
