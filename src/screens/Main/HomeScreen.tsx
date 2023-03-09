import {useEffect, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import {Appbar, IconButton, Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import http from '../../utils/http';
import React from 'react';

const style = StyleSheet.create({
  swiper: {height: 160},
  banner: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  dot: {
    backgroundColor: '#ffffff',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  activeDot: {
    backgroundColor: '#ffffff',
    width: 12,
    height: 12,
    borderRadius: 12,
    margin: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  logo: {
    width: 35,
    height: 27,
  },
  appbar: {
    flexDirection: 'row',
    width: '90%',
    height: 56,
    alignItems: 'center',
    gap: 18,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 36,
    paddingHorizontal: 12,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    gap: 10,
  },
  searchIcon: {width: 18, height: 18},
  searchInput: {
    // color: '#666666',
    flex: 1,
  },
});
type Banner = {
  andaInfoName: string;
  andaInfoThumbnailPicture: string;
  andaInfoContentPicture: string;
  andaInfoText: string;
};

function HomeScreen(): JSX.Element {
  const insets = useSafeAreaInsets();
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const getBanners = async () => {
      try {
        const {data} = await http.get('/banners');
        if (data.result) {
          setBanners(data.result.banners);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getBanners();
  }, []);
  return (
    <View style={{paddingTop: insets.top}}>
      <View style={{alignItems: 'center'}}>
        <View style={style.appbar}>
          <Image
            style={style.logo}
            source={require('ANDA/assets/images/logo.png')}
          />
          <View style={style.searchBox}>
            <Image
              source={require('ANDA/assets/icons/search.png')}
              style={style.searchIcon}
            />
            <TextInput
              // onFocus={()=>{}}
              selectionColor={'#666666'}
              style={style.searchInput}
              placeholderTextColor={'#666666'}
              placeholder="검색어를 입력하세요."
            />
          </View>
        </View>
      </View>
      <ScrollView>
        {banners && (
          <Swiper
            style={style.swiper}
            paginationStyle={{bottom: 4}}
            dot={<View style={style.dot} />}
            activeDot={<View style={style.activeDot} />}>
            {banners.map((value, index) => {
              return (
                <Image
                  style={style.banner}
                  source={{uri: value.andaInfoContentPicture}}
                  key={index}
                  alt=""
                />
              );
            })}
          </Swiper>
        )}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
