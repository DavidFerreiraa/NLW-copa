import { Avatar, HStack, Text, VStack, Center } from "native-base";
import { ParticipantProps } from "./Participants";

interface RankCardProps {
    participant: ParticipantProps;
    position: number;
}

export function ParticipantRankCard({participant, position}: RankCardProps){
    return (
        <HStack
            flex={1}
            flexDirection="row"
            justifyContent="space-between"
            w="full"
            bgColor="gray.800"
            rounded="sm"
            alignItems="center"
            borderBottomWidth={3}
            borderBottomColor="yellow.500"
            mb={3}
            p={4}
        >
            <Avatar
                source={{ uri: participant.user.avatarUrl }}
                w={10}
                h={10}
                rounded="full"
                borderWidth={2}
                marginRight={-3}
                borderColor="gray.800"
            />
            <VStack flexDirection="column">
                <Text color="gray.100" textAlign="center">
                    {participant.user.name}
                </Text>
                <Text color="gray.300" textAlign="center">
                    {participant.points} ponto(s)
                </Text>
            </VStack>
            <Center rounded="lg" w="10" bgColor="yellow.500">
                <Text>{position}º</Text>
            </Center>
        </HStack>
    );
}