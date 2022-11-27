import { Heading, useToast, VStack } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function FindPool() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [code, setCode] = useState<string>("");
    const toast = useToast();
    const { navigate } = useNavigation();

    async function handleJoinPool() {
        try {
            setIsLoading(true);

            if (!code.trim()) {
                return toast.show({
                    title: "Informe o código antes de continuar.",
                    placement: "top",
                    bgColor: "red.500",
                });
            }

            await api.post("/pools/join", { code });

            toast.show({
                    title: "Você entrou no bolão com sucesso!",
                    placement: "top",
                    bgColor: "green.500",
                });

            navigate("pools")

        } catch (error) {
            console.log(error);
            setIsLoading(false);

            if (error.response?.data?.message === "Pool not found.") {
                return toast.show({
                    title: "Ops! Não foi possível encontrar o bolão.",
                    placement: "top",
                    bgColor: "red.500",
                });
            }

            if (
                error.response?.data?.message === "You alredy joined this poll."
            ) {
                return toast.show({
                    title: "Ops! Você já está nesse bolão.",
                    placement: "top",
                    bgColor: "red.500",
                });
            }

            toast.show({
                title: "Ops! Um erro ocorreu ao procurar o bolão.",
                placement: "top",
                bgColor: "red.500",
            });
        } finally {

        }
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton />
            <VStack mt={8} mx={5} alignItems="center">
                <Heading
                    color="#ffffff"
                    fontFamily="heading"
                    fontSize="xl"
                    textAlign="center"
                    mb={8}
                >
                    Encontrar bolão através de{"\n"} seu código único
                </Heading>
                <Input
                    mb={2}
                    placeholder="Qual o código do bolão?"
                    autoCapitalize="characters"
                    onChangeText={setCode}
                />
                <Button
                    title="BUSCAR BOLÃO"
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                />
            </VStack>
        </VStack>
    );
}
