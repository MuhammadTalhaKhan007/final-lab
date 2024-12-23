import { Redirect } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Index = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return <Redirect href="/Auth/buyerSignup" />;
};

export default Index;
