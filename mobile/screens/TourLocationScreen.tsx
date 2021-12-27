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
  ScrollView,
} from "react-native";
import { Avatar, Card, Button } from "react-native-elements";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import PhotoCarousel from "../components/PhotoCarousel";

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
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <PhotoCarousel photos={data.tourLocation.photos} />
          <Card containerStyle={{ borderRadius: 10 }}>
            <Card.Title>Overall Rating</Card.Title>
            <View style={{ alignItems: "center", marginBottom: 10 }}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>8.1</Text>
            </View>
            <Button title="Add Rating" />
          </Card>
        </View>
      )}
    </ScrollView>
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
