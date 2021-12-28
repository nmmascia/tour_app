import { FontAwesome } from "@expo/vector-icons";
import { Icon } from "native-base";
import { Pressable } from "react-native";

interface IconButtonProps {
  disabled?: boolean;
  name: string;
  onPress: () => void;
}

const IconButton = (props: IconButtonProps) => {
  const { disabled = false, name, onPress } = props;

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Icon as={FontAwesome} name={name} size="sm" color="lightBlue.500" />
    </Pressable>
  );
};

export default IconButton;