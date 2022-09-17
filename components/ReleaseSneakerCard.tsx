import { Ionicons } from "@expo/vector-icons"
import { Image, Pressable, ScrollView, Share, Text, View } from "react-native"

import { SQLResultSet, SQLTransaction } from "expo-sqlite"
import { statement, transaction } from "../utils/database"

import LottieView from 'lottie-react-native'; 

//Styling
import { colors } from "../styles/colors"
import { typo } from "../styles/typo"
import card from "../styles/card"
import button from "../styles/button"
import utilities from "../styles/utilities"
import { useEffect, useRef, useState } from "react"

export default ({ sneaker }: { sneaker?: any }) => {
    
    const selectedSneaker = sneaker[0]
    // console.log(selectedSneaker)

    //Animaties
    const [hasReminder, setHasReminder] = useState<boolean>(selectedSneaker?.reminder);
    const animation = useRef(null)
    const isFirstRun = useRef(true)

    useEffect(() => {
        if (isFirstRun.current) {
            if (hasReminder) {
                animation.current.play(54, 54)
            }
            else {
                animation.current.play(0, 0)
            }
            isFirstRun.current = false;
        }
        else if (hasReminder) {
            animation.current.play(0, 54)
        }
        else {
            animation.current.play(54, 0)
        }
    }, [hasReminder])

    const addReminder = async () => {
        console.log(selectedSneaker.name)
        console.log("Adding reminder...")

        setHasReminder(true)

        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(
            tx,
            `UPDATE "tblSneaker" SET reminder = true WHERE id = ${selectedSneaker.id}`,
        )
        console.log(res)
    }

    const removeReminder = async () => {
        console.log(selectedSneaker.name)
        console.log("Removing reminder!")

        setHasReminder(false)

        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(
            tx,
            `UPDATE "tblSneaker" SET reminder = false WHERE id = ${selectedSneaker.id}`,
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
                <Text style={[typo.header2, utilities.marginTopMd]}>{selectedSneaker?.brand} {selectedSneaker?.name}</Text>
                <Text style={typo.header3}>Release: {selectedSneaker?.releaseDate}</Text>
                <Text style={typo.header3}>€{selectedSneaker?.price}</Text>
                <Text style={typo.text}>{selectedSneaker?.description}</Text>
            </View>
            <Pressable style={button.buttonDetail} onPress={hasReminder == true ? removeReminder : addReminder}>
                    <LottieView
                        ref={animation}
                        style={{
                            width: 65,
                            height: 65
                        }}
                        source={require('../assets/Lottie/reminder.json')}
                        autoPlay={false}
                        loop={false}
                    />
                {/* <Ionicons style={utilities.marginRightMd} color={colors.grey[500]} name={selectedSneaker?.reminder == true ? "ios-notifications" : "ios-notifications-outline"} size={32}/> */}
                <Text style={[typo.header3, utilities.marginTopSm]}>{hasReminder == true ? 'Remove reminder' : 'Add reminder'}</Text>
            </Pressable>
            <Pressable style={button.buttonDetail} onPress={share}>
                <Ionicons style={[utilities.marginLeftLg, utilities.marginRightMd]} color={colors.grey[500]} name="share" size={32}/>
                <Text style={[typo.header3, utilities.marginTopSm]}>Share</Text>
            </Pressable>
        </ScrollView>
    )
}