import { Center, Divider } from "native-base";

import TimestampRatingBadge from "../components/TimestampRatingBadge";
import TourStopMembers from "../components/TourStopMembers";

const TourStopCard = (props) => {
  const { date, tourStopMembers, rating } = props;

  return (
    <Center w="100%" rounded="md" shadow={1} bg="white" p={2}>
      <TimestampRatingBadge rating={rating} date={date} />
      <Divider />
      <TourStopMembers tourStopMembers={tourStopMembers} />
    </Center>
  );
};

export default TourStopCard;
