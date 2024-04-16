import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { FONTSIZE } from '../../Theme/FontSize';
import { FONTFAMILY } from '../../Theme/FontFamily';
import Header from '../DetailsHeader/Header';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ThemeContext } from '../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../Theme/Color';

const Details = ({ data }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const themeContext = useContext(ThemeContext);

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const renderPagination = () => (
    <Pagination
      dotsLength={data?.image.length}
      activeDotIndex={activeIndex}
      containerStyle={styles.paginationContainer}
      dotStyle={styles.paginationDot}
      inactiveDotStyle={styles.paginationInactiveDot}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );

  return (
    <View>
      <Header />
      <Carousel
        data={data?.image}
        renderItem={({ item }) => (
          <Animated.Image
            source={item}
            style={styles.image}
            sharedTransitionTag={data?.name}
          />
        )}
        sliderWidth={500}
        itemWidth={500}
       
        layout={'default'}
        onSnapToItem={(index) => setActiveIndex(index)}
        
      />
      {renderPagination()}

      <View style={{paddingHorizontal:20}}>  
      <Animated.View entering={FadeIn.delay(600)} style={{marginTop:80,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
      <Text style={[styles.carName,{color:theme.primaryText}]}>{data.name}</Text>
        <Text style={[styles.rating,{color:theme.PrimarylightText}]}>{data.rating}</Text>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(800)}>
      <Text style={[styles.price,{color:theme.PrimarylightText}]}>{data.price}</Text>
          <Text style={[styles.carType,{color:theme.PrimarylightText}]}>{data.type}</Text>
      </Animated.View>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,

    backgroundColor: 'transparent',
  },
  carName: {
    fontSize:FONTSIZE.size_18,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
    marginBottom: 5,
  },
  rating: {
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
    marginBottom: 5,
  },
  price: {
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
    marginRight: 5,
  },
  carType: {
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 30,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#21408E',
  },
  paginationInactiveDot: {
    width: 15,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: '#cccccc',
  },
});
