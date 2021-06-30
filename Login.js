import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity,TouchableHighlight, Dimensions, PixelRatio, TextInput } from "react-native";

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    const newSize = size * scale
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

export const Login = ({navigation}) => {
    return (
        <View style = {{flex: 1, backgroundColor:'#FF968A'}}>
            <Text style = {styles.title}>E-Reader</Text>
            <View style={styles.userInfo}>
                <View style={styles.row}>
                    <Text style = {styles.input}>Username</Text>
                    <TextInput 
                        placeholder="Enter username" 
                        underlineColorAndroid='transparent'
                        style = {styles.box}
                    />
                </View>
                <View style={styles.row}>
                    <Text style = {styles.input}>Password</Text>
                    <TextInput 
                        placeholder="Enter password" 
                        underlineColorAndroid='transparent'
                        style = {styles.box}
                    />
                </View>
            </View>
            <TouchableHighlight
                style = {styles.button}
                activeOpacity={0.6}
                underlayColor="#FFD8BE"
                onPress = {() => navigation.navigate('App',{screen:'Dash'})}
            >
                <Text style={{fontSize:normalize(15)}}>Login</Text>
            </TouchableHighlight>
            <TouchableOpacity
                style = {styles.login}
                onPress = {() => navigation.push('SignUp')}
            >
                <Text style = {styles.login}>New user?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = {styles.login}
                //onPress = {onPress}
            >
                <Text style = {styles.login}>Forgot Password</Text>
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
        alignItems:'center',
        marginBottom: normalize(15),
        marginTop: normalize(15),
        marginLeft: normalize(20),
        marginRight: normalize(20)
    },
    input: {
        flex: normalize(3),
        flexDirection: "row",
        borderColor: "black",
        fontSize: normalize(14)
    },
    box: {
        flex: normalize(8),
        flexDirection: "row",
        borderColor: "#b8b8b8",
        backgroundColor: "#dbdbdb",
        color: "black",
        borderWidth: 2,
        fontSize: normalize(15),
        paddingHorizontal:normalize(6)
    },
    button: {
        alignSelf: "center",
        alignItems: 'center',
        textAlign: "center",
        borderWidth: 2,
        borderColor: "#b8b8b8",
        backgroundColor:'#ffffff',
        marginTop: normalize(100),
        height: normalize(30),
        width: normalize(120),
        justifyContent: "center",
        marginBottom: normalize(15),
        borderRadius: normalize(10),
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
        marginTop: normalize(1),
        height: normalize(30),
        width: normalize(120),
        justifyContent: "center",
        fontSize: normalize(15),
        borderRadius: normalize(10),
        textDecorationLine: 'underline',
        fontWeight:'bold',
        
    },
    userInfo:{
        backgroundColor:"#ffffff",
        borderRadius:normalize(15),
        marginHorizontal:normalize(15),
        shadowColor:"#000000",
        shadowOffset:{
            width:0,
            height:12,
        },
        shadowOpacity:.58,
        shadowRadius: 16,
        elevation:24,
    }
});