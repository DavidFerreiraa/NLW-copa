import { useToast, FlatList } from "native-base";
import { useEffect, useState } from "react";
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

    useEffect(() => {
        fetchGames();
    }, [poolId]);

    if(isLoading){
        return <Loading />
    }

    return (
        <FlatList
            data={games}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <Game
                    data={item}
                    onGuessConfirm={() => fetchGames()}
                    poolId={poolId}
                    gameId={item.id}
                    isLoading={isLoading}
                />
            )
        }
            ListEmptyComponent={() => <EmptyMyPoolList code={code}/>}
        />
    );
}
