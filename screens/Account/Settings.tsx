import { SafeAreaView, Text, View, Button } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { ParamListBase, useNavigation } from "@react-navigation/native"

import { Ionicons } from "@expo/vector-icons"

//Styling
import { colors } from "../../styles/colors"
import { typo } from "../../styles/typo"
import core from "../../styles/core"
import button from "../../styles/button"
import utilities from "../../styles/utilities"

export const Settings = () => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

    const triggerDeleteAccount = () => {
        console.log("Deleting account...")
        navigate('Login')
    }

    return (
        <SafeAreaView style={core.container}>
            <View style={[core.header, button.upperLeftButton]}>
                <Ionicons style={utilities.marginBottomMd} color={colors.grey[500]} name="arrow-back" size={32} onPress={() => navigate("Overview")}/>
                <Text style={[typo.header, typo.header1, utilities.marginLeftSm]}>Settings</Text>
            </View>
            <View>
                <Button color={colors.actions.error} onPress={triggerDeleteAccount} title="Delete Account"/>
            </View>
        </SafeAreaView>
    )
}