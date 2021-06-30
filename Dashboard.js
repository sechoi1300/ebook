import React, { useState } from 'react';
import { render } from 'react-dom';
import { Dirs, FileSystem } from 'react-native-file-access';
import '../shim.js'
import {
    Button,
    Dimensions,
    Image,
    PixelRatio,
    Reach,
    SafeAreaView,
    ScrollView, 
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity} from 'react-native';

import {Picker} from '@react-native-community/picker'
import { SearchBar } from 'react-native-elements';

//Place Holder
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    const newSize = size * scale
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

const showBooks = (id) => {
    const path = require('path');
    var fs = require("fs");
    var userpath = path.resolve('../books/');

    console.log(userpath);
    let directory_name = userpath;
    
    // Function to get current filenames
    // in directory
    let filenames = fs.readdir(directory_name, (err) => {
        if(err) throw err;
    });

    //let filenames = fs.readdirSync(directory_name);
    
    console.log("\nFilenames in directory:");
    // //looping through imagese to check for image with same input id
    // filenames.forEach((file) => {
    //     console.log("File:", file);
    //     // if(file === id + ".jpg") {
    //     //     //convert image to base64 string
    //     //     img_base64 = base64_encode("./covers/" + file);
    //     // }
    // });

    //rethink; file systems might be different for android vs ios (instead of directory, have it be single json files)
    let src = '../books/' + id + '/cover.jpg';
    return <Image style={styles.book} source={require('../books/01121576/cover.jpg')}/>;
}

export const Dashboard = ({navigation}) => {
    const [selectedValue,setSelectedValue]=useState("author");

    return (
        <View style={styles.container}>
            <View style={styles.searchView}>
                <Image style={styles.profilePic} source={require('../images/default_pfp.jpg')}/>
                <TextInput 
                    placeholder="Search for books in my library..." 
                    underlineColorAndroid='transparent'
                    style = {styles.searchBox}
                    onChangeText={function () {
                    }}
                    />
            </View>
            <View style={styles.dashView}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.navButtons}
                    >
                        <Text style={styles.navTextSelected}>My Books</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{marginHorizontal:normalize(20)}}
                        onPress={() => navigation.push('collectionPage')}
                    >
                        <Text style={styles.navTextUnselected}>Collections</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.pickerRow}>
                    <Text style={{fontWeight:'bold',fontSize:normalize(14)}}>Sort by:</Text>
                    <Picker
                        selectedValue={selectedValue}
                        style={{height:normalize(50),width:normalize(100)}}
                        onValueChange={(itemValue,itemIndex)=>setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Author" value="author"/>
                        <Picker.Item label="Genre" value="genre"/>
                        <Picker.Item label="Series" value="series"/>
                        <Picker.Item label="Title" value="title"/>
                    </Picker>
                </View>
                <ScrollView>
                    <View style={styles.bookContainer}>
                        {showBooks()}
                        {/* <TouchableOpacity>
                            {showBooks("01121576")}
                        </TouchableOpacity> */}
                        
                        {/* <TouchableOpacity>
                            <Image style={styles.book} source={require('../books/01121576/cover.jpg')}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.book} source={require('../books/01121571/cover.jpg')}/>
                        </TouchableOpacity> 
                        <TouchableOpacaity>
                            <Image style={styles.book} source={require('../books/01122217/cover.jpg')}/>
                        </TouchableOpacity> */}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonRow:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-start'
    },
    book:{
        height:normalize(110),
        width:normalize(85),
        marginHorizontal:normalize(10),
        marginBottom:normalize(20),
    },
    bookContainer:{
        flexDirection:'row',
    },
    container:{
        flex:1,
        flexDirection:"column",
        backgroundColor:'#fff',
    },
    dashView: {
        flex:7.5,
        flexDirection:'column',
        width:'100%',
    },
    navButtons:{
        borderBottomWidth:2,
        borderBottomColor:'#000000',
        marginHorizontal:normalize(20),
    },
    navTextSelected:{
        fontSize:normalize(14),
        fontWeight:'900',
        marginVertical:normalize(10),
    },
    navTextUnselected:{
        fontSize:normalize(14),
        fontWeight:'900',
        marginVertical:normalize(10),
        color:'grey'
    },
    pickerRow:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:normalize(20),
    },
    profilePic: {
        height:normalize(40),
        width: normalize(40),
        borderRadius:normalize(20),
        marginLeft:normalize(12),
        marginRight:normalize(5),
    },
    searchView: {
        backgroundColor:"#FFC8A2",
        borderRadius:normalize(15),
        height:normalize(50),
        flexDirection:'row',
        paddingVertical:normalize(10),
        marginHorizontal:normalize(10),
        marginTop:normalize(30),
        alignItems:'center',
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
});