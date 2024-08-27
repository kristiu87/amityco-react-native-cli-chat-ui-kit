import { UserRepository } from '@amityco/ts-sdk-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Text, Modal, TextInput, FlatList } from 'react-native';
import { useStyles } from './styles';
import UserItem from '../UserItem';
import SectionHeader from '../ListSectionHeader';
import SelectedUserHorizontal from '../SelectedUserHorizontal';
import { CloseIcon } from '../../svg/CloseIcon';
import { SearchIcon } from '../../svg/SearchIcon';
import { CircleCloseIcon } from '../../svg/CircleCloseIcon';
import { useTheme } from 'react-native-paper';
import useAuth from '../../hooks/useAuth';
import translate from '../../translate/translate';
const MAX_SELECTED_USER = 1;
const AddMembersModal = ({
  visible,
  onClose,
  onFinish,
  initUserList = []
}) => {
  const theme = useTheme();
  const styles = useStyles();
  const [sectionedUserList, setSectionedUserList] = useState(initUserList);
  const [selectedUserList, setSelectedUserList] = useState(initUserList);
  const [usersObject, setUsersObject] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [isShowSectionHeader, setIsShowSectionHeader] = useState(false);
  const {
    client
  } = useAuth();
  const {
    data: userArr = [],
    onNextPage
  } = usersObject ?? {};
  const canSelectUser = selectedUserList.length < MAX_SELECTED_USER;
  const queryAccounts = (text = '') => {
    UserRepository.getUsers({
      displayName: text,
      limit: 20
    }, data => {
      setUsersObject(data);
    });
  };
  const handleChange = text => {
    setSearchTerm(text);
  };
  useEffect(() => {
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
  useEffect(() => {
    createSectionGroup();
  }, [userArr]);
  useEffect(() => {
    if (searchTerm.length === 0) {
      queryAccounts();
    }
  }, [visible, searchTerm]);
  const renderSectionHeader = () => /*#__PURE__*/React.createElement(SectionHeader, {
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
    return /*#__PURE__*/React.createElement(View, {
      style: styles.sectionItem
    }, isrenderheader && /*#__PURE__*/React.createElement(SectionHeader, {
      title: currentLetter
    }), /*#__PURE__*/React.createElement(UserItem, {
      isUserAccount: client.userId === userObj.userId ? true : false,
      showThreeDot: false,
      user: userObj,
      isCheckmark: selectedUser,
      onPress: onUserPressed,
      disabled: disabled
    }));
  };
  const flatListRef = useRef(null);
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
  return /*#__PURE__*/React.createElement(Modal, {
    visible: visible,
    animationType: "slide",
    onRequestClose: onBack
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.closeButton,
    onPress: handleOnClose
  }, /*#__PURE__*/React.createElement(CloseIcon, {
    color: theme.colors.base
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.headerText
  }, translate('Select Member'))), /*#__PURE__*/React.createElement(TouchableOpacity, {
    disabled: selectedUserList.length === 0,
    onPress: onDone
  }, /*#__PURE__*/React.createElement(Text, {
    style: [selectedUserList.length > 0 ? styles.doneText : styles.disabledDone]
  }, translate('Done')))), /*#__PURE__*/React.createElement(View, {
    style: styles.inputWrap
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => queryAccounts(searchTerm)
  }, /*#__PURE__*/React.createElement(SearchIcon, {
    color: theme.colors.base
  })), /*#__PURE__*/React.createElement(TextInput, {
    style: styles.input,
    value: searchTerm,
    onChangeText: handleChange
  }), /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: clearButton
  }, /*#__PURE__*/React.createElement(CircleCloseIcon, {
    color: theme.colors.base
  }))), selectedUserList.length > 0 ? /*#__PURE__*/React.createElement(SelectedUserHorizontal, {
    users: selectedUserList,
    onDeleteUserPressed: onDeleteUserPressed
  }) : /*#__PURE__*/React.createElement(View, null), /*#__PURE__*/React.createElement(FlatList, {
    data: sectionedUserList,
    renderItem: renderItem,
    onEndReached: handleLoadMore,
    onEndReachedThreshold: 0.5,
    keyExtractor: item => item.userId,
    ListHeaderComponent: isShowSectionHeader ? renderSectionHeader : /*#__PURE__*/React.createElement(View, null),
    stickyHeaderIndices: [0],
    ref: flatListRef,
    onScroll: handleScroll
  })));
};
export default AddMembersModal;
//# sourceMappingURL=index.js.map