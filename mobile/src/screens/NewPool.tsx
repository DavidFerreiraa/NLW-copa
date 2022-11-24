import { useState } from "react";
import { Heading, Text, VStack, useToast } from "native-base";
import { Header } from "../components/Header";
import NLWLogo from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../services/api";

export function NewPool() {
    const [title, setTitle] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();

    async function handlePoolCreate() {
        if (!title.trim()) {
            //Trim clears all the " " in the string.
            return toast.show({
                title: "Ops! Informe um nome para o seu bolão.",
                placement: "top",
                bgColor: "red.500",
            });
        }

        try {
            setIsLoading(true);
            await api.post("/pools", { title });
            toast.show({
                title: "Seu bolão foi criado com sucesso!",
                placement: "top",
                color: "green.500",
            });
            setTitle("");
        } catch (err) {
            console.log(err);
            toast.show({
                title: "Ops! Não foi possível criar o bolão.",
                placement: "top",
                color: "red.500",
            });
        } finally {
            setIsLoading(false);
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
            </VStack>
        </VStack>
    );
}
