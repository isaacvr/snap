import React, { useState } from 'react';
import { 
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Svg, { Path } from 'react-native-svg';

// import Logo from '../assets/icon.svg';

const DEVICE_HEIGHT = Dimensions.get('screen').height;
const STATUS_BAR = StatusBar.currentHeight || 24;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const NAVIGATION_HEIGHT = DEVICE_HEIGHT - WINDOW_HEIGHT;

function Drawer() {
  const MenuOptions = [
    { text: 'Chats', active: useState(true), source: require('../assets/Chat.png') },
    { text: 'Ventas', active: useState(false), source: require('../assets/Wallet.png') },
    { text: 'Archivos', active: useState(false), source: require('../assets/Folder.png') },
    { text: 'Popular', active: useState(false), source: require('../assets/Activity.png') },
    { text: 'Ajustes', active: useState(false), source: require('../assets/Setting.png') },
    { text: 'Información', active: useState(false), source: require('../assets/Info.png') },
  ];

  return (
    <SafeAreaView style={[
      styles.container,
      { height: DEVICE_HEIGHT - NAVIGATION_HEIGHT }
    ]}>
      {/* <Image style={ styles.profileMask } source={ require('../assets/profile-mask.png') }/> */}
      <View style={ styles.profileMask }>
        <Svg viewBox="0 0 24 10" width="100%" height="100%">
          <Path
            d="M 0 0 L 24 0 L 24 8 C 12 6 8 12 0 8 Z"
            fill="white" fillOpacity={0.2}
          />
        </Svg>
      </View>
      <View style={styles.profile}>
        <Image resizeMode="cover" style={styles.avatar} source={ require('../assets/chems.jpg') }/>
        <View style={{ flex: 3 }}>
          <Text style={[cStyle.text, styles.profileName]}>Zara Brown</Text>
          <Text style={[cStyle.text, styles.profileDescription]}>Model</Text>
        </View>
      </View>
      <View style={styles.menu}>
        <View style={{ justifyContent: "center" }}>
          <TextInput
            placeholder="Buscar mensaje..."
            placeholderTextColor="#ffffff77"
            style={styles.search}>
            </TextInput>
          <Image
            style={ [styles.menuIcon, {
              position: "absolute",
              left: "66%",
              marginLeft: -35,
              transform: [
                { scale: .8 }
              ]
            }] }
            source={ require('../assets/Search.png') } />
        </View>
        {
          MenuOptions.map(mop =>
          <TouchableOpacity key={mop.text} onPress={() => {
            MenuOptions.forEach(m => m.active[1](false));
            mop.active[1](true);
          }}>
            <View style={{
              flexDirection: "row",
              backgroundColor: mop.active[0] ? "#00000033" : "transparent",
              alignSelf: "flex-start",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 100
            }}>
              <Image style={ styles.menuIcon } source={mop.source} />
              <Text style={[cStyle.text]}>{mop.text}</Text>
            </View>
          </TouchableOpacity>)
        }
      </View>
      <View style={styles.bottom}>
        <Text style={ cStyle.text }>Versión 5.0.1</Text>
      </View>
    </SafeAreaView>
  );
}

const cStyle = StyleSheet.create({
  text: {
    color: "#ffffffdd",
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: "#8500b6",
    paddingHorizontal: 40,
    paddingTop: Platform.OS == 'android' ? STATUS_BAR : 0
  },
  profile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20
  },
  profileMask: {
    position: "absolute",
    top: -NAVIGATION_HEIGHT - STATUS_BAR,
    left: 0,
    height: 300,
    right: 0,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginRight: 30
  },
  profileName: {
    color: "#ffffffdd",
    fontSize: 16
  },
  profileDescription: {
    color: "#ffffffaa",
    fontSize: 12
  },
  menu: {
    flex: 4,
    justifyContent: "space-around"
  },
  search: {
    backgroundColor: "#ffffff33",
    width: "66%",
    height: 40,
    color: "white",
    paddingHorizontal: 20,
    borderRadius: 30
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 20
  },
  bottom: {
    flex: 2,
    justifyContent: "flex-end",
    paddingBottom: 10,
    alignItems: "center"
  }
});

export default Drawer;