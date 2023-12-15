import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

type Props = {
    navigationState: any,
    position: any,
    setIndex: (index: number) => void
}

const TabBar = ({ navigationState, position, setIndex }: Props) => {
    const inputRange = navigationState.routes.map((route: any, index: number) => index);

    return (
        <View style={styles.container}>
            {navigationState.routes.map((route, index) => {
                const opacity = position.interpolate({
                    inputRange,
                    outputRange: inputRange.map((i: any) => (i === index ? 1 : 0.5))
                })
                return (
                    <TouchableOpacity key={index} style={styles.tab} onPress={() => setIndex(index)}>
                        <Animated.Text style={{ fontSize: 18 }}>{route.title}</Animated.Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default TabBar

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc'
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5
    }
})