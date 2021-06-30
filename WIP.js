import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Dimensions, Image,PixelRatio, SafeAreaView,StyleSheet, Text, View } from 'react-native';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    const newSize = size * scale
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

export const WIP = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.icon} source={require('../images/gears.png')}/>
            <Text style={styles.text}>This page is currently still under construction. We will be releasing this feature in future versions of this app</Text>
            <Button color='grey' title="Go to profile page" onPress={()=> navigation.push('profilePage')}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        alignItems: 'center',
        paddingTop: 60
    },
    icon: {
        height: normalize(100),
        width:normalize(100),
        resizeMode: 'contain',
        opacity:0.5,
    },
    text: {
        fontSize: normalize(16),
        paddingHorizontal: normalize(20),
        paddingBottom: normalize(16),
        textAlign:'center'
    },
    button: {
        backgroundColor: 'grey',
    }

});