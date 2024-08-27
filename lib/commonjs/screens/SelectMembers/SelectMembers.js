"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SelectMembers;
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = require("react-native-svg");
var _styles = require("./styles");
var _svgXmlList = require("../../svg/svg-xml-list");
var _translate = _interopRequireDefault(require("../../translate/translate"));
var _SelectedUserHorizontal = _interopRequireDefault(require("../../components/SelectedUserHorizontal"));
var _UserItem = _interopRequireDefault(require("../../components/UserItem"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function SelectMembers() {
  const [sectionedUserList, setSectionedUserList] = (0, _react.useState)([]);
  const [selectedUserList, setSelectedUserList] = (0, _react.useState)([]);
  const [usersObject, setUsersObject] = (0, _react.useState)();
  const [searchTerm, setSearchTerm] = (0, _react.useState)('');
  const {
    data: userArr = [],
    onNextPage
  } = usersObject ?? {};
  const queryAccounts = (text = '') => {
    _tsSdkReactNative.UserRepository.getUsers({
      displayName: text,
      limit: 15
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
  }, [searchTerm]);
  const onUserPressed = user => {
    const isIncluded = selectedUserList.some(item => item.userId === user.userId);
    if (isIncluded) {
      const removedUser = selectedUserList.filter(item => item.userId !== user.userId);
      setSelectedUserList(removedUser);
    } else {
      setSelectedUserList(prev => [...prev, user]);
    }
  };
  const renderItem = ({
    item
  }) => {
    const selectedUser = selectedUserList.some(user => user.userId === item.userId);
    const userObj = {
      userId: item.userId,
      displayName: item.displayName,
      avatarFileId: item.avatarFileId
    };
    return /*#__PURE__*/_react.default.createElement(_UserItem.default, {
      showThreeDot: false,
      user: userObj,
      isCheckmark: selectedUser,
      onPress: onUserPressed
    });
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
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.styles.header
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: _styles.styles.closeButton
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.SvgXml, {
    xml: _svgXmlList.closeIcon,
    width: "14",
    height: "14"
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.styles.headerTextContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: _styles.styles.headerText
  }, (0, _translate.default)('Select Member'))), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    disabled: selectedUserList.length === 0
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [selectedUserList.length > 0 ? _styles.styles.doneText : _styles.styles.disabledDone]
  }, (0, _translate.default)('Done')))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.styles.inputWrap
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => queryAccounts(searchTerm)
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.SvgXml, {
    xml: _svgXmlList.searchIcon,
    width: "20",
    height: "20"
  })), /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    style: _styles.styles.input,
    value: searchTerm,
    onChangeText: handleChange
  }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: clearButton
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.SvgXml, {
    xml: _svgXmlList.circleCloseIcon,
    width: "20",
    height: "20"
  }))), selectedUserList.length > 0 ? /*#__PURE__*/_react.default.createElement(_SelectedUserHorizontal.default, {
    users: selectedUserList,
    onDeleteUserPressed: onDeleteUserPressed
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: sectionedUserList,
    renderItem: renderItem,
    onEndReached: handleLoadMore,
    onEndReachedThreshold: 0.5,
    keyExtractor: item => item.userId
  }));
}
//# sourceMappingURL=SelectMembers.js.map