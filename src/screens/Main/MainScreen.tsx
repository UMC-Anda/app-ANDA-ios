import {useState} from 'react';
import {Text, View} from 'react-native';
import {BottomNavigation} from 'react-native-paper';

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

function MainScreen(): JSX.Element {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'music', title: 'Music', icon: require('')},
    {key: 'albums', title: 'Albums', icon: 'album'},
    {key: 'recents', title: 'Recents', icon: 'history'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });
  return (
    <View>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </View>
  );
}

export default MainScreen;
