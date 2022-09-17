import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { dummyData } from './utils/database';

import Login from './screens/Authentication/Login';
import AppNavigation from './screens/AppNavigation';

//Styling
import { colors } from './styles/colors';

//Fonts
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Abel_400Regular,
} from '@expo-google-fonts/abel';
import {
  OpenSans_400Regular,
} from '@expo-google-fonts/open-sans';

//Te doen:
//Settings pagina

export default function App() {
  const Stack = createStackNavigator()

  const [fontsLoaded, error] = useFonts({
    Abel_400Regular,
    OpenSans_400Regular,
  })

  useEffect(() => {
    // console.log('Gegevens toevoegen');
    // dummyData()
  }, [])

  const screenOptions: StackNavigationOptions = {
    headerShown: false,

    cardStyle: {
      backgroundColor: colors.light,
    }
  }

  if (!fontsLoaded) {
    return <AppLoading />
  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={screenOptions}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Home' component={AppNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}