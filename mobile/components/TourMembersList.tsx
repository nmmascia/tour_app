import TouchableTextList from "./TouchableTextList";

interface Item {
  id: number;
  name: string;
  subtitle?: string;
  avatarUrl?: string;
}

interface Props {
  onTourPress: (id: number, item: Item) => void;
}

const TourMembersList = (props: Props) => {
  const { tourMembers, onTourPress } = props;

  const data = tourMembers.map((item) => {
    return {
      id: item.id,
      name: item.tour.name,
    };
  });

  return <TouchableTextList data={data} onPress={onTourPress} />;
};

export default TourMembersList;
