import { ParamListBase, RouteProp } from "@react-navigation/native";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Ionicons } from "@expo/vector-icons";

import Collection from '../Collection/index';
import Calendar from '../Calendar/index';
import Account from "../Account/index";

//Styling
import { colors } from "../../styles/colors";

export default () => {
    //Maak navigator
    const bottomTab = createBottomTabNavigator();

    //Stijlen van de navigatie
    const screenOptions = ({ route }: { route: RouteProp<ParamListBase> }) : BottomTabNavigationOptions => ({
        //Geef elke bottomtab screen een andere icon
        tabBarIcon: ({
            focused,
            color,
            size,
        }: {
            focused: boolean
            color: string
            size: number
        }) => {
            if (route.name == 'Collection')
                return <Ionicons color={color} name="albums" size={size}/>

            if (route.name == 'Calendar')
                return <Ionicons color={color} name="calendar" size={size}/>

            if (route.name == 'Account')
                return <Ionicons color={color} name="person" size={size}/>
        },
        
        //Stijl de header
        headerShown: false,

        //Stijl de tabbar
        tabBarActiveTintColor: colors.alpha,
        tabBarInactiveTintColor: colors.grey[100],
    })

    return (
        <bottomTab.Navigator screenOptions={screenOptions}>
            <bottomTab.Screen name="Collection" component={Collection}/>
            <bottomTab.Screen name="Calendar" component={Calendar}/>
            <bottomTab.Screen name="Account" component={Account}/>
        </bottomTab.Navigator>
    )
}