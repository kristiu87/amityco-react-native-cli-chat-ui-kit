"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAmityChannel = createAmityChannel;
exports.leaveAmityChannel = leaveAmityChannel;
exports.updateAmityChannel = updateAmityChannel;
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
var _userProvider = require("./user-provider");
var _reactNative = require("react-native");
async function createAmityChannel(currentUserID, users) {
  return await new Promise(async (resolve, reject) => {
    if (users.length < 1) {
      return reject(new Error('Insufficient member count'));
    }
    let channelType = users.length > 1 ? 'community' : 'conversation';
    let userIds = [currentUserID];
    const {
      userObject
    } = await (0, _userProvider.getAmityUser)(currentUserID);
    let displayName = userObject.data.displayName + ', ';
    displayName += users.map(user => user.displayName).join(', ');
    if (displayName.length > 100) {
      displayName = displayName.substring(0, 97) + '...';
    }
    userIds.push(...users.map(user => user.userId));
    const param = {
      displayName: displayName,
      type: channelType,
      userIds: userIds
    };
    const {
      data: channel
    } = await _tsSdkReactNative.ChannelRepository.createChannel(param);
    console.log('param: ', param);
    if (channel) {
      resolve(channel);
    } else {
      reject('Create Channel unsuccessful');
    }
  });
}
async function leaveAmityChannel(channelID) {
  return await new Promise(async (resolve, reject) => {
    try {
      const didLeaveChannel = await _tsSdkReactNative.ChannelRepository.leaveChannel(channelID);
      if (didLeaveChannel) {
        resolve(true);
      }
    } catch (error) {
      _reactNative.Alert.alert('Unable to leave channel due to ' + error, '', []);
      reject(new Error('Unable to leave channel ' + error));
    }
  });
}
async function updateAmityChannel(channelID, fileId, displayName) {
  let option = {};
  return await new Promise(async (resolve, reject) => {
    if (fileId && !displayName) {
      option = {
        avatarFileId: fileId
      };
    } else if (!fileId && displayName) {
      option = {
        displayName: displayName
      };
    } else if (fileId && displayName) {
      option = {
        displayName: displayName,
        avatarFileId: fileId
      };
    } else {
      return reject(new Error('Display name and image path is missing' + fileId + ' --- ' + displayName));
    }
    try {
      const {
        data
      } = await _tsSdkReactNative.ChannelRepository.updateChannel(channelID, option);
      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(new Error('Unable to create channel ' + error));
    }
  });
}
//# sourceMappingURL=channel-provider.js.map