import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActionSheetIOS, Platform, TextInput } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useStyles } from './styles';
import DoneButton from '../../components/DoneButton';
import { updateAmityChannel } from '../../providers/channel-provider';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import LoadingImage from '../../components/LoadingImage';
import { useRoute } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraIcon } from '../../svg/CameraIcon';
import { AvatarIcon } from '../../svg/AvatarIcon';
import { useTheme } from 'react-native-paper';
import BackButton from '../../components/BackButton';
import recentChatSlice from '../../redux/slices/RecentChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import useGoBackIfMatchRole from '../../hooks/useGoBackIfMatchRole';
import useGoBackIfNotRelatedToChannel from '../../hooks/useGoBackIfNotRelatedToChannel';
import translate from '../../translate/translate';
export const EditChatRoomDetail = ({
  navigation
}) => {
  var _groupChat$displayNam;
  useGoBackIfMatchRole('vipUser');
  const styles = useStyles();
  const {
    apiRegion
  } = useAuth();
  const route = useRoute();
  const MAX_CHARACTER_COUNT = 100;
  const {
    channelId,
    groupChat
  } = route.params;
  useGoBackIfNotRelatedToChannel(channelId);
  const [displayName, setDisplayName] = useState(groupChat === null || groupChat === void 0 ? void 0 : groupChat.displayName);
  const [characterCount, setCharacterCount] = useState((groupChat === null || groupChat === void 0 || (_groupChat$displayNam = groupChat.displayName) === null || _groupChat$displayNam === void 0 ? void 0 : _groupChat$displayNam.length) ?? 0);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const [imageMultipleUri, setImageMultipleUri] = useState([]);
  const [uploadedFileId, setUploadedFileId] = useState();
  const theme = useTheme();
  const {
    channelList
  } = useSelector(state => state.recentChat);
  const {
    updateByChannelId
  } = recentChatSlice.actions;
  const dispatch = useDispatch();
  const onDonePressed = async () => {
    const currentChannel = channelList.find(item => item.chatId === channelId);
    currentChannel.avatarFileId = uploadedFileId;
    dispatch(updateByChannelId({
      channelId: channelId,
      updatedChannelData: currentChannel
    }));
    try {
      setShowLoadingIndicator(true);
      const result = await updateAmityChannel(channelId, uploadedFileId, displayName);
      if (result) {
        setShowLoadingIndicator(false);
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const pickCamera = async () => {
    const result = await launchCamera({
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
    const result = await launchImageLibrary({
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
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions({
        options: [translate('Cancel'), translate('Take Photo'), translate('Choose from Library')],
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
  return /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.topBarContainer,
    edges: ['top']
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.topBar
  }, /*#__PURE__*/React.createElement(BackButton, null), /*#__PURE__*/React.createElement(View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.headerText
  }, translate('Edit Chat Detail'))), /*#__PURE__*/React.createElement(DoneButton, {
    navigation: navigation,
    onDonePressed: onDonePressed
  }))), /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(LoadingOverlay, {
    isLoading: showLoadingIndicator,
    loadingText: "Loading..."
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.avatarContainer
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: handleAvatarPress
  }, imageMultipleUri.length > 0 ? /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(LoadingImage, {
    containerStyle: styles.uploadedImage,
    isShowSending: false,
    source: imageMultipleUri[0],
    onLoadFinish: handleOnFinishImage
  })) : groupChat !== null && groupChat !== void 0 && groupChat.avatarFileId ? /*#__PURE__*/React.createElement(Image, {
    style: styles.avatar,
    source: {
      uri: `https://api.${apiRegion}.amity.co/api/v3/files/${groupChat === null || groupChat === void 0 ? void 0 : groupChat.avatarFileId}/download`
    }
  }) : /*#__PURE__*/React.createElement(AvatarIcon, null)), /*#__PURE__*/React.createElement(View, {
    style: imageMultipleUri[0] ? styles.uploadedCameraIconContainer : styles.cameraIconContainer
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: handleAvatarPress
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.cameraIcon
  }, /*#__PURE__*/React.createElement(CameraIcon, {
    color: theme.colors.base,
    width: 16,
    height: 16
  }))))), /*#__PURE__*/React.createElement(View, {
    style: styles.displayNameContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.displayNameText
  }, translate('Group name')), /*#__PURE__*/React.createElement(View, {
    style: styles.characterCountContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.characterCountText
  }, `${characterCount}/${MAX_CHARACTER_COUNT}`))), /*#__PURE__*/React.createElement(TextInput, {
    style: styles.input,
    value: displayName,
    onChangeText: handleTextChange,
    maxLength: MAX_CHARACTER_COUNT,
    placeholder: translate('Enter your display name'),
    placeholderTextColor: "#a0a0a0"
  })));
};
//# sourceMappingURL=EditChatRoomDetail.js.map