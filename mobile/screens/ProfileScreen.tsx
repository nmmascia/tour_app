import { Avatar, Heading, Text, VStack } from "native-base";

import Loader from "../components/Loader";
import { RootTabScreenProps } from "../types";
import { StyleSheet } from "react-native";
import TourMembersList from "../components/TourMembersList";
import { View } from "../components/Themed";
import client from "../api/client";
import { gql } from "graphql-request";
import { useQuery } from "react-query";

const query = gql`
  query CurrentUser {
    currentUser {
      id
      name
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
  const { data, isLoading } = useQuery("CurrentUser", async () =>
    client.request(query)
  );

  if (isLoading) {
    return <Loader />;
  }

  const {
    currentUser: { avatar, name, username, tourMembers },
  } = data;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size="xl"
          source={{
            uri: avatar?.url,
          }}
        >
          {username.slice(0, 2)}
        </Avatar>
        <VStack alignItems="center" mt={1}>
          <Heading size="md">{username}</Heading>
          <Text>{name}</Text>
        </VStack>
      </View>
      <TourMembersList
        tourMembers={tourMembers}
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
