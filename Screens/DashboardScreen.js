import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "../navigation/DrawerNavigation"

export default function DashboardScreen() {
  return (
    <NavigationContainer>
      <DrawerNavigation/>
    </NavigationContainer>
  );
}