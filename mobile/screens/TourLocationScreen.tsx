import { Text, View } from "../components/Themed";
import { useQuery } from "react-query";
import { gql } from "graphql-request";
import { TourScreenProps } from "../types";
import client from "../api/client";
import {
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";

const query = gql`
  query TourLocation($id: ID!) {
    tourLocation(id: $id) {
      id
      photos {
        id
        url
      }
    }
  }
`;
const { width: screenWidth } = Dimensions.get("window");

const TourLocationScreen = ({
  navigation: _navigation,
  route,
}: TourScreenProps<"TourLocation">) => {
  const {
    params: { tourLocationId },
  } = route;

  const variables = {
    id: tourLocationId,
  };

  const { data, isLoading } = useQuery(
    ["TourLocation", JSON.stringify(variables)],
    async () => client.request(query, variables)
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <Carousel
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 60}
            data={data.tourLocation.photos.map((photo) => {
              return {
                thumbnail: photo.url,
              };
            })}
            renderItem={({ item }, parallaxProps) => {
              return (
                <View style={styles.item}>
                  <ParallaxImage
                    source={{ uri: item.thumbnail }}
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
          <Card containerStyle={{ borderRadius: 10 }}>
            <Card.Title>Overall Rating</Card.Title>
            <View style={{ alignItems: "center", marginBottom: 10 }}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>8.1</Text>
            </View>
            <Button title="Add Rating" />
          </Card>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
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

export default TourLocationScreen;
