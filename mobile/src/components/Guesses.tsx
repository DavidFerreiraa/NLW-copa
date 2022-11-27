import { GrantType } from "expo-auth-session";
import { useToast, FlatList } from "native-base";
import { ItemClick } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";
import { useEffect, useState } from "react";
import { Share } from "react-native";
import { api } from "../services/api";
import { EmptyMyPoolList } from "./EmptyMyPoolList";
import { Game, GameProps } from "./Game";
import { Loading } from "./Loading";

interface Props {
    poolId: string;
    code: string;
}

export function Guesses({ poolId, code }: Props) {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ firstTeamPoints, setFirstTeamPoints ] = useState<string>('')
    const [ secondTeamPoints, setSecondTeamPoints] = useState<string>('');
    const [ games, setGames ] = useState<GameProps[]>([]);

    const toast = useToast();

    async function fetchGames() {
        try {
            setIsLoading(true);

            const response = await api.get(`/pools/${poolId}/games`);
            setGames(response.data.games);
            
        } catch (error) {
            console.log(error);

            toast.show({
                title: "Não foi possível carregar os jogos.",
                placement: "top",
                bgColor: "red.500",
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGuessConfirm(gameId: string) {
        try {
            if(!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
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

            fetchGames();

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

    useEffect(() => {
        fetchGames();
    }, [poolId]);

    if(isLoading){
        <Loading />
    }

    return (
        <FlatList
            data={games}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <Game
                    data={item}
                    setFirstTeamPoints={setFirstTeamPoints}
                    setSecondTeamPoints={setSecondTeamPoints}
                    onGuessConfirm={() => handleGuessConfirm(item.id)}
                    isLoading={isLoading}
                />
            )
        }
            ListEmptyComponent={() => <EmptyMyPoolList code={code}/>}
        />
    );
}
