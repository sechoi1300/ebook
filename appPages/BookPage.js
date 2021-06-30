import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Image, SafeAreaView,StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';

export const BookPage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <Text style={styles.spacer}></Text>
        <Image style={styles.bookCover} source={require('../images/Harry_Potter.jpg')}/>

        <Text style={styles.title}> Harry Potter and the Sorcerer's Stone</Text>
        <Text style={styles.author}>by J.K. Rowling</Text>
        
        {/*Download Button */}
        <TouchableOpacity>
          <View style={styles.editView}>
            <Text style={styles.editText}>Download</Text>
          </View>
        </TouchableOpacity>
        
        <Text style={styles.summary}>Summary</Text>
        <Text style={styles.discription}>         Harry Potter's life is miserable. His parents are dead and he's stuck with his heartless relatives, who force him to live in a tiny closet under the stairs. But his fortune changes when he receives a letter that tells him the truth about himself: he's a wizard. A mysterious visitor rescues him from his relatives and takes him to his new home, Hogwarts School of Witchcraft and Wizardry.

  After a lifetime of bottling up his magical powers, Harry finally feels like a normal kid. But even within the Wizarding community, he is special. He is the boy who lived: the only person to have ever survived a killing curse inflicted by the evil Lord Voldemort, who launched a brutal takeover of the Wizarding world, only to vanish after failing to kill Harry.

  Though Harry's first year at Hogwarts is the best of his life, not everything is perfect. There is a dangerous secret object hidden within the castle walls, and Harry believes it's his responsibility to prevent it from falling into evil hands. But doing so will bring him into contact with forces more terrifying than he ever could have imagined.

  Full of sympathetic characters, wildly imaginative situations, and countless exciting details, the first installment in the series assembles an unforgettable magical world and sets the stage for many high-stakes adventures to come.</Text>
         <Text style={styles.tags}>Tags: Fantasy, Fiction, Young Adult, Childrens, more...</Text>
         <Text style={styles.spacer}></Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  editView: {
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical:8,
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
  title: {
    textAlign: 'center', 
    color: 'black',
    fontWeight: 'bold',
    paddingTop:20,
    fontSize: 20,
  },
  bookCover:{
    left:100,
    height:300,
    width:200,
    resizeMode: 'contain',
    borderRadius:10
  },
  author: {
    textAlign: 'left', 
    paddingLeft: 35,
    fontSize: 15,
    color: 'black',
  },
  summary: {
    paddingTop:20,
    fontSize: 16,
    textAlign: 'center', 
    color: '#444444',
    fontWeight: 'bold',
    borderBottomColor:'gray',
    left: 35,
    width: 320,
    borderBottomWidth:1,
    borderBottomEndRadius:300,
  },
  discription: {
    paddingTop:10,
    fontSize: 15,
    color: '#444444',
    left: 5,
    paddingHorizontal:25,
  },
  tags: {
    paddingTop:10,
    paddingBottom:100,
    fontSize: 12,
    color: '#444444',
    paddingHorizontal:40,
  }
});
