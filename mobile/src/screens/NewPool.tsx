import { useState } from "react";
import { Heading, Text, VStack} from "native-base";
import { Header } from "../components/Header";
import NLWLogo from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { AlertModal } from "../components/AlertModal";

export function NewPool() {

    const [title, setTitle] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false)

    async function handlePoolCreate() {

        if (!title) {
            setShowModal(true)
        }

    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Criar novo bolão" />
            <VStack mt={8} mx={5} alignItems="center">
                <NLWLogo />
                <Heading
                    my={8}
                    color="#ffffff"
                    fontFamily="heading"
                    fontSize="xl"
                    textAlign="center"
                >
                    Crie seu próprio bolão da copa e compartilhe com os amigos!
                </Heading>
                <Input
                    mb={2}
                    placeholder="Qual o nome do seu bolão?"
                    onChangeText={setTitle}
                    value={title}
                />
                <Button title="CRIAR MEU BOLÃO" onPress={handlePoolCreate} />
                <Text
                    color="gray.200"
                    fontSize="sm"
                    textAlign="center"
                    px={10}
                    mt={4}
                >
                    Após criar seu bolão, você receberá um código único que
                    poderá usar para convidar outras pessoas
                </Text>
                <AlertModal isOpen={showModal} onClose={setShowModal} />
            </VStack>
        </VStack>
    );
}
