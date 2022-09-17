import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { sizing } from "./core";

export default StyleSheet.create({
    primaryButton: {
        backgroundColor: colors.alpha,
        padding: sizing.baseLine * 2,
        alignItems: 'center',
        borderRadius: sizing.baseLine,
    },

    primaryButtonText: {
        color: colors.light,
        fontWeight: '700',
    },

    secondaryButton: {
        backgroundColor: colors.light,
        borderColor: colors.alpha,
        borderWidth: 2,
    },

    secondaryButtonText: {
        color: colors.alpha,
    },

    upperRightButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    upperLeftButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
    },

    buttonDetail: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",

        height: 75,

        borderRadius: 16,
        borderWidth: 1,

        paddingHorizontal: sizing.baseLine * 2,
        paddingVertical: sizing.baseLine,

        marginVertical: sizing.baseLine,
    },
})