import { useEffect, useState } from "react"
import { SafeAreaView, Text, View } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import { SQLResultSet, SQLTransaction } from "expo-sqlite"
import { statement, transaction } from "../../utils/database"

import { Ionicons } from "@expo/vector-icons"

import SneakerCard from "../../components/SneakerCard"

//Styles
import { colors } from "../../styles/colors"
import { typo } from "../../styles/typo"
import core from "../../styles/core"
import button from "../../styles/button"
import utilities from "../../styles/utilities"

export const DetailCollection = ({ route }: { route: any }) => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

    const [sneaker, setSneaker] = useState<any[]>([])

    const selectedSneaker = route.params;

    //Geselecteerde sneaker uit database halen
    const getSneaker = async () => {
        const tx: SQLTransaction = await transaction()
        const result: SQLResultSet = await statement(
            tx,
            `SELECT * FROM 'tblSneaker' WHERE tblSneaker.id == ${selectedSneaker.id}`
        )
        setSneaker(result.rows._array)
    }

    useEffect(() => {
        getSneaker()
    }, [])

    return (
        <SafeAreaView style={core.container}>
            <View style={[core.header, button.upperLeftButton]}>
                <Ionicons style={utilities.marginRightMd} color={colors.grey[500]} name="arrow-back" size={32} onPress={() => navigate("Overview")}/>
                <Text style={[typo.header, typo.header2]}>{selectedSneaker.name.length >= 30 ? `${selectedSneaker.name.substring(0, 25)}...` : selectedSneaker.name}</Text>
            </View>

            {/* Sneaker info */}
            <SneakerCard sneaker={sneaker}/>
        </SafeAreaView>
    )
}
