import { useEffect, useState } from "react";
import { Text, SafeAreaView, View, RefreshControl, Platform } from "react-native"
import { FlatList } from "react-native-gesture-handler";
import RNPickerSelect from 'react-native-picker-select';

import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { statement, transaction } from "../../utils/database";

import { CalendarAccessLevel, createCalendarAsync, EntityTypes, getCalendarsAsync, requestCalendarPermissionsAsync } from "expo-calendar";

import Card from "../../components/ReleaseCard";

import { Ionicons } from "@expo/vector-icons";

//Styling
import { colors } from "../../styles/colors";
import { typo } from "../../styles/typo";
import core from "../../styles/core";
import utilities from "../../styles/utilities";
import filter from "../../styles/filterBar";

export default ({ navigation }: {navigation: any}) => {
    const [sneakers, setSneakers] = useState<any[]>([])
    const [refreshing, setRefreshing] = useState(false)

    //Calendar
    const [isFirstTime, setFirstTime] = useState<boolean>(true)
    const [sneakerCalendarId, setSneakerCalendarId] = useState<string>("")

    //Checking permissions
    useEffect(() => {
        (async () => {
            const { status } = await requestCalendarPermissionsAsync()

            if (status === "granted") {
                const calendars = await getCalendarsAsync(
                    EntityTypes.EVENT
                )
            }
        })()
    }, [])

    useEffect(() => {
        getSneakers()
        createCalendar()
    }, [])

    //Getting calendar source
    const getDefaultCalendarSource = async () => {
        const calendars = await getCalendarsAsync(
          EntityTypes.EVENT
        );

        const defaultCalendars = calendars.filter(
          (each) => each.title === 'default'
        );
    
        return defaultCalendars.length
          ? defaultCalendars[0].source
          : calendars[0].source;
    }

    const createCalendar = async () => {
        const defaultCalendarSource =
          Platform.OS === 'ios'
            ? await getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'Sneakers Calendar' };
   
        if (isFirstTime) {
          const calendarId = await createCalendarAsync({
            title: 'Sneakers Calendar',
            color: "#00afdb",
            entityType: EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: CalendarAccessLevel.OWNER,
          });
          
          setFirstTime(false)
          setSneakerCalendarId(calendarId)

          console.log("Calendar Created!")
    
          return calendarId
        }
        else {
          const calendarId = sneakerCalendarId
          return calendarId
        }
    }

    //Sneakers uit database halen
    const getSneakers = async () => {
        console.log('Sneakers ophalen');
        const tx: SQLTransaction = await transaction()
        const read: SQLResultSet = await statement(
            tx,
            `SELECT * FROM 'tblSneaker' WHERE DATE(releaseDate) >= DATE() ORDER BY DATE(releaseDate) ASC`,
        )
        // console.log(read);
        setSneakers(read.rows._array)
    }

    const renderSneaker = ({ item }: { item: Sneaker }) => {
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

        return <Card sneaker={sneaker} calendarId={sneakerCalendarId} key={item.id}/>
    }

    const filterSneakers = async ( brand: string ) => {
        console.log(brand);

        if (brand != null) {
            const tx: SQLTransaction = await transaction()
            const read: SQLResultSet = await statement(
                tx,
                `SELECT * FROM 'tblSneaker' WHERE DATE(releaseDate) >= DATE() AND Brand LIKE "%${brand}%" ORDER BY releaseDate ASC`,
            )
            setSneakers(read.rows._array)
        }
        else {
            const tx: SQLTransaction = await transaction()
            const read: SQLResultSet = await statement(
                tx,
                `SELECT * FROM 'tblSneaker' WHERE DATE(releaseDate) >= DATE() ORDER BY DATE(releaseDate) ASC`,
            )
            setSneakers(read.rows._array);
        }
    }

    const onRefresh = () => {
        console.log("Refreshing")
        getSneakers();
    }

    if (sneakers.length == 0) {
        return (
            <SafeAreaView style={core.container}>
                <View style={core.header}>
                    <Text style={[typo.header, typo.header1]}>Calendar</Text>
    
                    {/* Filter bar */}
                    <View style={filter.bar}>
                        <Ionicons style={utilities.marginRightMd} name="chevron-down" size={16} color={colors.grey[500]}/>
                        <View style={filter.input}>
                            <RNPickerSelect
                                placeholder={{ label: "Choose a brand", value: null }}
                                onValueChange={filterSneakers}
                                items={[
                                    { label: 'Adidas', value: 'Adidas' },
                                    { label: 'Converse', value: 'Converse' },
                                    { label: 'Nike', value: 'Nike' },
                                ]}
                            />
                        </View>
                    </View>
                </View>
    
                <Text style={typo.errorText}>There are no releases at the moment...</Text>
            </SafeAreaView>
        )
    }
    else {
        return (
            <SafeAreaView style={core.container}>
                <View style={core.header}>
                    <Text style={[typo.header, typo.header1]}>Calendar</Text>
    
                    {/* Filter bar */}
                    <View style={filter.bar}>
                        <Ionicons style={utilities.marginRightMd} name="chevron-down" size={16} color={colors.grey[500]}/>
                        <View style={filter.input}>
                            <RNPickerSelect
                                placeholder={{ label: "Choose a brand", value: null }}
                                onValueChange={filterSneakers}
                                items={[
                                    { label: 'Adidas', value: 'Adidas' },
                                    { label: 'Converse', value: 'Converse' },
                                    { label: 'Nike', value: 'Nike' },
                                ]}
                            />
                        </View>
                    </View>
                </View>
    
                {/* Flatlist */}
                <FlatList data={sneakers} renderItem={renderSneaker} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}/>
            </SafeAreaView>
        )
    }
}