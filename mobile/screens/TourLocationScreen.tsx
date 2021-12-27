import { ActivityIndicator, Dimensions } from "react-native";
import {
  Center,
  Divider,
  Flex,
  Heading,
  ScrollView,
  VStack,
} from "native-base";

import PhotoCarousel from "../components/PhotoCarousel";
import RatingBadge from "../components/RatingBadge";
import TourLocationRating from "../components/TourLocationRating";
import { TourScreenProps } from "../types";
import TourStops from "../components/TourStops";
import client from "../api/client";
import { gql } from "graphql-request";
import { useQuery } from "react-query";

const query = gql`
  query TourLocation($id: ID!) {
    tourLocation(id: $id) {
      id
      photos {
        id
        url
      }
      tourStops {
        id
        date
        tourStopMembers {
          id
          rating
          user {
            id
            username
            name
          }
        }
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
    <ScrollView _contentContainerStyle={{ pt: 2 }}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <PhotoCarousel photos={data.tourLocation.photos} />
          <VStack space={4} p={4}>
            <TourLocationRating rating={data.tourLocation.rating} />
            <Divider />
            <TourStops tourStops={data.tourLocation.tourStops} />
          </VStack>
        </>
      )}
    </ScrollView>
  );
};

export default TourLocationScreen;
