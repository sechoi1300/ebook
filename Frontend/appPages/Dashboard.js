import React, { useState } from 'react';
import { render } from 'react-dom';
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
    const bookdata = require('../bookdata.json');
    //console.log(bookdata);
    //console.log(typeof bookdata);
    // for (let bookdata of this.state.users) {
    //     console.log(bookdata.title);
    // }

    var titles = [];
    var authors = [];
    bookdata.forEach(
        function(d) {
            titles.push(d.title);
            authors.push(d.author);
        }
    )
    //console.log(titles);
    var htmlreturns = [];
    var colors = ["#666A86", "#788AA3", "#92B6B1", "#B2C9AB", "#E8DDB5"];
    for(var i = 0; i < titles.length; i++) {
        var randColor = colors[Math.floor(Math.random() * colors.length)];
        htmlreturns.push(
            <TouchableOpacity
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    //alignItems: 'center',
                    //justifyContent: 'center',
                    textAlign: 'center',
                    backgroundColor: "#DDDDDD",
                    padding: normalize(5),
                    margin: normalize(5),
                    height: normalize(50),
                    width: normalize(300),
                    justifyContent: 'space-evenly',
                    backgroundColor: randColor + "",
                }}
            >
                <Text>{titles[i]}</Text>
                <Text>{authors[i]}</Text>
            </TouchableOpacity>
        );
    }
    return htmlreturns;
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
    button: {
        flex: 1,
        flexDirection: 'column',
        //alignItems: 'center',
        //justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: "#DDDDDD",
        padding: normalize(5),
        margin: normalize(5),
        height: normalize(50),
        width: normalize(300),
        justifyContent: 'space-evenly',
    },
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
        flexDirection:'column',
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
