import { CommonActions, useNavigation } from '@react-navigation/native';
import LiveChatViewmodel from "~/common/viewModel/LiveChat/LiveChat.viewmodel";
import userModel from "~/common/models/User.model"
import useConnectionViewModel from '~/common/viewModel/Connection/Connection.viewmodel';
import liveChatViewmodel from "~/common/viewModel/LiveChat/LiveChat.viewmodel";
import LiveChatMessageModel from "~/common/models/LiveChatMessage.model";
import liveChatMessageModel from "~/common/models/LiveChatMessage.model";
import LiveChatMessage from '~/common/models/LiveChatMessage.model';

const ChatController = () => {
  const { user} = useConnectionViewModel();
  const navigation = useNavigation();

  const chatid = Math.floor(Math.random() * 9999) + 1 ;
  //const liveChatMessageModel: liveChatMessageModel;

  const addChat =(message :string) =>{

    const Chatmessage : LiveChatMessage ={content:message, date:Date.now()};
    LiveChatViewmodel().addMessage(chatid.toString(),Chatmessage);

  }

  const isTyping=()=>{
    LiveChatViewmodel().setActiveLiveChat(chatid.toString());
  }

  const BackToHome = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'HomeScreen',
      }),
    );
  };

  return {
    BackToHome,
    addChat,
    isTyping
  };
};
export default ChatController;
