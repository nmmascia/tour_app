import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { gql } from "graphql-request";
import { useQuery } from "react-query";
import client from "../api/client";
import { ActivityIndicator } from "react-native";

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
          address
          name
        }
      }
    }
  }
`;

const TourScreen = ({
  navigation: _navigation,
  route,
}: RootTabScreenProps<"Tour">) => {
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
          <Text>{data.tour.name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});

export default TourScreen;
