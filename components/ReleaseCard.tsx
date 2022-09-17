import { useEffect, useRef, useState } from "react"
import { Image, Platform, Pressable, Text, View } from "react-native"
import { useNavigation, ParamListBase } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import LottieView from 'lottie-react-native';

import { SQLResultSet, SQLTransaction } from "expo-sqlite"
import { statement, transaction } from "../utils/database"

import { createEventAsync } from "expo-calendar"

//Styling
import { typo } from "../styles/typo"
import card from "../styles/card"
import utilities from "../styles/utilities"

export default ({ sneaker, calendarId }: { sneaker: Sneaker, calendarId: string }) => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

    //Animaties
    const [reminder, setReminder] = useState<boolean>(sneaker.reminder);
    const animation = useRef(null)
    const isFirstRun = useRef(true)

    useEffect(() => {
        if (isFirstRun.current) {
            if (reminder) {
                animation.current.play(54, 54)
            }
            else {
                animation.current.play(0, 0)
            }
            isFirstRun.current = false;
        }
        else if (reminder) {
            animation.current.play(0, 54)
        }
        else {
            animation.current.play(54, 0)
        }
    }, [reminder])

    const addNewEvent = async () => {
        try {    
          const res = await createEventAsync (
            calendarId, {
            endDate: new Date(sneaker.releaseDate),
            startDate: new Date(sneaker.releaseDate),
            allDay: true,
            title: `Release: ${sneaker.brand} - ${sneaker.name}`,
          });

          console.log('Event Created!');
        } 
        catch (e) {
          console.log(e);
        }
    };

    const addReminder = async () => {
        console.log(sneaker?.name)
        console.log("Adding reminder...")

        setReminder(true)
        addNewEvent()

        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(
            tx,
            `UPDATE "tblSneaker" SET reminder = true WHERE id = ${sneaker?.id}`,
        )
        console.log(res)
    }

    const removeReminder = async () => {
        console.log(sneaker?.name)
        console.log("Removing reminder!")

        setReminder(false)

        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(
            tx,
            `UPDATE "tblSneaker" SET reminder = false WHERE id = ${sneaker?.id}`,
        )
        console.log(res)
    }

    return (
        <Pressable style={card.holder} onPress={() => navigate("Detailrelease", sneaker)}>
            <Image style={card.image} source={{uri: `${sneaker?.url}`}} />
            <View style={card.body}>
                <View>
                    <Text style={[typo.header, typo.header3, utilities.marginTopMd]}>{sneaker?.brand}</Text>
                    <Text style={[typo.header, typo.header2]}>{sneaker.name.length >= 30 ? `${sneaker?.name.substring(0, 25)}...` : sneaker?.name}</Text>
                    <Text style={[typo.header, typo.header3]}>Release: {sneaker?.releaseDate}</Text>
                </View>
                <Pressable onPress={reminder == true ? removeReminder : addReminder}>
                    <LottieView 
                        ref={animation}
                        style={{
                            width: 75,
                            height: 75
                        }}
                        source={require('../assets/Lottie/reminder.json')}
                        autoPlay={false}
                        loop={false}
                    />
                </Pressable>
            </View>
        </Pressable>
    )
}
{/* <Ionicons style={utilities.marginRightMd} name={sneaker?.reminder == true ? "ios-notifications" : "ios-notifications-outline"} color={colors.gray} size={32}/> */}