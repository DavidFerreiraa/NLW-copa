import { Button as ButtonNativeBase, Text, IButtonProps } from "native-base";

interface ButtonProps extends IButtonProps {
    title: string;
    type?: "PRIMARY" | "SECONDARY";
}

export default function Button({
    title,
    type = "PRIMARY",
    ...rest
}: ButtonProps) {
    return (
        <ButtonNativeBase
            {...rest}
            w="full"
            h={14}
            rounded="sm"
            fontSize="md"
            textTransform="uppercase"
            bg={type === "SECONDARY" ? "red.500" : "yellow.500"}
            _pressed={{
                bg: type === "SECONDARY" ? "red.600" : "yellow.600",
            }}
        >
            <Text
                fontSize="sm"
                fontFamily="heading"
                color={type === "SECONDARY" ? "#ffffff" : "#000000"}
            >
                {title}
            </Text>
        </ButtonNativeBase>
    );
}
