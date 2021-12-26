import { FlatList, TouchableHighlight } from "react-native";

import { ListItem, Avatar } from "react-native-elements";

interface Item {
  id: number;
  name: string;
  subtitle?: string;
  avatarUrl?: string;
}

interface Props {
  data: Array<Item>;
  onPress: (id: number, item: Item) => void;
}

const TouchableTextList = ({ data, onPress }: Props) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
          <TouchableHighlight
            onPress={() => {
              onPress(item.id, item);
            }}
          >
            <ListItem bottomDivider>
              {item.avatarUrl && (
                <Avatar
                  source={{ uri: item.avatarUrl }}
                  size="large"
                  avatarStyle={{ borderRadius: 10 }}
                />
              )}
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                {item.subtitle && (
                  <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
                )}
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableHighlight>
        );
      }}
    />
  );
};

export default TouchableTextList;
