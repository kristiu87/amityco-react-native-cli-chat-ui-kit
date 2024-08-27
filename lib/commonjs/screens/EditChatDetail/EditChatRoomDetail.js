"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditChatRoomDetail = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeImagePicker = require("react-native-image-picker");
var _styles = require("./styles");
var _DoneButton = _interopRequireDefault(require("../../components/DoneButton"));
var _channelProvider = require("../../providers/channel-provider");
var _LoadingOverlay = require("../../components/LoadingOverlay");
var _LoadingImage = _interopRequireDefault(require("../../components/LoadingImage"));
var _native = require("@react-navigation/native");
var _useAuth = _interopRequireDefault(require("../../hooks/useAuth"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _CameraIcon = require("../../svg/CameraIcon");
var _AvatarIcon = require("../../svg/AvatarIcon");
var _reactNativePaper = require("react-native-paper");
var _BackButton = _interopRequireDefault(require("../../components/BackButton"));
var _RecentChatSlice = _interopRequireDefault(require("../../redux/slices/RecentChatSlice"));
var _reactRedux = require("react-redux");
var _useGoBackIfMatchRole = _interopRequireDefault(require("../../hooks/useGoBackIfMatchRole"));
var _useGoBackIfNotRelatedToChannel = _interopRequireDefault(require("../../hooks/useGoBackIfNotRelatedToChannel"));
var _translate = _interopRequireDefault(require("../../translate/translate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const EditChatRoomDetail = ({
  navigation
}) => {
  var _groupChat$displayNam;
  (0, _useGoBackIfMatchRole.default)('vipUser');
  const styles = (0, _styles.useStyles)();
  const {
    apiRegion
  } = (0, _useAuth.default)();
  const route = (0, _native.useRoute)();
  const MAX_CHARACTER_COUNT = 100;
  const {
    channelId,
    groupChat
  } = route.params;
  (0, _useGoBackIfNotRelatedToChannel.default)(channelId);
  const [displayName, setDisplayName] = (0, _react.useState)(groupChat === null || groupChat === void 0 ? void 0 : groupChat.displayName);
  const [characterCount, setCharacterCount] = (0, _react.useState)((groupChat === null || groupChat === void 0 || (_groupChat$displayNam = groupChat.displayName) === null || _groupChat$displayNam === void 0 ? void 0 : _groupChat$displayNam.length) ?? 0);
  const [showLoadingIndicator, setShowLoadingIndicator] = (0, _react.useState)(false);
  const [imageMultipleUri, setImageMultipleUri] = (0, _react.useState)([]);
  const [uploadedFileId, setUploadedFileId] = (0, _react.useState)();
  const theme = (0, _reactNativePaper.useTheme)();
  const {
    channelList
  } = (0, _reactRedux.useSelector)(state => state.recentChat);
  const {
    updateByChannelId
  } = _RecentChatSlice.default.actions;
  const dispatch = (0, _reactRedux.useDispatch)();
  const onDonePressed = async () => {
    const currentChannel = channelList.find(item => item.chatId === channelId);
    currentChannel.avatarFileId = uploadedFileId;
    dispatch(updateByChannelId({
      channelId: channelId,
      updatedChannelData: currentChannel
    }));
    try {
      setShowLoadingIndicator(true);
      const result = await (0, _channelProvider.updateAmityChannel)(channelId, uploadedFileId, displayName);
      if (result) {
        setShowLoadingIndicator(false);
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const pickCamera = async () => {
    const result = await (0, _reactNativeImagePicker.launchCamera)({
      mediaType: 'photo',
      quality: 1
    });
    if (result.assets && result.assets.length > 0 && result.assets[0] !== null && result.assets[0]) {
      const imagesArr = [...imageMultipleUri];
      imagesArr.push(result.assets[0].uri);
      setImageMultipleUri(imagesArr);
    }
  };
  const pickImage = async () => {
    const result = await (0, _reactNativeImagePicker.launchImageLibrary)({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 10
    });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const selectedImages = result.assets;
      const imageUriArr = selectedImages.map(item => item.uri);
      const imagesArr = [...imageMultipleUri];
      const totalImages = imagesArr.concat(imageUriArr);
      setImageMultipleUri(totalImages);
    }
  };
  const handleAvatarPress = () => {
    if (_reactNative.Platform.OS === 'ios') {
      _reactNative.ActionSheetIOS.showActionSheetWithOptions({
        options: [(0, _translate.default)('Cancel'), (0, _translate.default)('Take Photo'), (0, _translate.default)('Choose from Library')],
        cancelButtonIndex: 0
      }, buttonIndex => {
        if (buttonIndex === 1) {
          pickCamera();
        } else if (buttonIndex === 2) {
          pickImage();
        }
      });
    } else {
      pickImage();
    }
  };
  const handleTextChange = text => {
    setDisplayName(text);
    setCharacterCount(text.length);
  };
  const handleOnFinishImage = async fileId => {
    setUploadedFileId(fileId);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.topBarContainer,
    edges: ['top']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.topBar
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerText
  }, (0, _translate.default)('Edit Chat Detail'))), /*#__PURE__*/_react.default.createElement(_DoneButton.default, {
    navigation: navigation,
    onDonePressed: onDonePressed
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_LoadingOverlay.LoadingOverlay, {
    isLoading: showLoadingIndicator,
    loadingText: "Loading..."
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.avatarContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: handleAvatarPress
  }, imageMultipleUri.length > 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_LoadingImage.default, {
    containerStyle: styles.uploadedImage,
    isShowSending: false,
    source: imageMultipleUri[0],
    onLoadFinish: handleOnFinishImage
  })) : groupChat !== null && groupChat !== void 0 && groupChat.avatarFileId ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.avatar,
    source: {
      uri: `https://api.${apiRegion}.amity.co/api/v3/files/${groupChat === null || groupChat === void 0 ? void 0 : groupChat.avatarFileId}/download`
    }
  }) : /*#__PURE__*/_react.default.createElement(_AvatarIcon.AvatarIcon, null)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: imageMultipleUri[0] ? styles.uploadedCameraIconContainer : styles.cameraIconContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: handleAvatarPress
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.cameraIcon
  }, /*#__PURE__*/_react.default.createElement(_CameraIcon.CameraIcon, {
    color: theme.colors.base,
    width: 16,
    height: 16
  }))))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.displayNameContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.displayNameText
  }, (0, _translate.default)('Group name')), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.characterCountContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.characterCountText
  }, `${characterCount}/${MAX_CHARACTER_COUNT}`))), /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    style: styles.input,
    value: displayName,
    onChangeText: handleTextChange,
    maxLength: MAX_CHARACTER_COUNT,
    placeholder: (0, _translate.default)('Enter your display name'),
    placeholderTextColor: "#a0a0a0"
  })));
};
exports.EditChatRoomDetail = EditChatRoomDetail;
//# sourceMappingURL=EditChatRoomDetail.js.map