import { ActivityIndicator, StyleSheet } from "react-native";

import { View, Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useQuery } from "react-query";
import { gql } from "graphql-request";
import client from "../api/client";
import { Avatar } from "react-native-elements";

import TouchableTextList from "../components/TouchableTextList";

const query = gql`
  query User {
    user(id: 1) {
      id
      username
      tourMembers {
        id
        admin
        tour {
          id
          name
        }
      }
    }
  }
`;

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  const { data, isLoading } = useQuery("user", async () =>
    client.request(query)
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <View style={styles.header}>
            <Avatar
              size={64}
              rounded
              icon={{ name: "user", type: "font-awesome" }}
              containerStyle={{ backgroundColor: "#6733b9" }}
            />
            <Text style={styles.title}>{data.user.name}</Text>
            <Text style={styles.title}>{data.user.username}</Text>
          </View>
          <TouchableTextList
            data={data.user.tourMembers.map((item) => {
              return {
                id: item.id,
                name: item.tour.name,
              };
            })}
            onPress={(id, { name }) => {
              navigation.navigate("Tour", {
                screen: "TourHome",
                params: {
                  tourId: id.toString(),
                  tourName: name,
                },
              });
            }}
          />
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
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});

export default ProfileScreen;
