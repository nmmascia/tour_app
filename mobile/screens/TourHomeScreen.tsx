import { StyleSheet, Image, FlatList } from "react-native";

import { Text, View } from "../components/Themed";
import { TourScreenProps } from "../types";
import { gql } from "graphql-request";
import { useQuery } from "react-query";
import client from "../api/client";
import { ActivityIndicator } from "react-native";

import TouchableTextList from "../components/TouchableTextList";

const query = gql`
  query Tour($id: ID!) {
    tour(id: $id) {
      id
      name
      tourMembers {
        id
        admin
        user {
          id
          username
          name
        }
      }
      tourLocations {
        id
        location {
          id
          address
          name
          avatar {
            id
            url
          }
        }
      }
    }
  }
`;

const TourHomeScreen = ({ navigation, route }: TourScreenProps<"TourHome">) => {
  const {
    params: { tourId },
  } = route;

  const variables = {
    id: tourId,
  };

  const { data, isLoading } = useQuery(
    ["tour", JSON.stringify(variables)],
    async () => client.request(query, variables)
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <View style={styles.list}>
            <TouchableTextList
              data={data.tour.tourLocations.map((item) => {
                return {
                  id: item.id,
                  name: item.location.name,
                  subtitle: item.location.address,
                  avatarUrl: item.location.avatar.url,
                };
              })}
              onPress={(id, { name }) => {
                navigation.navigate("TourLocation", {
                  tourLocationId: id.toString(),
                  tourLocationName: name,
                });
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  list: {
    marginTop: 10,
  },
});

export default TourHomeScreen;
