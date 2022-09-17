import { StyleSheet } from "react-native";

import { sizing } from "./core";

export default StyleSheet.create({
    marginTopSm: {
        marginTop: sizing.baseLine,
    },

    marginTopMd: {
        marginTop: sizing.baseLine * 2,
    },

    marginTopLg: {
        marginTop: sizing.baseLine * 3,
    },

    marginBottomSm: {
        marginBottom: sizing.baseLine,
    },

    marginBottomMd: {
        marginBottom: sizing.baseLine * 2,
    },

    marginLeftSm: {
        marginLeft: sizing.baseLine,
    },

    marginLeftMd: {
        marginLeft: sizing.baseLine * 2,
    },

    marginLeftLg: {
        marginLeft: sizing.baseLine * 3,
    },

    marginRightMd: {
        marginRight: sizing.baseLine * 2,
    },

    paddingBottomSm: {
        paddingBottom: sizing.baseLine,
    },

    paddingBottomMd: {
        paddingBottom: sizing.baseLine * 2,
    },

    flexSpaceBetween: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    width80: {
        width: '80%',
    }
}) 