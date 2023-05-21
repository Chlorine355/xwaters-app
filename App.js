/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  Dimensions,
  LogBox,
  StyleSheet,
} from 'react-native';

import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Icon} from 'react-native-elements';
import Login from "./Login";
import Home from "./Home";
import Swim from "./Swim";
import Results from "./Results";
import Result from "./Result";
import More from "./More";
import LK from "./LK";



LogBox.ignoreAllLogs();//Ignore all log notifications

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
      <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Главная') {
                iconName = focused
                    ? 'home'
                    : 'home-outline';
              } else if (route.name === 'Результаты') {
                iconName = focused ? 'podium' : 'podium-outline';
              } else if (route.name === 'Личный кабинет') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              } else if (route.name === 'Ещё') {
                iconName = focused ? 'apps' : 'apps-outline';
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} type={"ionicon"} />;
            }})}>
        <Tab.Screen name="Главная" component={Home} />
        <Tab.Screen name="Результаты" component={Results} />
        <Tab.Screen name="Личный кабинет" component={LK} />
        <Tab.Screen name="Ещё" component={More} />
      </Tab.Navigator>
  );
}

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Tabs" component={Tabs}/>
        <Stack.Screen name="Swim" component={Swim}/>
        <Stack.Screen name="Result" component={Result}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
  }

