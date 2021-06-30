import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Image, SafeAreaView,StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const ProfilePage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:'row',width:'100%',justifyContent:'flex-end',alignItems:'flex-end'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Start',{screen:'Login'})}>
          <View style={styles.editView}>
            <Text style={styles.editText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image style={styles.profilePicture} source={require('../images/default_pfp.jpg')}/>
      <Text style={styles.name}> FirstName LastName</Text>
      <Text style={styles.username}>@username</Text>
      
      {/*Edit Profile Button */}
      <TouchableOpacity>
        <View style={styles.editView}>
          <Text style={styles.editText}>Edit Profile</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.recentlyRead}>Recently Read</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  editView: {
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical:8,
    paddingHorizontal:20,
    backgroundColor: 'white',
    margin: 10,
  },
  editText: {
    color: '#000000',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 12,
    textAlign: 'center'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profilePicture:{
    //need height and width to be auto scaling
    height:150,
    width:150,
    resizeMode: 'contain',
    //need borderRadius to be able to retrieve sizes automatically
    borderRadius:75
  },
  recentlyRead: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    paddingHorizontal:100,
    borderBottomColor:'black',
    borderBottomWidth:1,
  },
  username: {
    fontSize: 15,
    color: 'grey'
  },

});
