/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';

import RecentChat from '../screens/RecentChat/RecentChat';

import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SelectMembers from '../screens/SelectMembers/SelectMembers';

import type { RootStackParamList } from './RouteParamList';
import { ChatRoomSetting } from '../screens/ChatDetail/ChatRoomSetting';
import { EditChatRoomDetail } from '../screens/EditChatDetail/EditChatRoomDetail';
import MemberDetail from '../screens/MemberDetail/MemberDetail';
import ChatRoom from '../screens/ChatRoom/ChatRoom';
import useAuth from '../hooks/useAuth';
import translate from '../translate/translate'


export default function ChatNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { isConnected } = useAuth();
  return (
    <NavigationContainer independent={true}>
      {isConnected && <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: 'white',
          },

          // headerShown: false,
        }}
      >

        <Stack.Screen
          name="RecentChat"
          component={RecentChat}
          options={({ }) => ({
            title: '',
          })} />

        <Stack.Screen
          name="ChatRoom"
          options={{ headerShown: false }}
          component={ChatRoom}
        />
        <Stack.Screen
          name="ChatDetail"
          component={ChatRoomSetting}
          options={{
            headerShown: false
          }}

        />
        <Stack.Screen
          name="MemberDetail"
          component={MemberDetail}
          options={{
            title: translate('Member Detail'),
            headerShown: false
          }}
        />
        <Stack.Screen
          name="EditChatDetail"
          component={EditChatRoomDetail}
          options={{
            title: translate('Edit Chat Detail'),
            headerShown: false
          }}
        />

        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="SelectMembers"
            component={SelectMembers}
            options={({ }) => ({
              title: '',
              headerShown: false

            })}
          />
        </Stack.Group>
      </Stack.Navigator>}

    </NavigationContainer>
  );
}
