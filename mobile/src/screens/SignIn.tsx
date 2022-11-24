import { Center, Icon, Text } from "native-base";
import NLWLogo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Fontisto } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {

    const {signIn, isUserLoading, user} = useAuth();

    return (
        <Center flex={1} bgColor="gray.900" p={7}>
            <NLWLogo width={212} height={40} />
            <Button
                type="SECONDARY"
                title="ENTRAR COM GOOGLE"
                mt={12}
                leftIcon={
                    <Icon
                        as={Fontisto}
                        name="google"
                        color="#ffffff"
                        size="md"
                    />
                }
                onPress={signIn}
                isLoading={isUserLoading}
                _loading={{ _spinner: {
                    color: "#ffffff"
                }}}
            />
            <Text
                fontSize="sm"
                fontFamily="mono"
                color="gray.300"
                textAlign="center"
                mt={4}
            >
                Não utilizamos nenhuma informação além{'\n'}do seu e-mail para a
                criação de sua conta.
            </Text>
        </Center>
    );
}
