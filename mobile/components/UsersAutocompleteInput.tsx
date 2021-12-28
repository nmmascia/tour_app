import { Avatar, Flex, Heading, Text, VStack } from "native-base";

import AutocompleteInput from "../components/AutocompleteInput";
import IconButton from "../components/IconButton";
import client from "../api/client";
import { gql } from "graphql-request";
import useDebounce from "react-use/lib/useDebounce";
import { useQuery } from "react-query";
import { useState } from "react";

interface Item {
  id: number;
  name?: string;
  username: string;
  avatar?: {
    id: number;
    url: string;
  };
}

interface UsersAutocompleteInputProps {
  users: Array<{
    id: number;
  }>;
  onUserPress: (item: Item) => void;
  isDisabled?: boolean;
}

const query = gql`
  query PaginatedUsers($searchTerm: String!, $offset: Int!) {
    paginatedUsers(searchTerm: $searchTerm, offset: $offset) {
      records {
        id
        name
        username
        avatar {
          id
          url
        }
      }
      offset
      totalCount
    }
  }
`;

const DEFAULT_DATA: Item[] = [];

const UsersAutocompleteInput = ({
  users,
  onUserPress,
  isDisabled,
}: UsersAutocompleteInputProps) => {
  const [offset, setOffset] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useDebounce(
    () => {
      setSearchTerm(inputValue);
    },
    250,
    [inputValue]
  );

  const variables = {
    offset,
    searchTerm,
  };

  const { data, isLoading } = useQuery(
    ["PaginatedUsers", JSON.stringify(variables)],
    async () => client.request(query, variables)
  );

  const { offset: nextOffset, records: searchedUsers = DEFAULT_DATA } =
    data?.paginatedUsers || {};

  return (
    <AutocompleteInput
      isDisabled={isDisabled}
      onChangeText={setInputValue}
      renderItem={({ item }) => {
        const selected = users.findIndex(({ id }) => id === item.id) >= 0;
        return (
          <Flex
            flex={1}
            key={item.id}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            opacity={selected ? 0.5 : 1}
          >
            <Flex direction="row" alignItems="center" mr="auto">
              <Avatar source={{ uri: item.avatar.url }} size="xs" />
              <VStack ml={2} mr="auto">
                <Heading size="xs">{item.username}</Heading>
                <Text>{item.name}</Text>
              </VStack>
            </Flex>
            <IconButton
              disabled={isDisabled || selected}
              name={selected ? "check-circle" : "plus-circle"}
              onPress={() => {
                onUserPress(item);
              }}
            />
          </Flex>
        );
      }}
      data={searchedUsers}
      value={inputValue}
      isLoading={isLoading}
      onEndReached={() => {
        if (nextOffset !== null) {
          setOffset(nextOffset);
        }
      }}
      placeholder="Search by Name or Username"
    />
  );
};

export default UsersAutocompleteInput;
