import { Ionicons } from "@expo/vector-icons"
import { SQLResultSet, SQLTransaction } from "expo-sqlite"
import { useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { colors } from "../styles/colors"
import { sizing } from "../styles/page"
import { statement, transaction } from "../utils/database"

export default () => {
    const [sneakers, setSneakers] = useState<any[]>([])

    const searchSneakerInCollection = async (textInput: string) => {
        const tx: SQLTransaction = await transaction()
        const read: SQLResultSet = await statement(
            tx,
            `SELECT * FROM 'tblSneaker' WHERE Name == "%${textInput}%"`,
        )
        setSneakers(read.rows._array)
    }

    const searchSneaker = (textInput: string) => {
        console.log(textInput)
        searchSneakerInCollection(textInput);
    }

    return (
        <View style={styles.searchBar}>
            <Ionicons name="search" size={16} color={colors.gray}/>
            <TextInput style={styles.textSearch} placeholder={'Search sneaker'} placeholderTextColor={colors.gray} onChangeText={searchSneaker}/>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: sizing.baseLine,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        marginBottom: sizing.baseLine * 2,
    },

    textSearch: {
        backgroundColor: colors.white,
        color: colors.black,
        marginVertical: 8,
        borderRadius: 10,
        marginLeft: sizing.baseLine,
    },
})