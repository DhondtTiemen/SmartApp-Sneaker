import { useEffect, useState } from "react"
import { SafeAreaView, Text, TextInput, View } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { FlatList } from "react-native-gesture-handler"

import { SQLResultSet, SQLTransaction } from "expo-sqlite"
import { statement, transaction } from "../../utils/database"

import { Ionicons } from "@expo/vector-icons"

import SneakerItem from "../../components/SneakerItem"

//Styling
import { colors } from "../../styles/colors"
import { typo } from "../../styles/typo"
import core from "../../styles/core"
import button from "../../styles/button"
import search from "../../styles/searchBar"
import utilities from "../../styles/utilities"

export const AllSneakers = () => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

    const [sneakers, setSneakers] = useState<any[]>([])

    useEffect(() => {
        getSneakers()
    }, [])

    //Sneakers uit database halen
    const getSneakers = async () => {
        console.log("Sneakers ophalen")
        const tx: SQLTransaction = await transaction()
        const read: SQLResultSet = await statement(
            tx,
            `SELECT * FROM 'tblSneaker'`,
        )
        setSneakers(read.rows._array)
    }

    const renderSneaker = ({ item }: { item: Sneaker}) => {
        const sneaker: Sneaker = {
            id: item.id,
            brand: item.brand,
            name: item.name,
            price: item.price,
            url: item.url,
            description: item.description,
            releaseDate: item.releaseDate,
            inCollection: item.inCollection,
            reminder: item.reminder,
        }

        return <SneakerItem sneaker={sneaker} key={item.id}/>
    }

    const searchSneakerInAll = async (textInput: string) => {
        console.log(textInput)
        const tx: SQLTransaction = await transaction()
        const read: SQLResultSet = await statement(
            tx,
            `SELECT * FROM 'tblSneaker' WHERE Name LIKE "%${textInput}%"`,
        )
        setSneakers(read.rows._array)
    }

    return (
        <SafeAreaView style={core.container}>
            <View style={core.header}>
                <View style={button.upperLeftButton}>
                    <Ionicons style={utilities.marginRightMd} color={colors.grey[500]} name="arrow-back" size={32} onPress={() => navigate("Overview")}/>
                    <Text style={[typo.header, typo.header2]}>Add Sneaker: </Text>
                </View>

                {/* Searchbar */}
                <View style={search.bar}>
                    <Ionicons name="search" size={16} color={colors.grey[500]}/>
                    <TextInput style={search.input} placeholder={'Search sneaker'} placeholderTextColor={colors.grey[500]} onChangeText={searchSneakerInAll}/>
                </View>
            </View>

            {/* Flatlist */}
            <FlatList data={sneakers} renderItem={renderSneaker}/>
        </SafeAreaView>
    )
}