import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Dimensions, Image, PixelRatio, SafeAreaView,StyleSheet, Text, View } from 'react-native';
import { Dirs, FileSystem } from 'react-native-file-access';
import './shim.js'

//importing page files
import {ProfilePage} from "./appPages/ProfilePage";
import {testPage} from "./appPages/TestPage";
import {Login} from "./appPages/Login";
import {SignUp} from "./appPages/SignUp";
import {WIP} from "./appPages/WIP"; //"Work In Progress" 
import {Dashboard} from "./appPages/Dashboard"; //Waiting for server
import {Collection} from "./appPages/Collection"
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//import {BookEpub} from './appPages/BookEpub';
import {Search} from './appPages/Search';
import {BookPage} from './appPages/BookPage';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

//Stack navigator for Login and SignUp screen starting with Login
const LogStack = createStackNavigator();
const LoginStackScreen = () => (
  <LogStack.Navigator screenOptions={{headerShown:false}}>
    <LogStack.Screen name="Login" component={Login} options={{title: "Login", headerTitleAlign:'center'}}/>
    <LogStack.Screen name="SignUp" component={SignUp} options={{title: "Sign Up", headerTitleAlign:'center'}}/>
  </LogStack.Navigator>
);

//Stack navigator for profile branching to other "profile pages"
const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle:{backgroundColor:'#FF968A'},
    }}
  >
    <ProfileStack.Screen name="profilePage" component={ProfilePage} options={{title:"Profile", headerTitleAlign:'center',headerLeft:null}}/>
    <ProfileStack.Screen name="testPage" component={testPage} options={{title:"Test", headerTitleAlign:'center'}}/>
  </ProfileStack.Navigator>
);

const DashStack = createStackNavigator();
const DashStackScreen = () => (
  <DashStack.Navigator
    screenOptions={{
      headerStyle:{backgroundColor:'#FF968A'},
    }}
  >
    <DashStack.Screen name="dashPage" component={Dashboard} options={{title:"Dashboard", headerTitleAlign:'center',animationEnabled:false,headerLeft:null,headerShown:false}}/>
    <DashStack.Screen name="collectionPage" component={Collection} options={{title:"Collection",headerTitleAlign:'center',animationEnabled:false,headerShown:false}}/>
  </DashStack.Navigator>
);

const SearchStack = createStackNavigator();
const SearchStackScreen = () => (
  <SearchStack.Navigator
    screenOptions={{
      headerStyle:{backgroundColor:'#FF968A'},
    }}
  >
    <SearchStack.Screen name="searchPage" component={Search} options={{title:"Search", headerTitleAlign:'center',animationEnabled:false,headerLeft:null}}/>
    <SearchStack.Screen name="HP Page" component={BookPage} options={{title:"Harry Potter", headerTitleAlign:'center',animationEnabled:false}}/>
  </SearchStack.Navigator>
);

//Navigation stack for the rest of the app other than Login/SignUp
const HomeStack = createBottomTabNavigator();
const HomeStackScreen = ({size=35}) => (
  <HomeStack.Navigator 
    tabBarOptions={{
      showLabel:false,
      keyboardHidesTabBar:true,
      activeBackgroundColor:"#ff8a7d",
      style:{
        position:'absolute',
        height:normalize(60),
        backgroundColor:"#FF968A",
        borderTopWidth:normalize(2),
      },
    }}
  >
    <HomeStack.Screen 
      name="Search" 
      component={SearchStackScreen}
      options={{tabBarIcon:({focused}) => (
        <Image source={require('./images/SearchIcon.png')} style={{width:size,height:size}}/>
      )
    }}
    />
    <HomeStack.Screen 
      name="Profile" 
      component={ProfileStackScreen}
      options={{tabBarIcon:({focused}) => (
          <Image source={require('./images/ProfileIcon.png')} style={{width:size,height:size}}/>
        )
      }}
    />
    <HomeStack.Screen 
      name="Dash" 
      component={DashStackScreen}
      options={{tabBarIcon:({focused}) => (
          <Image source={require('./images/HomeIcon.png')} style={{width:size,height:size}}/>
        )
      }}
    />
    <HomeStack.Screen 
      name="Calendar" 
      component={WIP}
      options={{tabBarIcon:({focused}) => (
        <Image source={require('./images/CalendarIcon.png')} style={{width:size,height:size}}/>
      )
    }}
    />
    <HomeStack.Screen 
      name="Inbox" 
      component={WIP}
      options={{tabBarIcon:({focused}) => (
        <Image source={require('./images/MailIcon.png')} style={{width:size,height:size}}/>
      )
    }}
    />
  </HomeStack.Navigator>
);

//Stack connecting Login/SignUp to the rest of the app
const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator>
    <RootStack.Screen name="Start" component={LoginStackScreen} options={{headerShown:false}}/>
    <RootStack.Screen name="App" component={HomeStackScreen} options={{headerShown:false}}/>
    {/*This line produces this warning "Warning: Cannot update a component from inside the function body of a different component."*/}
  </RootStack.Navigator>
);

export default () => (
    <NavigationContainer>
      <RootStackScreen/>
    </NavigationContainer>
);