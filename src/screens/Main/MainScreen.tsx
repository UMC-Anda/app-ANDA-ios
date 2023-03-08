import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ComparisonScreen from './ComparisonScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MapScreen from './MapScreen';
import CommunityScreen from './CommunityScreen';
import MyPageScreen from './MyPageScreen';
import HomeIcon from '../../../assets/icons/home.svg';
import ComparisonIcon from '../../../assets/icons/eye.svg';
import MapIcon from '../../../assets/icons/map.svg';
import CommunityIcon from '../../../assets/icons/comment.svg';
import MyPageIcon from '../../../assets/icons/user.svg';

const style = StyleSheet.create({
  AppBar: {
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.06,
    // zIndex: 999,
    backgroundColor: '#fff',
    elevation: 2,
  },
  AppBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 9,
  },
  AppBarItemTitle: {
    marginTop: 4,
    fontSize: 12,
  },
});
function BottomBar({state, descriptors, navigation}: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[style.AppBar, {paddingBottom: insets.bottom}]}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label = options.title;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={style.AppBarItem}>
            {index === 0 && (
              <HomeIcon fill={isFocused ? '#1CB9D9' : '#CCCCCC'} />
            )}
            {index === 1 && (
              <ComparisonIcon fill={isFocused ? '#1CB9D9' : '#CCCCCC'} />
            )}
            {index === 2 && (
              <MapIcon fill={isFocused ? '#1CB9D9' : '#CCCCCC'} />
            )}
            {index === 3 && (
              <CommunityIcon fill={isFocused ? '#1CB9D9' : '#CCCCCC'} />
            )}
            {index === 4 && (
              <MyPageIcon fill={isFocused ? '#1CB9D9' : '#CCCCCC'} />
            )}
            <Text
              style={[
                style.AppBarItemTitle,
                {color: isFocused ? '#1CB9D9' : '#CCCCCC'},
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();
function MainScreen(): JSX.Element {
  return (
    <View style={{height: '100%'}}>
      <Tab.Navigator
        tabBar={props => <BottomBar {...props} />}
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{title: '홈'}}
        />
        <Tab.Screen
          name="ComparisonScreen"
          component={ComparisonScreen}
          options={{title: '안과비교'}}
        />
        <Tab.Screen
          name="MapScreen"
          component={MapScreen}
          options={{title: '지도'}}
        />
        <Tab.Screen
          name="CommunityScreen"
          component={CommunityScreen}
          options={{title: '커뮤니티'}}
        />
        <Tab.Screen
          name="MyPageScreen"
          component={MyPageScreen}
          options={{title: '마이페이지'}}
        />
      </Tab.Navigator>
    </View>
  );
}

export default MainScreen;
