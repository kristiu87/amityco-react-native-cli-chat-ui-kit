function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Text } from 'react-native';
import styles from './styles';
const CustomText = ({
  children,
  style,
  numberOfLines,
  ellipsizeMode = 'tail'
}, props) => {
  return /*#__PURE__*/React.createElement(Text, _extends({}, props, {
    style: [styles.text, style],
    numberOfLines: numberOfLines,
    ellipsizeMode: ellipsizeMode
  }), children);
};
export default CustomText;
//# sourceMappingURL=index.js.map