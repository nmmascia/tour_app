import { Badge } from "native-base";

interface Props {
  rating?: number;
}

const getColorScheme = (rating?: number) => {
  if (!rating) {
    return "coolGray";
  }

  if (rating <= 3.0) {
    return "error";
  } else if (rating <= 7.0) {
    return "info";
  } else {
    return "success";
  }
};

const RatingBadge = (props: Props) => {
  const { rating } = props;

  return <Badge colorScheme={getColorScheme(rating)}>{rating || "--"}</Badge>;
};

export default RatingBadge;
