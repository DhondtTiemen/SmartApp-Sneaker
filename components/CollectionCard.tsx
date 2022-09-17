import { useEffect, useRef, useState } from "react"
import { Image, Pressable, Text, View } from "react-native"
import { useNavigation, ParamListBase } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import { SQLResultSet, SQLTransaction } from "expo-sqlite"
import { statement, transaction } from "../utils/database"

import LottieView from 'lottie-react-native';

//Styling
import { typo } from "../styles/typo"
import card from "../styles/card"
import utilities from "../styles/utilities"
import core from "../styles/core"

export default ({ sneaker }: { sneaker: Sneaker }) => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

    const [inCollection, setInCollection] = useState<boolean>(sneaker.inCollection);
    const animation = useRef(null)
    const isFirstRun = useRef(true)

    useEffect(() => {
        if (isFirstRun.current) {
            if (inCollection) {
                animation.current.play(75, 75)
            }
            else {
                animation.current.play(26, 26)
            }
            isFirstRun.current = false;
        }
        else if (inCollection) {
            animation.current.play(26, 75)
        }
        else {
            animation.current.play(75, 26)
        }
    }, [inCollection])

    const addToCollection = async () => {
        console.log(sneaker.name)
        console.log("Adding to collection...")

        setInCollection(true)

        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(
            tx,
            `UPDATE "tblSneaker" SET inCollection = true WHERE id = ${sneaker?.id}`
        )
        console.log(res)
    }

    const removeFromCollection = async () => {
        console.log(sneaker.name)
        console.log("Removing from collection!")

        setInCollection(false)

        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(
            tx,
            `UPDATE "tblSneaker" SET inCollection = false WHERE id = ${sneaker?.id}`
        )
        console.log(res)
    }

    return (
        <Pressable style={card.holder} onPress={() => navigate("Detailcollection", sneaker)}>
            <Image style={card.image} source={{uri: `${sneaker?.url}`}} />
            <View style={card.body}>
                <View>
                    <Text style={[typo.header, typo.header3, utilities.marginTopMd]}>{sneaker?.brand}</Text>
                    <Text style={[typo.header, typo.header2]}>{sneaker.name.length >= 30 ? `${sneaker?.name.substring(0, 25)}...` : sneaker?.name}</Text>
                    <Text style={[typo.header, typo.header3]}>€{sneaker?.price}</Text>
                </View>
                <Pressable onPress={inCollection == true ? removeFromCollection : addToCollection}>
                    <LottieView 
                        ref={animation}
                        style={core.lottie}
                        source={require('../assets/Lottie/add.json')}
                        autoPlay={false}
                        loop={false}
                    />
                </Pressable>
            </View>
        </Pressable>
    )
}