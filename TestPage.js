import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Image, SafeAreaView,StyleSheet, Text, View } from 'react-native';

export const testPage = ({navigation}) => {
    return (
        <SafeAreaView style = {styles.container}>
            <Button title="Go to profile page" onPress={()=> navigation.push('profilePage')}/>
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
    }
});