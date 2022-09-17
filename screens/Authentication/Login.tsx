import { useState } from "react"
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import { authentication } from "../../utils/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

//Styling
import { colors } from "../../styles/colors"
import { typo } from "../../styles/typo"
import core from "../../styles/core"
import utilities from "../../styles/utilities"
import button from "../../styles/button"


export default () => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()
    
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false)

    const registerUser = () => {
        console.log('Registreren')
        // createUserWithEmailAndPassword(authentication, email, password)
        // .then((userCredentials) => {
        //     console.log(userCredentials)
        //     setIsSignedIn(true)
        // })
        // .catch((errors => {
        //     console.log(errors.message)
        // }))

        navigate('Home')
    }

    const signInUser = () => {
        console.log('Inloggen')
        // signInWithEmailAndPassword(authentication, email, password)
        // .then((userCredentials) => {
        //     setIsSignedIn(true);
        // })
        // .catch((errors) => {
        //     console.log(errors.message)
        // })

        navigate('Home')
    }
    
    return (
        <KeyboardAvoidingView style={[core.container, utilities.center]} behavior='padding'>
            <View>
                <Text style={[typo.header, typo.header1]}>Sneakers App</Text>
            </View>
            <View style={utilities.width80}>
                <TextInput placeholder='Email' value={email} onChangeText={text => setEmail(text)} style={core.input} placeholderTextColor={colors.grey[100]}/>
                <TextInput placeholder='Password' value={password} onChangeText={text => setPassword(text)} style={core.input} secureTextEntry={true} placeholderTextColor={colors.grey[100]}/>
            </View>
            <View style={[utilities.width80, utilities.marginTopLg]}>
                <TouchableOpacity onPress={signInUser} style={button.primaryButton}>
                    <Text style={button.primaryButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={registerUser} style={[button.primaryButton, button.secondaryButton, utilities.marginTopSm]}>
                    <Text style={[button.primaryButtonText, button.secondaryButtonText]}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}