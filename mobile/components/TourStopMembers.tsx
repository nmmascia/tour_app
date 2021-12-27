import { Avatar, Center, Heading } from "native-base";

const TourStopMembers = ({ title = "Participants", tourStopMembers }) => {
  return (
    <Center pt={2} pb={1}>
      <Heading size="xs">{title}</Heading>
      <Center p={1}>
        <Avatar.Group size="sm">
          {tourStopMembers.map((tourStopMember) => {
            return (
              <Avatar
                key={tourStopMember.id}
                borderWidth={2}
                borderRadius={50}
                borderColor="lightBlue.300"
                source={{
                  uri: tourStopMember.user.avatar,
                }}
              >
                {tourStopMember.user.username.slice(0, 2).toUpperCase()}
              </Avatar>
            );
          })}
        </Avatar.Group>
      </Center>
    </Center>
  );
};

export default TourStopMembers;
