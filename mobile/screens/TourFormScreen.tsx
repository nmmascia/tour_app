import {
  Avatar,
  Divider,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
  Switch,
  Text,
  VStack,
} from "native-base";

import AutocompleteInput from "../components/AutocompleteInput";
import FormSubmitButton from "../components/FormSubmitButton";
import IconButton from "../components/IconButton";
import { useState } from "react";

const MOCK_USERS = [
  {
    id: 1,
    name: "Michael Scott",
    username: "little_kid_lover",
    avatar: {
      url: "https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png",
    },
  },
];

interface FormState {
  name: string;
  tourMembers: Array<{
    id: number;
    admin: boolean;
  }>;
}

const TourFormScreen = () => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    tourMembers: [],
  });

  const { name, tourMembers } = formState;

  return (
    <VStack flex={1} justifyContent="space-between">
      <VStack rounded="md" shadow={1} bg="white" p={2} m={2}>
        <Heading alignSelf="center" size="sm">
          Tour
        </Heading>
        <Divider my={2} />
        <FormControl isRequired mb={2}>
          <Stack>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              value={name}
              placeholder="Taco Tour"
              autoFocus
              onChangeText={(text) => {
                setFormState((state) => ({
                  ...state,
                  name: text,
                }));
              }}
            />
          </Stack>
        </FormControl>
      </VStack>
      <VStack rounded="md" shadow={1} bg="white" p={2} m={2}>
        <Heading alignSelf="center" size="sm">
          Participants
        </Heading>
        <Divider my={2} />
        <AutocompleteInput
          renderItem={({ item }) => {
            const selected =
              tourMembers.findIndex(({ id }) => id === item.id) >= 0;
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
                  disabled={selected}
                  name={selected ? "check-circle" : "plus-circle"}
                  onPress={() => {
                    setFormState((state) => ({
                      ...state,
                      tourMembers: [
                        ...state.tourMembers,
                        { ...item, admin: false },
                      ],
                    }));
                  }}
                />
              </Flex>
            );
          }}
          data={MOCK_USERS}
        />
        <VStack>
          {tourMembers.map((item) => {
            return (
              <Flex
                width="100%"
                key={item.id}
                direction="row"
                alignItems="center"
                mr="auto"
              >
                <Avatar source={{ uri: item.avatar.url }} size="xs" />
                <VStack ml={2} mr="auto">
                  <Heading size="xs">{item.username}</Heading>
                  <Text>{item.name}</Text>
                </VStack>
                <Switch size="sm" isChecked={item.admin} />
              </Flex>
            );
          })}
        </VStack>
      </VStack>

      <VStack rounded="md" shadow={1} bg="white" p={2} m={2}>
        <Heading alignSelf="center" size="sm">
          Locations
        </Heading>
        <Divider my={2} />
      </VStack>
      <FormSubmitButton onPress={console.log} />
    </VStack>
  );
};

export default TourFormScreen;
