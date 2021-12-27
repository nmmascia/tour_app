import { ActivityIndicator } from "react-native";
import Loader from "../components/Loader";
import { StyleSheet } from "react-native";
import TouchableTextList from "../components/TouchableTextList";
import { TourScreenProps } from "../types";
import { View } from "../components/Themed";
import client from "../api/client";
import { gql } from "graphql-request";
import { useQuery } from "react-query";

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
    ["Tour", JSON.stringify(variables)],
    async () => client.request(query, variables)
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
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
