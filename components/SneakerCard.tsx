import { useEffect, useRef, useState } from "react"
import { Image, Pressable, ScrollView, Share, Text, View } from "react-native"

import { SQLResultSet, SQLTransaction } from "expo-sqlite"
import { statement, transaction } from "../utils/database"

import { Ionicons } from "@expo/vector-icons"
import LottieView from 'lottie-react-native'

//Styling
import { colors } from "../styles/colors"
import {typo} from "../styles/typo"
import core from "../styles/core"
import card from "../styles/card"
import button from "../styles/button"
import utilities from "../styles/utilities"

export default ({ sneaker }: { sneaker?: any }) => {
    const selectedSneaker = sneaker[0]
    console.log(selectedSneaker);

    const [inCollection, setInCollection] = useState<boolean>(selectedSneaker?.inCollection);
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
        console.log(selectedSneaker?.name)
        console.log("Adding to your collection...")

        setInCollection(true)

        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(
            tx,
            `UPDATE "tblSneaker" SET inCollection = true WHERE id = ${selectedSneaker?.id}`
        )
        console.log(res)
    }

    const removeFromCollection = async () => {
        console.log(selectedSneaker?.name)
        console.log("Removing from your collection!")

        setInCollection(false)

        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(
            tx,
            `UPDATE "tblSneaker" SET inCollection = false WHERE id = ${selectedSneaker.id}`,
        )
        console.log(res)
    }

    const share = async () => {
        const result = await Share.share({
            message: selectedSneaker?.name
        })
        // console.log(result)
    }

    return (
        <ScrollView>
            <Image style={card.image} source={{uri: `${selectedSneaker?.url}`}} />
            <View>
                <Text style={[typo.header, typo.header2, utilities.marginTopMd]}>{selectedSneaker?.brand} {selectedSneaker?.name}</Text>
                <Text style={[typo.header, typo.header3]}>Released: {selectedSneaker?.releaseDate}</Text>
                <Text style={[typo.header, typo.header3]}>€{selectedSneaker?.price}</Text>
                <Text style={typo.text}>{selectedSneaker?.description}</Text>
            </View>
            
            {/* Buttons */}
            <Pressable style={button.buttonDetail} onPress={inCollection == true ? removeFromCollection : addToCollection}>
                <LottieView
                        ref={animation}
                        style={[core.lottie]}
                        source={require('../assets/Lottie/add.json')}
                        autoPlay={false}
                        loop={false}
                />
                <Text style={[typo.header3, utilities.marginTopSm]}>{inCollection == true ? "Added to your collection" : "Add to your collection"}</Text>
            </Pressable>

            <Pressable style={button.buttonDetail} onPress={share}>
                <Ionicons style={[utilities.marginLeftLg, utilities.marginRightMd]} color={colors.grey[500]} name="share" size={32}/>
                <Text style={[typo.header3, utilities.marginTopSm]}>Share</Text>
            </Pressable>
        </ScrollView>
    )
}