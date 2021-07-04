/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import {getMovies} from './api';
import {API_KEY} from './config';
import Rating from './components/Rating';
import Genres from './components/Genres';
import {useRef} from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import Svg, {Rect} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {Backdrop} from './components/Backdrop';

const {width, height} = Dimensions.get('window');

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.paragraph}>Loading...</Text>
    </View>
  );
};

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const scrollX = useRef(new Animated.Value(0)).current;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      setMovies([{key: 'left-spacer'}, ...movies, {key: 'right-spacer'}]);
    };

    if (movies.length === 0) {
      fetchData();
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  const renderItem = ({item, index}) => {
    if (!item.poster) {
      return <View style={{width: EMPTY_ITEM_SIZE}} />;
    }

    // Index changed because of the dummies empty size
    const inputRange = [
      (index - 2) * ITEM_SIZE, // previous
      (index - 1) * ITEM_SIZE, // current
      index * ITEM_SIZE, // next
    ];

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [0, -50, 0],
    });

    const rotateY = scrollX.interpolate({
      inputRange,
      outputRange: ['-180deg', '0deg', '180deg'],
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
    });

    return (
      <View style={{width: ITEM_SIZE}}>
        <Animated.View
          style={{
            marginHorizontal: SPACING,
            padding: SPACING * 2,
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 20,
            transform: [{translateY} /* , {rotateY} */],
            opacity,
            elevation: 2,
          }}>
          <Image source={{uri: item.poster}} style={styles.posterImage} />
          <Text style={{fontSize: 24}} numberOfLines={1}>
            {item.title}
          </Text>
          <Rating rating={item.rating} />
          <Genres genres={item.genres} />
          <Text style={{fontSize: 12}} numberOfLines={3}>
            {item.description}
          </Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        // barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Backdrop movies={movies} scrollX={scrollX} />

      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={item => item.key}
        horizontal
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{alignItems: 'center'}}
        renderItem={renderItem}
      />
    </View>
  );
  /* return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </SafeAreaView>
  ); */
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});

export default App;
