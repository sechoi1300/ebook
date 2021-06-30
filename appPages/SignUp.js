import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity, Dimensions, PixelRatio, TextInput } from "react-native";

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    const newSize = size * scale
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

export const SignUp = ({navigation}) => {
    return (
        <View style = {{flex: 1}}>
            <Text style = {styles.title}>E-Reader</Text>
            <View style={styles.row}>
                <Text style = {styles.input}>Email:</Text>
                <TextInput 
                    placeholder=" Enter email" 
                    underlineColorAndroid='transparent'
                    style = {styles.box}
                />
            </View>
            <View style={styles.row}>
                <Text style = {styles.input}>Full Name:</Text>
                <TextInput 
                    placeholder=" Enter full name" 
                    underlineColorAndroid='transparent'
                    style = {styles.box}
                />
            </View>
            <View style={styles.row}>
                <Text style = {styles.input}>Username:</Text>
                <TextInput 
                    placeholder=" Enter username" 
                    underlineColorAndroid='transparent'
                    style = {styles.box}
                />
            </View>
            <View style={styles.row}>
                <Text style = {styles.input}>Password:</Text>
                <TextInput 
                    placeholder=" Enter password" 
                    underlineColorAndroid='transparent'
                    style = {styles.box}
                />
            </View>
            <TouchableOpacity
                style = {styles.button}
                //onPress = {onPress}
            >
                <Text style = {styles.button}>Sign Up</Text>
            </TouchableOpacity>
            <Text style = {styles.text}>Already have an account?</Text>
            <TouchableOpacity
                style = {styles.login}
                onPress = {() => navigation.push('Login')}
            >
                <Text style = {styles.login}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(50),
        marginTop: normalize(50),
        marginBottom: normalize(50),
        alignSelf: 'center'
    },
    row: {
        flexDirection: 'row',
        marginBottom: normalize(15),
        marginTop: normalize(15),
        marginLeft: normalize(20),
        marginRight: normalize(20)
    },
    input: {
        flex: normalize(3),
        flexDirection: "row",
        borderColor: "black",
        fontSize: normalize(15)
    },
    box: {
        flex: normalize(8),
        flexDirection: "row",
        borderColor: "#b8b8b8",
        backgroundColor: "#dbdbdb",
        color: "black",
        borderWidth: 2,
        fontSize: normalize(15)
    },
    button: {
        alignSelf: "center",
        alignItems: 'center',
        textAlign: "center",
        borderWidth: 2,
        borderColor: "#b8b8b8",
        marginTop: normalize(15),
        height: normalize(30),
        width: normalize(120),
        justifyContent: "center",
        fontSize: normalize(15),
        marginBottom: normalize(15),
        borderRadius: normalize(10)
    },
    text: {
        alignSelf: "center",
        alignItems: 'center',
        textAlign: "center",
        fontSize: normalize(15),
    },
    login: {
        alignSelf: "center",
        alignItems: 'center',
        textAlign: "center",
        marginTop: normalize(5),
        height: normalize(30),
        width: normalize(120),
        justifyContent: "center",
        fontSize: normalize(15),
        marginBottom: normalize(15),
        borderRadius: normalize(10),
        textDecorationLine: 'underline'
    }
});