import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterType from './RegisterType';

const Stack = createNativeStackNavigator();

function RegisterScreen({navigation}: any): JSX.Element {
  navigation;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Type" component={RegisterType} />
    </Stack.Navigator>
  );
}

export default RegisterScreen;
