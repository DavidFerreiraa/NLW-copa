import { Button, HStack, Text, useTheme, useToast, VStack } from "native-base";
import { X, Check, Plus} from "phosphor-react-native";
import { getName } from "country-list";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";

import { Team } from "./Team";
import { api } from "../services/api";
import { useState } from "react";

interface GuessProps {
    id: string;
    gameId: string;
    createdAt: string;
    participantId: string;
    firstTeamPoints: number;
    secondTeamPoints: number;
}

export interface GameProps {
    id: string;
    firstTeamCountryCode: string;
    secondTeamCountryCode: string;
    firstTeamPointsFinalResult: number;
    secondTeamPointsFinalResult: number;
    guess: null | GuessProps;
    date: Date;
}

interface Props {
    data: GameProps;
    onGuessConfirm: () => void;
    isLoading: boolean;
    isOwner: boolean;
    poolId: string;
    gameId: string;
}

export function Game({
    data,
    onGuessConfirm,
    isLoading,
    isOwner,
    poolId,
    gameId,
}: Props) {
    const { colors, sizes } = useTheme();
    const toast = useToast();
    const [firstTeamPoints, setFirstTeamPoints] = useState<string>("");
    const [secondTeamPoints, setSecondTeamPoints] = useState<string>("");

    const when = dayjs(data.date)
        .locale(ptBR)
        .format("DD [de] MMMM [de] YYYY [às] HH:00[hrs]");
    const isPassed = dayjs(data.date).isBefore(dayjs());

    async function handleGuessConfirm(poolId: string, gameId: string) {
        try {
            if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
                return toast.show({
                    title: "Informe o placar para ambos os times!",
                    placement: "top",
                    bgColor: "yellow.500",
                });
            }

            await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
                firstTeamPoints: Number(firstTeamPoints),
                secondTeamPoints: Number(secondTeamPoints),
            });

            toast.show({
                title: "Palpite enviado!",
                placement: "top",
                bgColor: "green.500",
            });
        } catch (error) {
            if (
                error.response?.data?.message ===
                "You're not allowed to create a guess inside this pool."
            ) {
                toast.show({
                    title: "Você não pode criar um palpite dentro desse bolão.",
                    placement: "top",
                    bgColor: "red.500",
                });
            } else if (
                error.response?.data?.message ===
                "You alredy send a guess to this game on this pool."
            ) {
                toast.show({
                    title: "Você já enviou um palpite para esse bolão.",
                    placement: "top",
                    bgColor: "red.500",
                });
            } else if (error.response?.data?.message === "Game not found.") {
                toast.show({
                    title: "Esse jogo não existe dentro desse bolão.",
                    placement: "top",
                    bgColor: "red.500",
                });
            } else if (
                error.response?.data?.message ===
                "You cannot send guesses after the game date."
            ) {
                toast.show({
                    title: "Esse jogo já aconteceu!",
                    placement: "top",
                    bgColor: "red.500",
                });
            } else {
                toast.show({
                    title: "Não foi possível enviar o palpite.",
                    placement: "top",
                    bgColor: "red.500",
                });
            }
        }
    }

    return (
        <VStack
            w="full"
            bgColor="gray.800"
            rounded="sm"
            alignItems="center"
            borderBottomWidth={3}
            borderBottomColor={isPassed ? "gray.600" : "yellow.500"}
            mb={3}
            p={4}
        >
            <Text
                color={isPassed ? "gray.600" : "gray.100"}
                fontFamily="heading"
                fontSize="sm"
            >
                {getName(data.firstTeamCountryCode)} vs.{" "}
                {getName(data.secondTeamCountryCode)}
            </Text>

            <Text color={isPassed ? "gray.600" : "gray.200"} fontSize="xs">
                {when}
            </Text>

            <HStack
                mt={4}
                w="full"
                justifyContent="space-between"
                alignItems="center"
            >
                <Team
                    code={data.firstTeamCountryCode}
                    position="right"
                    onChangeText={setFirstTeamPoints}
                />

                {data.firstTeamPointsFinalResult != null ? (
                    <Text color="gray.300">
                        {data.firstTeamPointsFinalResult}
                    </Text>
                ) : null}
                <X color={colors.gray[300]} size={sizes[6]} />
                {data.secondTeamPointsFinalResult != null ? (
                    <Text color="gray.300">
                        {data.secondTeamPointsFinalResult}
                    </Text>
                ) : null}

                <Team
                    code={data.secondTeamCountryCode}
                    position="left"
                    onChangeText={setSecondTeamPoints}
                />
            </HStack>

            {!data.guess && (
                <Button
                    size="xs"
                    w="full"
                    bgColor="green.500"
                    mt={4}
                    onPress={async () => {
                        await handleGuessConfirm(poolId, gameId),
                            onGuessConfirm();
                    }}
                    isLoading={isLoading}
                    isDisabled={isPassed}
                >
                    <HStack alignItems="center">
                        <Text
                            color="white"
                            fontSize="xs"
                            fontFamily="heading"
                            mr={3}
                        >
                            CONFIRMAR PALPITE
                        </Text>

                        <Check color={colors.white} size={sizes[4]} />
                    </HStack>
                </Button>
            )}
            {isPassed && isOwner && (
                <Button
                    size="xs"
                    w="full"
                    bgColor="gray.500"
                    mt={4}
                    onPress={() => {

                    }}
                    isLoading={isLoading}
                    isDisabled={!isPassed}
                >
                    <HStack alignItems="center">
                        <Text
                            color="white"
                            fontSize="xs"
                            fontFamily="heading"
                            mr={3}
                        >
                            ADICIONAR RESULTADOS
                        </Text>

                        <Plus color={colors.white} size={sizes[4]} />
                    </HStack>
                </Button>
            )}
        </VStack>
    );
}
