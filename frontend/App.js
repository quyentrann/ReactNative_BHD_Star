import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/login/Login'
import Register from './src/register/Register'
import Toast from 'react-native-toast-message';
import InterfaceTab from './src/InterfaceTab';
import FormUpdateUser from './src/formUpdateUser/FormUpdateUser'
import FormChangePassword from './src/formChangePassword/FormChangePassword'
import Detail from './src/details/Detail'

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown : false
      }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="InterfaceTab" component={InterfaceTab} />
        <Stack.Screen name="FormUpdateUser" component={FormUpdateUser} />
        <Stack.Screen name="FormChangePassword" component={FormChangePassword} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
    <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
