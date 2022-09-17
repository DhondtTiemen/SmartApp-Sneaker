import { useState } from "react";
import { Button, Image, Pressable, SafeAreaView, Text, TextInput, View } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

//Styling
import { colors } from "../../styles/colors";
import { typo } from "../../styles/typo";
import core from "../../styles/core";
import account from "../../styles/account";
import button from "../../styles/button";
import utilities from "../../styles/utilities";

export default () => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

    const triggerLogOut = () => {
        console.log("Logging out...")
        navigate('Login')
    }

    //UseStates
    const [firstName, setFirstName] = useState("Tiemen")
    const [lastName, setLastName] = useState("Dhondt")
    const [email, setEmail] = useState("tiemen.dhondt2@student.howest.be")

    return (
        <SafeAreaView style={core.container}>
            <View style={[button.upperRightButton, core.header]}>
                <Text style={[typo.header, typo.header1]}>Account: </Text>
                <Pressable onPress={() => navigate("Settings")}>
                    <Ionicons name="settings" color={colors.grey[500]} size={32}/>
                </Pressable>
            </View>

            <View style={core.body}>
                <View style={[account.imageHolder]}>
                    <Image style={[account.image, utilities.paddingBottomMd]} source={{uri: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.6435-9/157230181_1421015028235325_2604689619399905216_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Ab8SwAJ_VtAAX8OJauL&_nc_ht=scontent-bru2-1.xx&oh=00_AT_rkn9xqjoAvrfttmpPcNuDjgiWIXH5yZ24aFoZE6qMCg&oe=6276B21D"}}/>
                </View>
                
                <Text style={[typo.header, typo.header2, utilities.marginTopMd]}>First Name</Text>
                <TextInput style={account.input} onChangeText={(str) => setFirstName(str)} value={firstName} placeholder={"John"}/>
    
                <Text style={[typo.header, typo.header2]}>Last Name</Text>
                <TextInput style={account.input} onChangeText={(str) => setLastName(str)} value={lastName} placeholder={"Doe"}/>
    
                <Text style={[typo.header, typo.header2]}>Email</Text>
                <TextInput style={account.input} onChangeText={(str) => setEmail(str)} value={email} placeholder={"john.doe@email.com"}/>
            </View>

            <View style={core.footer}>                
                <Button color={colors.actions.error} onPress={triggerLogOut} title="Log out"/>
            </View>
        </SafeAreaView>
    )
}