import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const sizing = {
    baseLine: 8,
}

export default StyleSheet.create({
    header: {
        paddingTop: sizing.baseLine * 2,
    },
    
    body: {
        paddingTop: sizing.baseLine * 5,
    },

    footer: {
        paddingTop: sizing.baseLine * 5,
    },

    container: {
        flex: 1,
        padding: sizing.baseLine * 2,
        margin: sizing.baseLine * 2,
    },

    input: {
        backgroundColor: colors.light,
        color: colors.dark,
        paddingHorizontal: sizing.baseLine * 2,
        paddingVertical: sizing.baseLine * 2,
        borderRadius: sizing.baseLine,
        marginTop: sizing.baseLine,
    },

    //Colors
    //Background colors
    backgroundDark: {
        backgroundColor: colors.dark,
    },

    backgroundLight: {
        backgroundColor: colors.light,
    },

    //Text colors
    textDark: {
        color: colors.dark,
    },

    textLight: {
        color: colors.light,
    },

    //LottieViews
    lottie: {
        width: 75,
        height: 75,
    }
})