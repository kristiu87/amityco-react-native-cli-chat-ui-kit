import { ChannelRepository } from '@amityco/ts-sdk-react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, FlatList } from 'react-native';
import { useStyles } from './styles';
import UserItem from '../../components/UserItem';
import CustomTab from '../../components/CustomTab';
import { SearchIcon } from '../../svg/SearchIcon';
import { CircleCloseIcon } from '../../svg/CircleCloseIcon';
import { BackIcon } from '../../svg/BackIcon';
import { useTheme } from 'react-native-paper';
import MemberActionModal from '../../components/MemberActionModal/MemberActionModal';
import useAuth from '../../hooks/useAuth';
import { useChannelPermission } from '../../hooks/useChannelPermission';
import useGoBackIfMatchRole from '../../hooks/useGoBackIfMatchRole';
import useGoBackIfNotRelatedToChannel from '../../hooks/useGoBackIfNotRelatedToChannel';
import translate from '../../translate/translate';
export default function MemberDetail({
  route,
  navigation
}) {
  useGoBackIfMatchRole('vipUser');
  const styles = useStyles();
  const {
    client
  } = useAuth();
  const {
    channelID
  } = route.params;
  useGoBackIfNotRelatedToChannel(channelID);
  const permission = useChannelPermission(channelID);
  const [sectionedUserList, setSectionedUserList] = useState([]);
  const [usersObject, setUsersObject] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [tabIndex, setTabIndex] = useState(1);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [isSelectedUserModerator, setIsSelectedUserModerator] = useState(false);
  let {
    data: userArr = [],
    onNextPage
  } = usersObject ?? {};
  const theme = useTheme();
  const queryAccounts = (text = '', roles) => {
    ChannelRepository.Membership.getMembers({
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
  useEffect(() => {
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
  useEffect(() => {
    createUserList();
  }, [userArr]);
  useEffect(() => {
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
    return /*#__PURE__*/React.createElement(UserItem, {
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
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: handleGoBack,
    style: styles.closeButton
  }, /*#__PURE__*/React.createElement(BackIcon, {
    color: theme.colors.base
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.headerText
  }, translate('Member Detail')))), /*#__PURE__*/React.createElement(CustomTab, {
    tabName: [translate('Members'), translate('Moderators')],
    onTabChange: handleTabChange
  }), /*#__PURE__*/React.createElement(View, {
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
  }))), /*#__PURE__*/React.createElement(FlatList, {
    data: sectionedUserList,
    renderItem: renderItem,
    onEndReached: handleLoadMore,
    onEndReachedThreshold: 0.5,
    keyExtractor: item => item.userId
  }), /*#__PURE__*/React.createElement(MemberActionModal, {
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