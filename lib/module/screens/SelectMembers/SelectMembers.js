import { UserRepository } from '@amityco/ts-sdk-react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, FlatList } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import { circleCloseIcon, closeIcon, searchIcon } from '../../svg/svg-xml-list';
import translate from '../../translate/translate';
import SelectedUserHorizontal from '../../components/SelectedUserHorizontal';
import UserItem from '../../components/UserItem';
export default function SelectMembers() {
  const [sectionedUserList, setSectionedUserList] = useState([]);
  const [selectedUserList, setSelectedUserList] = useState([]);
  const [usersObject, setUsersObject] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const {
    data: userArr = [],
    onNextPage
  } = usersObject ?? {};
  const queryAccounts = (text = '') => {
    UserRepository.getUsers({
      displayName: text,
      limit: 15
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
    return /*#__PURE__*/React.createElement(UserItem, {
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
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.closeButton
  }, /*#__PURE__*/React.createElement(SvgXml, {
    xml: closeIcon,
    width: "14",
    height: "14"
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.headerText
  }, translate('Select Member'))), /*#__PURE__*/React.createElement(TouchableOpacity, {
    disabled: selectedUserList.length === 0
  }, /*#__PURE__*/React.createElement(Text, {
    style: [selectedUserList.length > 0 ? styles.doneText : styles.disabledDone]
  }, translate('Done')))), /*#__PURE__*/React.createElement(View, {
    style: styles.inputWrap
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => queryAccounts(searchTerm)
  }, /*#__PURE__*/React.createElement(SvgXml, {
    xml: searchIcon,
    width: "20",
    height: "20"
  })), /*#__PURE__*/React.createElement(TextInput, {
    style: styles.input,
    value: searchTerm,
    onChangeText: handleChange
  }), /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: clearButton
  }, /*#__PURE__*/React.createElement(SvgXml, {
    xml: circleCloseIcon,
    width: "20",
    height: "20"
  }))), selectedUserList.length > 0 ? /*#__PURE__*/React.createElement(SelectedUserHorizontal, {
    users: selectedUserList,
    onDeleteUserPressed: onDeleteUserPressed
  }) : /*#__PURE__*/React.createElement(View, null), /*#__PURE__*/React.createElement(FlatList, {
    data: sectionedUserList,
    renderItem: renderItem,
    onEndReached: handleLoadMore,
    onEndReachedThreshold: 0.5,
    keyExtractor: item => item.userId
  }));
}
//# sourceMappingURL=SelectMembers.js.map