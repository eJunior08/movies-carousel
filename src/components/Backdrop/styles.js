import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
const BACKDROP_HEIGHT = height * 0.65;

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height: BACKDROP_HEIGHT,
    backgroundColor: '#1a1a1a',
    top: 0,
    left: 0,
  },

  contentContainer: {
    // backgroundColor: 'yellow',
    position: 'absolute',
    // width,
    // height: BACKDROP_HEIGHT,
  },

  image: {
    width,
    height: BACKDROP_HEIGHT,
    resizeMode: 'cover',
  },

  gradient: {
    width,
    height: BACKDROP_HEIGHT,
    position: 'absolute',
    bottom: 0,
  },
});
