import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ConfirmOrder,Billing,Scan ,Home} from "../screens";
import TabNavigation from './TabNavigation'



const StackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"Root"}
    >
      <Stack.Screen name="Root" component={Home} />
      <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} />
      <Stack.Screen name="Billing" component={Billing} />
      <Stack.Screen name="Scan" component={Scan} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})