import { Box, Flex } from "native-base";

import RatingBadge from "../components/RatingBadge";
import { formatDistanceToNow } from "date-fns";

interface Props {
  date: string;
  rating: number;
}

const TimestampRatingBadge = (props: Props) => {
  const { date, rating } = props;

  return (
    <Flex justifyContent="center" alignItems="center" direction="row" mb={2}>
      <RatingBadge rating={rating} />
      <Box ml={1}>
        {formatDistanceToNow(new Date(date), {
          addSuffix: true,
        })}
      </Box>
    </Flex>
  );
};

export default TimestampRatingBadge;
