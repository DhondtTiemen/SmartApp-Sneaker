import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { sizing } from "./core";

export default StyleSheet.create({
    bar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        paddingBottom: sizing.baseLine,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey[500],
        marginBottom: sizing.baseLine * 2,
    },

    input: {
        backgroundColor: colors.light,
        color: colors.dark,
        borderRadius: 10,
        marginVertical: 8,
        marginRight: sizing.baseLine,
        width: "100%"
    },
})