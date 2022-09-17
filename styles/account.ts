import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { sizing } from "./core";

export default StyleSheet.create({
    imageHolder: {
        paddingTop: sizing.baseLine * 3,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth: 1,
        paddingBottom: sizing.baseLine * 7,
    },

    image: {
        height: 100,
        width: 100,
        resizeMode: "cover",
        borderRadius: 100,
        marginBottom: sizing.baseLine * 3,
    },

    input: {
        fontSize: 16,
        marginBottom: sizing.baseLine * 2,
    },
})