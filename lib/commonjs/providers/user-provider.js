"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAmityUser = getAmityUser;
exports.groupUsers = groupUsers;
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
function groupUsers(users) {
  const groups = [];
  const sortedUsers = users.sort((a, b) => a.displayName.localeCompare(b.displayName));
  let currentChar = '';
  let currentGroup = [];
  sortedUsers.forEach(user => {
    const firstChar = user.displayName.charAt(0).toUpperCase();
    if (firstChar !== currentChar) {
      if (currentGroup.length > 0) {
        groups.push({
          title: currentChar,
          data: currentGroup
        });
      }
      currentChar = firstChar;
      currentGroup = [user];
    } else {
      currentGroup.push(user);
    }
  });
  if (currentGroup.length > 0) {
    groups.push({
      title: currentChar,
      data: currentGroup
    });
  }
  return groups;
}
async function getAmityUser(userId) {
  return await new Promise((resolve, reject) => {
    let userObject = {};
    const unsubscribe = _tsSdkReactNative.UserRepository.getUser(userId, value => {
      if (value) {
        userObject = value;
        resolve({
          userObject,
          unsubscribe
        });
      } else {
        reject(value.error);
      }
    });
  });
}
//# sourceMappingURL=user-provider.js.map