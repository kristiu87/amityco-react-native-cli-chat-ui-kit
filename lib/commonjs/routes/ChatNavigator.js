"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ChatNavigator;
var _native = require("@react-navigation/native");
var _RecentChat = _interopRequireDefault(require("../screens/RecentChat/RecentChat"));
var React = _interopRequireWildcard(require("react"));
var _nativeStack = require("@react-navigation/native-stack");
var _SelectMembers = _interopRequireDefault(require("../screens/SelectMembers/SelectMembers"));
var _ChatRoomSetting = require("../screens/ChatDetail/ChatRoomSetting");
var _EditChatRoomDetail = require("../screens/EditChatDetail/EditChatRoomDetail");
var _MemberDetail = _interopRequireDefault(require("../screens/MemberDetail/MemberDetail"));
var _ChatRoom = _interopRequireDefault(require("../screens/ChatRoom/ChatRoom"));
var _useAuth = _interopRequireDefault(require("../hooks/useAuth"));
var _translate = _interopRequireDefault(require("../translate/translate"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable react/no-unstable-nested-components */

function ChatNavigator() {
  const Stack = (0, _nativeStack.createNativeStackNavigator)();
  const {
    isConnected
  } = (0, _useAuth.default)();
  return /*#__PURE__*/React.createElement(_native.NavigationContainer, {
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
    component: _RecentChat.default,
    options: ({}) => ({
      title: ''
    })
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: "ChatRoom",
    options: {
      headerShown: false
    },
    component: _ChatRoom.default
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: "ChatDetail",
    component: _ChatRoomSetting.ChatRoomSetting,
    options: {
      headerShown: false
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: "MemberDetail",
    component: _MemberDetail.default,
    options: {
      title: (0, _translate.default)('Member Detail'),
      headerShown: false
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: "EditChatDetail",
    component: _EditChatRoomDetail.EditChatRoomDetail,
    options: {
      title: (0, _translate.default)('Edit Chat Detail'),
      headerShown: false
    }
  }), /*#__PURE__*/React.createElement(Stack.Group, {
    screenOptions: {
      presentation: 'modal'
    }
  }, /*#__PURE__*/React.createElement(Stack.Screen, {
    name: "SelectMembers",
    component: _SelectMembers.default,
    options: ({}) => ({
      title: '',
      headerShown: false
    })
  }))));
}
//# sourceMappingURL=ChatNavigator.js.map