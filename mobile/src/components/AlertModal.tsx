import { Modal as NativeModal, Center, IModalProps, Text } from 'native-base';
import { Ionicons } from "@expo/vector-icons";

interface ModalProps extends IModalProps {

}
export function AlertModal({...rest}: ModalProps){
    return (
        <NativeModal {...rest}>
            <Center w="64" h="96" bgColor="gray.800" borderRadius={8} p={8}>
                <Ionicons name="warning-outline" size={64} color="red" />
                <Text color="gray.300">
                    Informe o nome do seu bolão antes de criá-lo!
                </Text>
                <NativeModal.CloseButton />
            </Center>
        </NativeModal>
    );
}