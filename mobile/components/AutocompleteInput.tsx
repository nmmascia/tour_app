import {
  Center,
  FlatList,
  Flex,
  FormControl,
  Icon,
  Input,
  Stack,
  Text,
  VStack,
} from "native-base";

import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AutocompleteInputProps {
  autoFocus?: boolean;
  data?: any[];
  label?: string;
  renderItem: ({ item }: any) => React.ReactElement;
  onChangeText: (text: string) => void;
  value: string;
  onBlur?: () => void;
  isLoading?: boolean;
  onEndReached?: () => void;
  placeholder?: string;
  emptyMessage?: string;
  isDisabled?: boolean;
}

const AutocompleteInput = (props: AutocompleteInputProps) => {
  const {
    label,
    data,
    renderItem,
    autoFocus = false,
    value,
    onChangeText,
    onBlur,
    isLoading,
    onEndReached,
    placeholder,
    emptyMessage = "Your search did not return any results!",
    isDisabled,
  } = props;

  let innerComponent = (
    <FlatList data={data} renderItem={renderItem} onEndReached={onEndReached} />
  );

  if (value && !data?.length) {
    innerComponent = (
      <Center>
        <Text>{emptyMessage}</Text>
      </Center>
    );
  }

  if (isLoading) {
    innerComponent = <ActivityIndicator size="small" />;
  }

  return (
    <VStack p={2}>
      <FormControl>
        <Stack>
          {label && <FormControl.Label>{label}</FormControl.Label>}
          <Input
            value={value}
            autoCapitalize="none"
            onChangeText={onChangeText}
            onBlur={onBlur}
            InputLeftElement={
              <Icon
                ml="2"
                size="5"
                color="gray.500"
                as={<Ionicons name="ios-search" />}
              />
            }
            autoFocus={autoFocus}
            placeholder={placeholder}
            isDisabled={isDisabled}
          />
        </Stack>
      </FormControl>
      <Flex m={2} mb={0}>
        {innerComponent}
      </Flex>
    </VStack>
  );
};

export default AutocompleteInput;
