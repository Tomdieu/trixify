import { ActivityIndicator, FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft, MoreVertical, Search } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import * as Contacts from 'expo-contacts';
import Contact from '@/components/Contact'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { useTab } from '@/hooks/tabStore'
import { set } from 'zod'
import { checkPhoneNumbers } from '@/utils/lib/react-query'


type Props = {}

const StartChatScreen = (props: Props) => {
    const router = useRouter()
    const [contacts, setContacts] = React.useState<Contacts.Contact[]>([]);
    const [loading, setLoading] = React.useState(true);

    const [searchOpen, setSearchOpen] = React.useState(false);
    const [search, setSearch] = React.useState("")

    const [searchResults, setSearchResults] = React.useState<Contacts.Contact[]>([])

    const toggleSearch = () => setSearchOpen(!searchOpen)

    const searchWidth = useSharedValue(0)
    const searchRef = useRef<TextInput>(null)

    const handleSearchPress = () => {
        setSearchOpen(!searchOpen)
        searchWidth.value = withTiming(100, { duration: 200 });
        searchRef.current.focus();
    }

    const searchBarStyle = useAnimatedStyle(() => {
        return {
            width: `${searchWidth.value}%`,
        };
    });

    const { setShow } = useTab()

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
                });

                const numbers = data.filter(contact => contact.phoneNumbers).filter(contact => !contact.phoneNumbers[0].number.startsWith('*')).map(contact => contact)
                
                setContacts(numbers);
                setSearchResults(numbers);
                setLoading(false)

                if (data.length > 0) {
                    const contact = data[0];
                    // console.log(contact);
                }
            }
        })();
        setShow(false)
    }, []);

    useEffect(() => {
        if (contacts) {
            const numbers = contacts.map(contact => contact.phoneNumbers ? contact.phoneNumbers[0].number : "")
            // console.log(numbers);
            const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
            numbers.map(number => {
                // console.log(number,phoneNumberRegex.test(number))
            })
            checkPhoneNumbers(numbers).then(response=>{
                console.log(response);
            })
        }                                                                                                                                                                                                   
    }, [contacts])

    useEffect(() => {
        if (search.length > 0) {
            const results = contacts.filter((contact) => {
                return contact.name.toLowerCase().includes(search.toLowerCase())
            })
            setSearchResults(results)
        } else {
            setSearchResults(contacts)
        }
    }, [search])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle='light-content' backgroundColor={"#2A87FF"} />
            <View className='flex-1 bg-[#2A87FF]'>
                <View className='flex-row space-x-3 px-3 items-center' style={{ elevation: 0 }}>
                    <TouchableOpacity className='py-3 px-2' onPress={() => { setShow(true); router.back() }}>
                        <ArrowLeft size={28} color='#fff' />
                    </TouchableOpacity>

                    {searchOpen ? (
                        <View className='flex-1 border rounded-md my-1 py-0.5 border-gray-200'>
                            <TextInput value={search} onChangeText={setSearch} placeholder='Search' className='flex-1 px-2 caret-white text-white placeholder-white'  inputMode='search' />
                        </View>
                    ) : (
                        <View style={{flex:1,width:"100%"}} className='flex-1 items-center justify-start px-2'>
                            {contacts.length > 0 ? <View className='w-full px-0.5 flex-1 items-start justify-start'>
                                <Text className='text-base text-white'>Select Contact</Text>
                                <Text className='text-xs text-white' style={{ fontFamily: "poppins-regular" }}>{contacts.length} contacts</Text>
                            </View> : (
                                <View style={[styles.searchBar]}>
                                    <Text ref={searchRef} className='w-full font-semibold text-sm text-white' style={{ color: "#fff", fontSize: 19, fontFamily: "poppins-regular" }}>Contacts</Text>

                                </View>
                            )}
                        </View>
                    )}


                    <View className='flex-row h-full space-x-4 items-center justify-end'>
                        <TouchableOpacity onPress={() => toggleSearch()}>
                            <Search size={28} color='#fff' />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MoreVertical size={28} color='#fff' />
                        </TouchableOpacity>

                    </View>
                </View>



                <ScrollView className='flex-1'>
                    <View className={`bg-white w-full ${!loading ? null : "hidden"}`}>
                        <TouchableOpacity className='bg-white'>
                            <View className={`flex-row items-center px-3 py-2 `} style={{ elevation: 0 }}>
                                <View className={`flex-row items-center justify-center border border-green-300 bg-green-500 rounded-full w-12 h-12`}>

                                    <Ionicons name='people' size={32} color={"#fff"} />
                                </View>
                                <View className='flex-1 ml-3'>
                                    <Text className='text-green-600 text-base' style={{ fontFamily: "poppins-semibold" }}>New Group</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View className={`flex-row items-center px-3 py-2`} style={{ elevation: 0 }}>
                                <View className={`flex-row items-center justify-center border border-blue-300 bg-blue-400 rounded-full w-12 h-12`}>
                                    <Ionicons name="person-add-sharp" size={24} color="#fff" />
                                </View>
                                <View className='flex-1 ml-3'>
                                    <Text className='text-blue-400 text-base' style={{ fontFamily: "poppins-semibold" }}>New Contact</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                    {loading && <View className='flex-1 items-center justify-center'>
                        <ActivityIndicator size={100} color='#2A87FF' />
                    </View>}
                    {!loading && (
                        <>
                            {searchResults.map((contact) => (
                                <Contact contact={contact} key={contact.id} />
                            ))}
                        </>
                    )}

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default StartChatScreen

const styles = StyleSheet.create({
    searchBar: {
        height: 40,
        width: 0,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
})