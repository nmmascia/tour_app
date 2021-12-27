import { Button, Flex } from "native-base";

interface FormSubmitButtonProps {
  text?: string;
  onPress: () => void;
}

const FormSubmitButton = (props: FormSubmitButtonProps) => {
  const { text = "Submit", onPress } = props;

  return (
    <Flex p={4} mt="auto" bg="white">
      <Button onPress={onPress}>{text}</Button>
    </Flex>
  );
};

export default FormSubmitButton;
