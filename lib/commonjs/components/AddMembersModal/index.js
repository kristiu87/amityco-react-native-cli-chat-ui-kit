"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _styles = require("./styles");
var _UserItem = _interopRequireDefault(require("../UserItem"));
var _ListSectionHeader = _interopRequireDefault(require("../ListSectionHeader"));
var _SelectedUserHorizontal = _interopRequireDefault(require("../SelectedUserHorizontal"));
var _CloseIcon = require("../../svg/CloseIcon");
var _SearchIcon = require("../../svg/SearchIcon");
var _CircleCloseIcon = require("../../svg/CircleCloseIcon");
var _reactNativePaper = require("react-native-paper");
var _useAuth = _interopRequireDefault(require("../../hooks/useAuth"));
var _translate = _interopRequireDefault(require("../../translate/translate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MAX_SELECTED_USER = 1;
const AddMembersModal = ({
  visible,
  onClose,
  onFinish,
  initUserList = []
}) => {
  const theme = (0, _reactNativePaper.useTheme)();
  const styles = (0, _styles.useStyles)();
  const [sectionedUserList, setSectionedUserList] = (0, _react.useState)(initUserList);
  const [selectedUserList, setSelectedUserList] = (0, _react.useState)(initUserList);
  const [usersObject, setUsersObject] = (0, _react.useState)();
  const [searchTerm, setSearchTerm] = (0, _react.useState)('');
  const [isShowSectionHeader, setIsShowSectionHeader] = (0, _react.useState)(false);
  const {
    client
  } = (0, _useAuth.default)();
  const {
    data: userArr = [],
    onNextPage
  } = usersObject ?? {};
  const canSelectUser = selectedUserList.length < MAX_SELECTED_USER;
  const queryAccounts = (text = '') => {
    _tsSdkReactNative.UserRepository.getUsers({
      displayName: text,
      limit: 20
    }, data => {
      setUsersObject(data);
    });
  };
  const handleChange = text => {
    setSearchTerm(text);
  };
  (0, _react.useEffect)(() => {
    if (searchTerm.length > 2) {
      queryAccounts(searchTerm);
    }
  }, [searchTerm]);
  const clearButton = () => {
    setSearchTerm('');
  };
  const createSectionGroup = () => {
    const sectionUserArr = userArr.map(item => {
      return {
        userId: item.userId,
        displayName: item.displayName,
        avatarFileId: item.avatarFileId
      };
    });
    setSectionedUserList(sectionUserArr);
  };
  (0, _react.useEffect)(() => {
    createSectionGroup();
  }, [userArr]);
  (0, _react.useEffect)(() => {
    if (searchTerm.length === 0) {
      queryAccounts();
    }
  }, [visible, searchTerm]);
  const renderSectionHeader = () => /*#__PURE__*/_react.default.createElement(_ListSectionHeader.default, {
    title: ''
  });
  const onUserPressed = user => {
    const isIncluded = selectedUserList.some(item => item.userId === user.userId);
    if (isIncluded) {
      const removedUser = selectedUserList.filter(item => item.userId !== user.userId);
      setSelectedUserList(removedUser);
    } else {
      if (!canSelectUser) return;
      setSelectedUserList(prev => [...prev, user]);
    }
  };
  const renderItem = ({
    item,
    index
  }) => {
    let isrenderheader = true;
    const isAlphabet = /^[A-Z]$/i.test(item.displayName[0]);
    const currentLetter = isAlphabet ? item.displayName.charAt(0).toUpperCase() : '#';
    const selectedUser = selectedUserList.some(user => user.userId === item.userId);
    const userObj = {
      userId: item.userId,
      displayName: item.displayName,
      avatarFileId: item.avatarFileId
    };
    const isIncluded = selectedUserList.some(user => user.userId === item.userId);
    const disabled = !canSelectUser && !isIncluded;
    if (index > 0 && sectionedUserList.length > 0) {
      const isPreviousletterAlphabet = /^[A-Z]$/i.test(sectionedUserList[index - 1].displayName[0]);
      const previousLetter = isPreviousletterAlphabet ? sectionedUserList[index - 1].displayName.charAt(0).toUpperCase() : '#';
      if (currentLetter === previousLetter) {
        isrenderheader = false;
      } else {
        isrenderheader = true;
      }
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.sectionItem
    }, isrenderheader && /*#__PURE__*/_react.default.createElement(_ListSectionHeader.default, {
      title: currentLetter
    }), /*#__PURE__*/_react.default.createElement(_UserItem.default, {
      isUserAccount: client.userId === userObj.userId ? true : false,
      showThreeDot: false,
      user: userObj,
      isCheckmark: selectedUser,
      onPress: onUserPressed,
      disabled: disabled
    }));
  };
  const flatListRef = (0, _react.useRef)(null);
  const handleScroll = event => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset >= 40) {
      setIsShowSectionHeader(true);
    } else {
      setIsShowSectionHeader(false);
    }
  };
  const handleOnClose = () => {
    setSelectedUserList(initUserList);
    onClose && onClose();
  };
  const handleLoadMore = () => {
    if (onNextPage) {
      onNextPage();
    }
  };
  const onDeleteUserPressed = user => {
    const removedUser = selectedUserList.filter(item => item !== user);
    setSelectedUserList(removedUser);
  };
  const onDone = () => {
    onFinish && onFinish(selectedUserList);
    setSelectedUserList([]);
    onClose && onClose();
  };
  const onBack = () => {
    onClose && onClose();
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    visible: visible,
    animationType: "slide",
    onRequestClose: onBack
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.closeButton,
    onPress: handleOnClose
  }, /*#__PURE__*/_react.default.createElement(_CloseIcon.CloseIcon, {
    color: theme.colors.base
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerText
  }, (0, _translate.default)('Select Member'))), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    disabled: selectedUserList.length === 0,
    onPress: onDone
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [selectedUserList.length > 0 ? styles.doneText : styles.disabledDone]
  }, (0, _translate.default)('Done')))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
  }))), selectedUserList.length > 0 ? /*#__PURE__*/_react.default.createElement(_SelectedUserHorizontal.default, {
    users: selectedUserList,
    onDeleteUserPressed: onDeleteUserPressed
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: sectionedUserList,
    renderItem: renderItem,
    onEndReached: handleLoadMore,
    onEndReachedThreshold: 0.5,
    keyExtractor: item => item.userId,
    ListHeaderComponent: isShowSectionHeader ? renderSectionHeader : /*#__PURE__*/_react.default.createElement(_reactNative.View, null),
    stickyHeaderIndices: [0],
    ref: flatListRef,
    onScroll: handleScroll
  })));
};
var _default = exports.default = AddMembersModal;
//# sourceMappingURL=index.js.map