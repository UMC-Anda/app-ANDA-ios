/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import RegisterScreen from './src/screens/Register/RegisterScreen';
import SplashScreen from './src/screens/SplashScreen';
import {RecoilRoot} from 'recoil';
import {Provider} from 'react-native-paper';
const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    margin: 20,
    lineHeight: 30,
    color: '#333',
    textAlign: 'center',
  },
  bootsplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    height: 89,
    width: 100,
  },
});

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1CBBD9',
    background: '#ffffff',
    text: '#00000',
  },
};

// const paperTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#1CBBD9',
//     background: '#ffffff',
//     text: '#00000',
//   },
// };

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <Provider theme={Theme}>
        <View style={styles.container}>
          <NavigationContainer theme={Theme}>
            <Stack.Navigator
              initialRouteName="SplashScreen"
              screenOptions={{
                headerShown: false,
                animation: 'fade',
              }}>
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                // Hiding header for Splash Screen
                options={{headerShown: false}}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    </RecoilRoot>
  );
}

export default App;
