import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { StyleSheet, Text, View, } from "react-native"
import { colors } from "../styles/colors"
import { sizing } from "../styles/page"
import RNPickerSelect from 'react-native-picker-select';

export default () => {
    const [selectedMonth, setSelectedMonth] = useState()

    return (
        <View style={styles.filterBar}>
            <View style={styles.textFilter}>
                <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
                    items={[
                        { label: 'january', value: 'january' },
                        { label: 'february', value: 'february' },
                    ]}
                />
            </View>
            <Ionicons name="chevron-down" size={16} color={colors.gray}/>
        </View>
    )
}

const styles = StyleSheet.create({
    filterBar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        paddingBottom: sizing.baseLine,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        marginBottom: sizing.baseLine * 2,
    },

    textFilter: {
        backgroundColor: colors.white,
        color: colors.black,
        borderRadius: 10,
        marginVertical: 8,
        marginRight: sizing.baseLine,
    }
})