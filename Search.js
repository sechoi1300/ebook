import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { Button, Dimensions, Image,PixelRatio, SafeAreaView,StyleSheet, Text,TextInput,TouchableOpacity, View } from 'react-native';
import {Picker} from '@react-native-community/picker'
import WIP from "./WIP";


const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    const newSize = size * scale
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

export const Search = ({navigation}) => {
    const [selectedValue,setSelectedValue]=useState("author");
    return (
        <View style={styles.container}>
            <View style={styles.searchView}>
                <TextInput
                    placeholder="Harry Potter"
                    underlineColorAndroid='transparent'
                    style = {styles.searchBox}
                    onChangeText={function (){
                    }}
                />
            </View>
            <View style={styles.textBar}>
                <Text>RELATED SEARCHES</Text>
                <View style={styles.pickerRow}>
                    <Text style={{fontWeight:'bold',fontSize:normalize(14)}}>Sort by:</Text>
                    <Picker
                        selectedValue={selectedValue}
                        style={{height:normalize(20),width:normalize(100)}}
                        onValueChange={(itemValue,itemIndex)=>setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Author" value="author"/>
                        <Picker.Item label="Genre" value="genre"/>
                        <Picker.Item label="Series" value="series"/>
                        <Picker.Item label="Title" value="title"/>
                    </Picker>
                </View>
            </View>
            <View style={styles.bookContainer}>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => navigation.push('HP Page')}>
                        <Image style={styles.book} source={require('../images/Harry_Potter.jpg')}/>
                    </TouchableOpacity> 
                    <View style={{flexDirection:'column'}}>
                        <Text>Harry Potter and the Sorcerer's Stone</Text>
                        <Text>by J.K. Rowling</Text>
                        <Text>Description </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    book:{
        height:normalize(110),
        width:normalize(85),
        marginHorizontal:normalize(10),
        marginBottom:normalize(20),
    },
    bookContainer:{
        flexDirection:'column',
        width:'100%'
    },
    container:{
        flex:1,
        flexDirection:"column",
        backgroundColor:'#fff',
    },
    pickerRow:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:normalize(20),
    },
    searchBox: {
        flex: 6,
        borderColor: "#b8b8b8",
        backgroundColor: "#fff",
        color: "black",
        elevation:5,
        height:normalize(26),
        borderWidth: 1,
        borderRadius:normalize(8),
        fontSize: normalize(14),
        paddingHorizontal:normalize(12),
        marginLeft:normalize(6),
        marginRight:normalize(12),    
    },
    searchView: {
        backgroundColor:"#FFF",
        borderRadius:normalize(15),
        height:normalize(50),
        flexDirection:'row',
        paddingVertical:normalize(10),
        marginHorizontal:normalize(10),
        alignItems:'center'
    }, 
    textBar:{
        flexDirection:'row',
        paddingHorizontal:normalize(12),
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:normalize(12)
    }

});