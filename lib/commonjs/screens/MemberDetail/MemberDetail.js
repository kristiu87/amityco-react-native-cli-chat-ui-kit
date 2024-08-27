"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MemberDetail;
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _styles = require("./styles");
var _UserItem = _interopRequireDefault(require("../../components/UserItem"));
var _CustomTab = _interopRequireDefault(require("../../components/CustomTab"));
var _SearchIcon = require("../../svg/SearchIcon");
var _CircleCloseIcon = require("../../svg/CircleCloseIcon");
var _BackIcon = require("../../svg/BackIcon");
var _reactNativePaper = require("react-native-paper");
var _MemberActionModal = _interopRequireDefault(require("../../components/MemberActionModal/MemberActionModal"));
var _useAuth = _interopRequireDefault(require("../../hooks/useAuth"));
var _useChannelPermission = require("../../hooks/useChannelPermission");
var _useGoBackIfMatchRole = _interopRequireDefault(require("../../hooks/useGoBackIfMatchRole"));
var _useGoBackIfNotRelatedToChannel = _interopRequireDefault(require("../../hooks/useGoBackIfNotRelatedToChannel"));
var _translate = _interopRequireDefault(require("../../translate/translate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function MemberDetail({
  route,
  navigation
}) {
  (0, _useGoBackIfMatchRole.default)('vipUser');
  const styles = (0, _styles.useStyles)();
  const {
    client
  } = (0, _useAuth.default)();
  const {
    channelID
  } = route.params;
  (0, _useGoBackIfNotRelatedToChannel.default)(channelID);
  const permission = (0, _useChannelPermission.useChannelPermission)(channelID);
  const [sectionedUserList, setSectionedUserList] = (0, _react.useState)([]);
  const [usersObject, setUsersObject] = (0, _react.useState)();
  const [searchTerm, setSearchTerm] = (0, _react.useState)('');
  const [tabIndex, setTabIndex] = (0, _react.useState)(1);
  const [actionModalVisible, setActionModalVisible] = (0, _react.useState)(false);
  const [selectedUser, setSelectedUser] = (0, _react.useState)();
  const [isSelectedUserModerator, setIsSelectedUserModerator] = (0, _react.useState)(false);
  let {
    data: userArr = [],
    onNextPage
  } = usersObject ?? {};
  const theme = (0, _reactNativePaper.useTheme)();
  const queryAccounts = (text = '', roles) => {
    _tsSdkReactNative.ChannelRepository.Membership.getMembers({
      channelId: channelID,
      limit: 15,
      search: text,
      roles: roles ?? []
    }, data => {
      setUsersObject(data);
    });
  };
  const handleChange = text => {
    setSearchTerm(text);
  };
  (0, _react.useEffect)(() => {
    if (searchTerm.length > 0 && tabIndex === 1) {
      queryAccounts(searchTerm);
    } else if (searchTerm.length > 0 && tabIndex === 2) {
      queryAccounts(searchTerm, ['channel-moderator']);
    }
  }, [searchTerm]);
  const clearButton = () => {
    setSearchTerm('');
  };
  const createUserList = () => {
    const sectionUserArr = userArr.map(item => {
      var _item$user, _item$user2;
      return {
        userId: item.userId,
        displayName: (_item$user = item.user) === null || _item$user === void 0 ? void 0 : _item$user.displayName,
        avatarFileId: (_item$user2 = item.user) === null || _item$user2 === void 0 ? void 0 : _item$user2.avatarFileId
      };
    });
    setSectionedUserList(sectionUserArr);
  };
  (0, _react.useEffect)(() => {
    createUserList();
  }, [userArr]);
  (0, _react.useEffect)(() => {
    if (searchTerm.length === 0 && tabIndex === 1) {
      queryAccounts();
    } else if (searchTerm.length === 0 && tabIndex === 2) {
      queryAccounts('', ['channel-moderator']);
    }
  }, [tabIndex, searchTerm]);
  const onUserPressed = user => {
    var _userArr$index;
    setSelectedUser(user);
    setActionModalVisible(true);
    const index = userArr.findIndex(item => item.userId === user.userId);
    if ((_userArr$index = userArr[index]) !== null && _userArr$index !== void 0 && _userArr$index.roles.includes('channel-moderator')) {
      setIsSelectedUserModerator(true);
    } else {
      setIsSelectedUserModerator(false);
    }
  };
  const renderItem = ({
    item
  }) => {
    const userObj = {
      userId: item.userId,
      displayName: item.displayName,
      avatarFileId: item.avatarFileId
    };
    return /*#__PURE__*/_react.default.createElement(_UserItem.default, {
      showThreeDot: true,
      isUserAccount: client.userId === userObj.userId ? true : false,
      user: userObj,
      onThreeDotTap: onUserPressed
    });
  };
  const handleLoadMore = () => {
    if (onNextPage) {
      onNextPage();
    }
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleTabChange = index => {
    setTabIndex(index);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: handleGoBack,
    style: styles.closeButton
  }, /*#__PURE__*/_react.default.createElement(_BackIcon.BackIcon, {
    color: theme.colors.base
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerText
  }, (0, _translate.default)('Member Detail')))), /*#__PURE__*/_react.default.createElement(_CustomTab.default, {
    tabName: [(0, _translate.default)('Members'), (0, _translate.default)('Moderators')],
    onTabChange: handleTabChange
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.inputWrap
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => queryAccounts(searchTerm)
  }, /*#__PURE__*/_react.default.createElement(_SearchIcon.SearchIcon, {
    color: theme.colors.base
  })), /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    style: styles.input,
    value: searchTerm,
    onChangeText: handleChange
  }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: clearButton
  }, /*#__PURE__*/_react.default.createElement(_CircleCloseIcon.CircleCloseIcon, {
    color: theme.colors.base
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: sectionedUserList,
    renderItem: renderItem,
    onEndReached: handleLoadMore,
    onEndReachedThreshold: 0.5,
    keyExtractor: item => item.userId
  }), /*#__PURE__*/_react.default.createElement(_MemberActionModal.default, {
    isVisible: actionModalVisible,
    setIsVisible: setActionModalVisible,
    userId: selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.userId,
    channelId: channelID,
    hasModeratorPermission: permission,
    isInModeratorTab: tabIndex === 2,
    isChannelModerator: isSelectedUserModerator
  }));
}
//# sourceMappingURL=MemberDetail.js.map