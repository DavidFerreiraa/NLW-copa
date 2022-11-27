import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Share } from "react-native";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolCardPros } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { api } from "../services/api";

interface RouteParams {
    id: string;
}

export function DetailsPool() {

    const [optionSelected, setOptionSelected] = useState<'guess' | 'ranking'>('guess')
    const [isLoading, setIsLoading] = useState(true);
    const [poolDetails, setPoolDetails] = useState<PoolCardPros>(
        {} as PoolCardPros
    );

    const route = useRoute();
    const toast = useToast();

    const { id } = route.params as RouteParams;

    async function fetchPoolDetails() {
        try {
            setIsLoading(true);

            const response = await api.get(`/pools/${id}`);
            setPoolDetails(response.data.pool);
        } catch (error) {
            console.log(error);

            toast.show({
                title: "Não foi possível carregar os detalhes deste bolão específico.",
                placement: "top",
                bgColor: "red.500",
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function handleShare() {
        await Share.share({
            message: poolDetails.code,
        })
    }

    useEffect(() => {
        fetchPoolDetails();
    }, [id]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title={poolDetails.title} showBackButton showShareButton onShare={handleShare}/>
            {poolDetails._count?.Participant > 0 ? (
                <VStack px={5} flex={1}>
                    <PoolHeader data={poolDetails} />
                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                        <Option title="Seus palpites" isSelected={optionSelected === 'guess'} onPress={() => setOptionSelected('guess')}/>
                        <Option title="Ranking do grupo" isSelected={optionSelected === 'ranking'} onPress={() => setOptionSelected('ranking')}/>
                    </HStack>
                    <Guesses poolId={poolDetails.id} />
                </VStack>
            ) : (
                <EmptyMyPoolList code={poolDetails.code} />
            )}
        </VStack>
    );
}
