import { Text, View } from "../components/Themed";
import { useQuery } from "react-query";
import { gql } from "graphql-request";
import { TourScreenProps } from "../types";
import client from "../api/client";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";

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
          <Image
            containerStyle={styles.item}
            source={{ uri: data.tourLocation.photos[0].url }}
            PlaceholderContent={<ActivityIndicator />}
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
  },
  item: {
    width: "100%",
    height: 200,
  },
});

export default TourLocationScreen;
