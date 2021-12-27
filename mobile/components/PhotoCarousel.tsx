import { View } from "../components/Themed";

import { StyleSheet, Dimensions, Platform } from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";

const { width: screenWidth } = Dimensions.get("window");

interface Photo {
  id: number;
  url: string;
}

interface Props {
  photos: Photo[];
}

const PhotoCarousel = ({ photos }: Props) => {
  return (
    <Carousel
      sliderWidth={screenWidth}
      sliderHeight={screenWidth}
      itemWidth={screenWidth - 60}
      data={photos}
      renderItem={({ item }, parallaxProps = {}) => {
        const { id, url } = item;

        return (
          <View key={id} style={styles.item}>
            <ParallaxImage
              source={{ uri: url }}
              containerStyle={styles.imageContainer}
              style={styles.image}
              parallaxFactor={0.1}
              {...parallaxProps}
            />
          </View>
        );
      }}
      hasParallaxImages={true}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});

export default PhotoCarousel;
