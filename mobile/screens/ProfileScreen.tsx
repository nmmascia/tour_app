import { ActivityIndicator, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

import { Avatar } from "react-native-elements";
import Loader from "../components/Loader";
import { RootTabScreenProps } from "../types";
import TourMembersList from "../components/TourMembersList";
import client from "../api/client";
import { gql } from "graphql-request";
import { useQuery } from "react-query";

const query = gql`
  query User {
    user(id: 1) {
      id
      username
      avatar {
        id
        url
      }
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
  const { data, isLoading } = useQuery("User", async () =>
    client.request(query)
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size={64}
          rounded
          icon={{ name: "user", type: "font-awesome" }}
          containerStyle={{ backgroundColor: "#6733b9" }}
          source={{
            uri: data.user.avatar.url,
          }}
        />
        <Text style={styles.title}>{data.user.name}</Text>
        <Text style={styles.title}>{data.user.username}</Text>
      </View>
      <TourMembersList
        tourMembers={data.user.tourMembers}
        onTourPress={(id, { name }) => {
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
