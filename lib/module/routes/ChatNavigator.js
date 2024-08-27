/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import RecentChat from '../screens/RecentChat/RecentChat';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectMembers from '../screens/SelectMembers/SelectMembers';
import { ChatRoomSetting } from '../screens/ChatDetail/ChatRoomSetting';
import { EditChatRoomDetail } from '../screens/EditChatDetail/EditChatRoomDetail';
import MemberDetail from '../screens/MemberDetail/MemberDetail';
import ChatRoom from '../screens/ChatRoom/ChatRoom';
import useAuth from '../hooks/useAuth';
import translate from '../translate/translate';
export default function ChatNavigator() {
  const Stack = createNativeStackNavigator();
  const {
    isConnected
  } = useAuth();
  return /*#__PURE__*/React.createElement(NavigationContainer, {
    independent: true
  }, isConnected && /*#__PURE__*/React.createElement(Stack.Navigator, {
    screenOptions: {
      headerShadowVisible: false,
      contentStyle: {
        backgroundColor: 'white'
      }

      // headerShown: false,
    }
  }, /*#__PURE__*/React.createElement(Stack.Screen, {
    name: "RecentChat",
    component: RecentChat,
    options: ({}) => ({
      title: ''
    })
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: "ChatRoom",
    options: {
      headerShown: false
    },
    component: ChatRoom
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: "ChatDetail",
    component: ChatRoomSetting,
    options: {
      headerShown: false
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: "MemberDetail",
    component: MemberDetail,
    options: {
      title: translate('Member Detail'),
      headerShown: false
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: "EditChatDetail",
    component: EditChatRoomDetail,
    options: {
      title: translate('Edit Chat Detail'),
      headerShown: false
    }
  }), /*#__PURE__*/React.createElement(Stack.Group, {
    screenOptions: {
      presentation: 'modal'
    }
  }, /*#__PURE__*/React.createElement(Stack.Screen, {
    name: "SelectMembers",
    component: SelectMembers,
    options: ({}) => ({
      title: '',
      headerShown: false
    })
  }))));
}
//# sourceMappingURL=ChatNavigator.js.map