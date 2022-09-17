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
        marginVertical: 8,
        borderRadius: 10,
        marginLeft: sizing.baseLine,
        width: "100%",
    },
})