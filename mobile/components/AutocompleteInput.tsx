import {
  FlatList,
  Flex,
  FormControl,
  Icon,
  Input,
  Stack,
  VStack,
} from "native-base";

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface AutocompleteInputProps {
  autoFocus?: boolean;
  data: any;
  label?: string;
  renderItem: ({ item }: any) => React.ReactElement;
}

const AutocompleteInput = (props: AutocompleteInputProps) => {
  const { label, data, renderItem, autoFocus = false } = props;

  const [inputValue, setInputValue] = useState("");

  return (
    <VStack p={2}>
      <FormControl>
        <Stack>
          {label && <FormControl.Label>{label}</FormControl.Label>}
          <Input
            value={inputValue}
            autoCapitalize="none"
            onChangeText={(text) => {
              setInputValue(text);
            }}
            onBlur={() => {
              setInputValue("");
            }}
            InputLeftElement={
              <Icon
                ml="2"
                size="5"
                color="gray.500"
                as={<Ionicons name="ios-search" />}
              />
            }
            autoFocus={autoFocus}
          />
        </Stack>
      </FormControl>
      <Flex m={2}>
        {inputValue ? (
          <FlatList data={data} renderItem={renderItem} />
        ) : undefined}
      </Flex>
    </VStack>
  );
};

export default AutocompleteInput;
