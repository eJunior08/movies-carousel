import React from 'react';

import {Animated, Dimensions, Platform, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const BACKDROP_HEIGHT = height * 0.65;

import {styles} from './styles';

export const Backdrop = ({movies = [], scrollX}) => {
  const renderItem = ({item, index}) => {
    if (!item.backdrop) {
      return null;
    }

    const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [width, 0],
    });

    // console.log('opacity', opacity);

    return (
      <View
        style={{
          backgroundColor: 'yellow',
          // position: 'absolute',
          // width,
          // height: BACKDROP_HEIGHT,
        }}>
        <Animated.Image
          source={{uri: item.backdrop}}
          style={{
            width,
            height: BACKDROP_HEIGHT,
            resizeMode: 'cover',
            transform: [{translateX}],
          }}
        />
      </View>
    );

    /* const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-width, 0],
    }); */

    // return (
    //   <MaskedView
    //     style={{
    //       position: 'absolute',
    //       // top: 0,
    //       // backgroundColor: 'yellow',
    //     }}
    //     maskElement={
    //       <AnimatedSvg
    //         width={width}
    //         height={height}
    //         viewBox={`0 0 ${width} ${height}`}
    //         style={{transform: [{translateX}]}}>
    //         <Rect x="0" y="0" width={width} height={height} fill="red" />
    //       </AnimatedSvg>
    //     }>
    //     {/* Shows behind the mask, you can put anything here, such as an image */}
    //     <Image
    //       source={{uri: item.backdrop}}
    //       style={{
    //         width,
    //         height: BACKDROP_HEIGHT,
    //         resizeMode: 'cover',
    //       }}
    //     />
    //   </MaskedView>
    // );
  };

  return (
    <View style={styles.container}>
      {movies.map((m, index) => {
        if (!m.backdrop) {
          return null;
        }

        const inputRange = [
          (index - 2) * ITEM_SIZE,
          (index - 1) * ITEM_SIZE,
          index * ITEM_SIZE,
        ];
        const translateX = scrollX.interpolate({
          inputRange,
          outputRange: [-width, 0, width],
        });

        return (
          <View key={m.key} style={[styles.contentContainer]}>
            <Animated.Image
              source={{uri: movies[index].backdrop}}
              style={[styles.image, {transform: [{translateX}]}]}
            />
          </View>
        );
      })}
      {/*  <FlatList
        data={movies}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        contentContainerStyle={{position: 'absolute'}}
      /> */}

      <LinearGradient
        colors={['transparent', 'white']}
        style={styles.gradient}
      />
    </View>
  );
};
