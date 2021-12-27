import {
  Alert,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Text,
} from "native-base";

import RatingBadge from "../components/RatingBadge";

const CONTAINER_STYLES = {
  bg: "white",
  shadow: 1,
  rounded: "md",
  width: "100%",
  p: 2,
};

const TourLocationRating = (props) => {
  const { title = "Overall Rating", rating } = props;

  const innerComponent = (
    <Flex
      {...(rating ? CONTAINER_STYLES : undefined)}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading size="xs">{title}</Heading>
      <RatingBadge rating={rating} />
    </Flex>
  );

  if (!rating) {
    return (
      <Flex direction="column" {...CONTAINER_STYLES}>
        {innerComponent}
        <Divider mt={2} />
        <Center p={2}>
          <Alert status="info">
            <HStack alignItems="center">
              <Alert.Icon mr={2} />
              <Text>
                You do not have an overall rating for this location yet! Add
                dates and ratings to see an overall score.
              </Text>
            </HStack>
          </Alert>
        </Center>
      </Flex>
    );
  }

  return innerComponent;
};

export default TourLocationRating;
