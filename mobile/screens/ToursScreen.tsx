import { Text, View } from "react-native";

import { ListItem } from "react-native-elements";
import Loader from "../components/Loader";
import TourMembersList from "../components/TourMembersList";
import client from "../api/client";
import { gql } from "graphql-request";
import { useQuery } from "react-query";
import { useState } from "react";

const query = gql`
  query UserTours {
    user(id: 1) {
      id
      username
      name
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

const ToursScreen = ({ navigation }) => {
  const { data, isLoading } = useQuery("UserTours", async () =>
    client.request(query)
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
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
  );
};

export default ToursScreen;
