import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import CreatePost from "../Screens/CreatePost";
import Feed from "../Screens/Feed";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    labeled={false}
      barStyle={styles.bottomTabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          var iconName;

          if (route.name === "Feed") {
            iconName = focused ? "book" : "book-outline";
          } else if ((route.name = "CreatePost")) {
            iconName = focused ? "create" : "create-outline";
          }
          return <Ionicons name={iconName} size={RFValue(25)} color={color} style={styles.icons}/>;
        },
        
       //tabBarActiveTintColor: "tomato",
       //tabBarInactiveTintColor: "gray",
       tabBarStyle: {
        display: "flex",
      },
      })}
      activeColor={"#191970"}
      inactiveColor={"#000000"}
    >
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="CreatePost" component={CreatePost} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#008b8b",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});


export default BottomTabNavigator;
