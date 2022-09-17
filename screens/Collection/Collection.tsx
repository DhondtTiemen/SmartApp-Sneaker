import { useEffect, useState } from "react";
import { Text, SafeAreaView, View, Pressable, TextInput, RefreshControl } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList } from "react-native-gesture-handler";

import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { statement, transaction } from "../../utils/database";

import { Ionicons } from "@expo/vector-icons";

import Card from "../../components/CollectionCard";

//Styling
import { colors } from "../../styles/colors";
import { typo } from "../../styles/typo";
import core from "../../styles/core";
import button from "../../styles/button";
import search from "../../styles/searchBar";

export default ({ navigation }: {navigation: any}) => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

    const [sneakers, setSneakers] = useState<any[]>([])
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        getSneakers()
    }, [])

    //Sneakers uit database halen
    const getSneakers = async () => {
        // console.log('Sneakers ophalen')
        const tx: SQLTransaction = await transaction()
        const read: SQLResultSet = await statement(
            tx,
            `SELECT * FROM 'tblSneaker' WHERE inCollection == true`,
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

        return <Card sneaker={sneaker} key={item.id}/>
    }

    const searchSneakerInCollection = async (textInput: string) => {
        console.log(textInput)
        const tx: SQLTransaction = await transaction()
        const read: SQLResultSet = await statement(
            tx,
            `SELECT * FROM 'tblSneaker' WHERE Name LIKE "%${textInput}%" AND inCollection == true`,
        )
        setSneakers(read.rows._array)
    }

    const onRefresh = () => {
        // console.log("Refreshing");
        getSneakers();
    }

    if (sneakers.length == 0) {
        return (
            <SafeAreaView style={core.container}>
                <View style={core.header}>
                    <View style={button.upperRightButton}>
                        <Text style={[typo.header, typo.header1]}>Collection: </Text>
                        <Pressable onPress={() => navigate("AllSneakers")}>
                            <Ionicons name="add" color={colors.grey[500]} size={32} />
                        </Pressable>
                    </View>
    
                    {/* Searchbar */}
                    <View style={search.bar}>
                        <Ionicons name="search" size={16} color={colors.grey[500]}/>
                        <TextInput style={search.input} placeholder={'Search sneaker'} placeholderTextColor={colors.grey[500]} onChangeText={searchSneakerInCollection}/>
                    </View>
                </View>

                <Text style={typo.errorText}>There are no sneakers in your collection...</Text>
            </SafeAreaView>
        )
    }
    else {
        return (
            <SafeAreaView style={core.container}>
                <View style={core.header}>
                    <View style={button.upperRightButton}>
                        <Text style={[typo.header, typo.header1]}>Collection: </Text>
                        <Pressable onPress={() => navigate("AllSneakers")}>
                            <Ionicons name="add" color={colors.grey[500]} size={32} />
                        </Pressable>
                    </View>
    
                    {/* Searchbar */}
                    <View style={search.bar}>
                        <Ionicons name="search" size={16} color={colors.grey[500]}/>
                        <TextInput style={search.input} placeholder={'Search sneaker'} placeholderTextColor={colors.grey[500]} onChangeText={searchSneakerInCollection}/>
                    </View>
                </View>
    
                {/* Flatlist */}
                <FlatList data={sneakers} renderItem={renderSneaker} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}/>
            </SafeAreaView>
        )
    }

}