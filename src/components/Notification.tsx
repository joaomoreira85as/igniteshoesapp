import {
  HStack,
  Text,
  IconButton,
  CloseIcon,
  Icon,
  Pressable,
  VStack,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { OSNotification } from "react-native-onesignal";

type Props = {
  data: OSNotification;
  onClose: () => void;
};

type AdditionalDataProps = {
  route?: "details";
  product_id?: string;
};

export function Notification({ data, onClose }: Props) {
  const { navigate } = useNavigation();
  const handleOnPress = () => {
    const { route, product_id } = data.additionalData as AdditionalDataProps;
    if (route === "details" && product_id) {
      navigate(route, { productId: product_id });
    }
  };

  return (
    <Pressable
      w="full"
      p={4}
      pt={12}
      bgColor="gray.200"
      position="absolute"
      top={0}
      onPress={handleOnPress}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Icon
          as={Ionicons}
          name="notifications-outline"
          size={5}
          color="black"
          mr={2}
        />

        <VStack flex={1}>
          <Text fontSize="xs" color="black" flex={1} mb={1} numberOfLines={2}>
            {data.title}
          </Text>
          <Text fontSize="sm" color="black" flex={1} numberOfLines={2}>
            {data.body}
          </Text>
        </VStack>

        <IconButton
          variant="unstyled"
          _focus={{ borderWidth: 0 }}
          icon={<CloseIcon size="3" />}
          _icon={{ color: "coolGray.600" }}
          color="black"
          onPress={onClose}
        />
      </HStack>
    </Pressable>
  );
}
