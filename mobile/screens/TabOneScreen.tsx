import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from "react-native";

import { View, Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useQuery } from "react-query";
import { gql } from "graphql-request";
import client from "../api/client";
import { ListItem, Avatar } from "react-native-elements";

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

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
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
          <FlatList
            data={data.user.tourMembers}
            renderItem={({ item, separators }) => {
              return (
                <TouchableHighlight
                  onPress={() => {
                    navigation.navigate("TabTwo");
                  }}
                  onShowUnderlay={separators.highlight}
                  onHideUnderlay={separators.unhighlight}
                >
                  <ListItem bottomDivider>
                    {/* <Avatar source={{ uri: item.avatar_url }} /> */}
                    <ListItem.Content>
                      <ListItem.Title>{item.tour.name}</ListItem.Title>
                      {/* <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle> */}
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                </TouchableHighlight>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

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
