import React, { useRef } from 'react';
import { 
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Text,
  Animated,
  Easing,
} from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures';
import Drawer from './Drawer';

const DEVICE_HEIGHT = Dimensions.get('screen').height;
const STATUS_BAR = StatusBar.currentHeight || 24;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const NAVIGATION_HEIGHT = DEVICE_HEIGHT - WINDOW_HEIGHT;

function Chat() {
  const chatList = [
    {
      id: Math.random().toString(),
      name: "Julia Zenoval", time: "hace 3min", message: 'jajaja',
      status: 'green', avatar: "https://i.pravatar.cc/100?u=JuliaZenoval"
    },
    {
      id: Math.random().toString(),
      name: "Mary Felicia", time: "hace 20min", message: 'Hola!',
      status: 'gray', avatar: "https://i.pravatar.cc/100?u=MaryFelicia"
    },
    {
      id: Math.random().toString(),
      name: "Robert Oslo", time: "hace 30min", message: 'Este domingo a las 3pm',
      status: 'green', avatar: "https://i.pravatar.cc/100?u=RobertOslo"
    },
    {
      id: Math.random().toString(),
      name: "Arca Studio", time: "hace 2h", message: 'Encantados',
      status: 'red', avatar: "https://i.pravatar.cc/100?u=ArcaStudio",
      verified: true
    },
  ];

  const animDuration = 200;
  const useNativeDriver = true;
  let menu = false;
  let cwLeft = new Animated.Value(0);
  let cwScale = new Animated.Value(1);
  let cwBorderRadius = new Animated.Value(0);
  let topBarTY = new Animated.Value(0);
  let bbScale = new Animated.Value(1);
  let bbTY = new Animated.Value(0);

  let anims = [
    cwLeft, cwScale, cwBorderRadius, topBarTY, bbScale, bbTY
  ];
  let fwd = [ WINDOW_WIDTH * .7, 0.8, 60, -100, 0.5, 200 ];
  let bwd = [ 0, 1, 0, 0, 1, 0 ];

  let handleSwipeRight = () => {
    if ( !menu ) {
      Animated.parallel(
        anims.map((v, i) => Animated.timing(v, {
          toValue: fwd[i],
          easing: Easing.ease,
          duration: animDuration,
          useNativeDriver
        }))        
      ).start(() => menu = true);
    }
  };

  let handleSwipeLeft = () => {
    if ( menu ) {
      Animated.parallel(
        anims.map((v, i) => Animated.timing(v, {
          toValue: bwd[i],
          easing: Easing.ease,
          duration: animDuration,
          useNativeDriver
        }))        
      ).start(() => menu = false);
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  return (
    <SafeAreaView style={[
      styles.container,
      { height: DEVICE_HEIGHT - NAVIGATION_HEIGHT }
    ]}>
      <Drawer />
      <GestureRecognizer
        onSwipeRight={ handleSwipeRight }
        onSwipeLeft={ handleSwipeLeft }
        config={ config }
      >
        <Animated.View style={
          [ styles.chatWrapper, {
            transform: [
              { scale: cwScale },
              { translateX: cwLeft }
            ],
            borderRadius: cwBorderRadius,
          } ] }>
          <Animated.View style={ [ styles.topBar, {
            transform: [
              { translateY: topBarTY }
            ]
          } ] }>
            <TouchableOpacity style={ styles.icon }>
              <Image source={ require('../assets/Category.png') } style={ styles.icon }/>
            </TouchableOpacity>

            <TouchableOpacity style={ styles.icon }>
              <Image source={ require('../assets/Buy.png') } style={ styles.icon }/>
            </TouchableOpacity>
          </Animated.View>
          <Animated.FlatList
            style={{
              transform: [
                { translateY: topBarTY }
              ]
            }}
            data={ chatList }
            renderItem={({ item }) => (
              <TouchableHighlight
                key={item.id}
                >
                <View style={ styles.chatContainer }>
                  <View style={{ flex: 1 }}>
                    <Image source={{
                      uri: item.avatar
                    }} style={ styles.avatar }>
                    </Image>
                    <View style={[ styles.status, {
                      backgroundColor: item.status
                    } ]}></View>
                  </View>
                  <View style={{ flex: 3 }}>
                    <Text>
                      {item.name + " "}
                      {
                        item.verified && <Image style={ styles.verified } source={ require('../assets/Verified.png') } />
                      }
                    </Text>
                    <Text style={ styles.time }>{item.message}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={ styles.time }>{item.time}</Text>
                  </View>            
                </View>
              </TouchableHighlight>
            )}
          />
          <Animated.View style={ [ styles.footer, {
            transform: [
              { scale: bbScale },
              { translateY: bbTY }
            ]    
          }] }>
            <View style={ styles.footerItem }>
              <Image source={ require('../assets/Discovery.png') } style={ styles.icon }/>
              <Text style={ styles.footerText }>Explorar</Text>
            </View>
            <View style={ styles.footerItem }>
              <Image source={ require('../assets/Image.png') } style={ styles.icon }/>
              <Text style={ styles.footerText }>Now</Text>
            </View>
            <View style={ [styles.footerItem, styles.footerCamera] }>
              <Image source={ require('../assets/Camera.png') } style={{
                width: 40,
                height: 40
              }}/>
            </View>
            <View style={ styles.footerItem }>
              <Image source={ require('../assets/Notification.png') } style={ styles.icon }/>
              <Text style={ styles.footerText }>Noticias</Text>
            </View>
            <View style={ styles.footerItem }>
              <Image source={ require('../assets/User.png') } style={ styles.icon }/>
              <Text style={ styles.footerText }>Amigos</Text>
            </View>
          </Animated.View>
        </Animated.View>
      </GestureRecognizer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: "#fff"
  },
  chatWrapper: {
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingTop: Platform.OS == 'android' ? STATUS_BAR : 0,
    overflow: "hidden"
  },
  topBar: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 30,
    overflow: "hidden"
  },
  icon: {
    width: 24,
    height: 24,
  },
  chatContainer: {
    flexDirection: "row",
    marginVertical: 20
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  status: {
    position: "absolute",
    top: 0,
    right: 20,
    width: 7,
    height: 7,
    borderRadius: 5
  },
  time: {
    fontSize: 10
  },
  verified: {
    width: 20,
    height: 20
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: "#ad00cd33"
  },
  footerItem: {
    alignItems: "center"
  },
  footerText: {
    fontSize: 12
  },
  footerCamera: {
    width: 80,
    height: 80,
    backgroundColor: '#ad00cd',
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    bottom: 15
  },
});

export default Chat;