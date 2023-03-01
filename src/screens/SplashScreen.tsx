import * as BootSplash from 'react-native-bootsplash';
import {View} from 'react-native';
import {Animated, Dimensions, StyleSheet} from 'react-native';
import * as React from 'react';
import {useRecoilValue} from 'recoil';
import {accessTokenState} from '../state/jwt';

const bootSplashLogo = require('../../assets/images/logo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    margin: 20,
    lineHeight: 30,
    color: '#333',
    textAlign: 'center',
  },
  bootsplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    height: 89,
    width: 100,
  },
});
function SplashScreen({navigation}: any): JSX.Element {
  const [bootSplashIsVisible, setBootSplashIsVisible] = React.useState(true);
  const [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] =
    React.useState(false);
  const opacity = React.useRef(new Animated.Value(1));
  const translateY = React.useRef(new Animated.Value(0));
  const accessToken = useRecoilValue(accessTokenState);

  const init = React.useCallback(async () => {
    try {
      const token = accessToken;
      await BootSplash.hide();
      Animated.stagger(350, [
        Animated.spring(translateY.current, {
          useNativeDriver: true,
          toValue: -50,
        }),
        Animated.spring(translateY.current, {
          useNativeDriver: true,
          toValue: Dimensions.get('window').height,
        }),
      ]).start();
      Animated.timing(opacity.current, {
        useNativeDriver: true,
        toValue: 0,
        duration: 100,
        delay: 350,
      }).start(() => {
        setBootSplashIsVisible(false);
        if (token) {
          // navigation.replace('main');
        } else {
          navigation.replace('Login');
        }
        //     AsyncStorage.getItem('user_id').then((value) =>
        //     navigation.replace(value === null ? 'Auth' : 'DrawerNavigationRoutes'),
        //   );
      });
    } catch (error) {
      setBootSplashIsVisible(false);
      navigation.replace('Login');
    }
  }, [accessToken, navigation]);

  React.useEffect(() => {
    bootSplashLogoIsLoaded && init();
  }, [bootSplashLogoIsLoaded, init]);

  return (
    <View style={styles.container}>
      {bootSplashIsVisible && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.bootsplash,
            {opacity: opacity.current},
          ]}>
          <Animated.Image
            source={bootSplashLogo}
            fadeDuration={0}
            resizeMode="contain"
            onLoadEnd={() => setBootSplashLogoIsLoaded(true)}
            style={[
              styles.logo,
              {transform: [{translateY: translateY.current}]},
            ]}
          />
        </Animated.View>
      )}
    </View>
  );
}

export default SplashScreen;
