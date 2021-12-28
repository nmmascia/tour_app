import { Button, Flex } from "native-base";

interface FormSubmitButtonProps {
  text?: string;
  onPress: () => void;
  isLoading?: boolean;
}

const FormSubmitButton = (props: FormSubmitButtonProps) => {
  const { text = "Submit", onPress, isLoading } = props;

  return (
    <Flex p={4} mt="auto" bg="white">
      <Button isLoading={isLoading} disabled={isLoading} onPress={onPress}>
        {text}
      </Button>
    </Flex>
  );
};

export default FormSubmitButton;
