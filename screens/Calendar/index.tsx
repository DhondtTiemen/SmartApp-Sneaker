import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack"

import Overview from "./Calendar"
import { DetailRelease } from "./Detail"

//Styling
import { colors } from "../../styles/colors"

export default () => {
    const Stack = createStackNavigator()

    const screenOptions : StackNavigationOptions = {
        headerShown: false,

        cardStyle: {
            backgroundColor: colors.light,
        }
    }

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Overview" component={Overview}/>
            <Stack.Screen name="Detailrelease" component={DetailRelease}/>
        </Stack.Navigator>
    )
}