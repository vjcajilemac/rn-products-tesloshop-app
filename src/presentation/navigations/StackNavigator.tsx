import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ProductScreen from '../screens/product/ProductScreen';
import LoadingScreen from '../screens/loading/LoadingScreen';
import HomeScreen from '../screens/home/HomeScreen';


export type RootStackParam = {
    LoadingScreen: undefined;
    LoginScreen: undefined;
    RegisterScreen: undefined;
    HomeScreen: undefined;
    ProductScreen: { productId:  string}

}

const Stack = createStackNavigator<RootStackParam>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    casrdStyle: {
      opacity: current.progress
    }
  }
}

export const StackNavigator = () => {
  return (
    <Stack.Navigator
        initialRouteName='LoginScreen'
        screenOptions={{
            headerShown: false
            //card interpolation afectaria  a todos
        }}
    >
      <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="LoginScreen" component={LoginScreen} />
      <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
}