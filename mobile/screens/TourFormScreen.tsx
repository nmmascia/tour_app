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

import FormSubmitButton from "../components/FormSubmitButton";
import IconButton from "../components/IconButton";
import UsersAutocompleteInput from "../components/UsersAutocompleteInput";
import { useState } from "react";

interface FormState {
  name: string;
  tourMembers: Array<{
    id: number;
    avatar?: {
      id: number;
      url: string;
    };
    name?: string;
    username: string;
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
        <UsersAutocompleteInput
          users={tourMembers}
          onUserPress={(item) => {
            setFormState((state) => ({
              ...state,
              tourMembers: [...state.tourMembers, { ...item, admin: false }],
            }));
          }}
        />
        <VStack>
          {tourMembers.map((item, index) => {
            const { id, name, username, avatar, admin } = item;

            return (
              <Flex
                width="100%"
                key={id}
                direction="row"
                alignItems="center"
                mr="auto"
              >
                <Avatar source={{ uri: avatar?.url }} size="xs">
                  {username.slice(0, 2).toUpperCase()}
                </Avatar>
                <VStack ml={2} mr="auto">
                  <Heading size="xs">{username}</Heading>
                  <Text>{name}</Text>
                </VStack>
                <Switch
                  size="sm"
                  isChecked={admin}
                  onToggle={() => {
                    setFormState((state) => {
                      const { tourMembers } = state;
                      const nextTourMembers = [...tourMembers];
                      nextTourMembers[index] = {
                        ...nextTourMembers[index],
                        admin: !admin,
                      };
                      return {
                        ...state,
                        tourMembers: nextTourMembers,
                      };
                    });
                  }}
                />
                <IconButton
                  name="times-circle"
                  size="sm"
                  onPress={() => {
                    setFormState((state) => {
                      const { tourMembers } = state;
                      const nextTourMembers = [...tourMembers];
                      nextTourMembers.splice(index, 1);
                      return {
                        ...state,
                        tourMembers: nextTourMembers,
                      };
                    });
                  }}
                />
              </Flex>
            );
          })}
        </VStack>
      </VStack>
      <FormSubmitButton onPress={console.log} />
    </VStack>
  );
};

export default TourFormScreen;
