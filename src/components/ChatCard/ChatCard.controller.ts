import { CommonActions, useNavigation } from '@react-navigation/native';

const useCardController = () => {
  const navigation = useNavigation();

  const calculateDays = (date: string) => {
    const time = new Date().getTime() - new Date(date).getTime();
    const hours = time / 36e5;

    const day = hours / 24;
    return day > 1 ? `${Math.trunc(day)} Tag` : `${Math.trunc(hours)} Stunde`;
  };

  const onPressCard = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'LiveChatScreen',
      }),
    );
  };

  return {
    calculateDays,
    onPressCard,
  };
};

export default useCardController;
