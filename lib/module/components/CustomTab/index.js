import React, { useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { useStyles } from './styles';
const CustomTab = ({
  tabName,
  onTabChange
}) => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState(1);
  const [indicatorAnim] = useState(new Animated.Value(0));
  const [tabOneWidth, setTabOneWidth] = useState(0);
  const [tabTwoWidth, setTabTwoWidth] = useState(0);
  const handleTabPress = tabIndex => {
    setActiveTab(tabIndex);
    onTabChange && onTabChange(tabIndex);
    Animated.timing(indicatorAnim, {
      toValue: tabIndex,
      duration: 100,
      useNativeDriver: true
    }).start();
  };
  const getIndicatorPosition = () => {
    const tabWidth = tabOneWidth;
    const translateX = indicatorAnim.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [8, 12, tabWidth + 12]
    });
    return {
      transform: [{
        translateX
      }]
    };
  };
  const getLayoutTabOneWidth = event => {
    var {
      width
    } = event.nativeEvent.layout;
    setTabOneWidth(width);
  };
  const getLayoutTabTwoWidth = event => {
    var {
      width
    } = event.nativeEvent.layout;
    setTabTwoWidth(width);
  };
  const dynamicWidthStyle = {
    width: activeTab === 1 ? tabOneWidth - 20 : tabTwoWidth - 20
  };
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onLayout: getLayoutTabOneWidth,
    onPress: () => handleTabPress(1)
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.tabText, activeTab === 1 && styles.activeTabText]
  }, tabName[0])), /*#__PURE__*/React.createElement(TouchableOpacity, {
    onLayout: getLayoutTabTwoWidth,
    onPress: () => handleTabPress(2)
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.tabText, activeTab === 2 && styles.activeTabText]
  }, tabName[1])), /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.indicator, getIndicatorPosition(), dynamicWidthStyle]
  }));
};
export default CustomTab;
//# sourceMappingURL=index.js.map