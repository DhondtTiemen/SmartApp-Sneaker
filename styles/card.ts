import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { sizing } from "./core";

export default StyleSheet.create({
    holder: {
        paddingBottom: sizing.baseLine * 2,
        // borderBottomWidth: 0.2,
        // borderColor: colors.gray[100],
        // backgroundColor: "hotpink"
    },

    image: {
        height: 200,
        width: "100%",
        resizeMode: "cover",
    },

    imageSmall: {
        height: 100,
        width: 100,
        resizeMode: "contain",
    },

    body: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
})