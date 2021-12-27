import { ActivityIndicator } from "react-native";
import { Flex } from "native-base";

interface Props {
  size?: number | "large" | "small" | undefined;
}

const Loader = (props: Props) => {
  const { size = "large" } = props;

  return (
    <Flex flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator size={size} />
    </Flex>
  );
};

export default Loader;
