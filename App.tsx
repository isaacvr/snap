import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  View
} from 'react-native';

import Chat from './components/Chat';
// import Drawer from './components/Drawer';

export default function App() {
  let [ loading, setLoading ] = useState(true);

  setTimeout(() => setLoading(false), 5000);

  return (
    <SafeAreaView style={styles.base}>
    {
      loading ? 
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image source={require('./assets/icon.png')} width={150} height={150}/>
            <Text style={styles.title}>Snap</Text>
          </View>
          <View style={styles.promo}>
            <Text style={styles.promoText}>Conecta con tus clientes</Text>
            <Text style={styles.promoText}>Conecta más cerca con ellos</Text>
            <Text style={styles.promoText}>Mantén tu negocio activo</Text>
          </View>
          <View style={styles.media}>
            <Image style={styles.mediaImg} source={ require('./assets/facebook.png') } />
            <Image style={styles.mediaImg} source={ require('./assets/flickr.png') } />
            <Image style={styles.mediaImg} source={ require('./assets/dribbble.png') } />
          </View>
        </View>
        : <Chat />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  container: {
    flex: 1,
    backgroundColor: '#ad00cd',
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: 'white',
    fontSize: 36
  },
  promo: {
    flex: 2,
    justifyContent: "space-around"
  },
  promoText: {
    color: 'white',
    fontSize: 16
  },
  media: {
    flex: 2,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  mediaImg: {
    width: 40,
    height: 40
  }
});
