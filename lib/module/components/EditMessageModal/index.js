import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Modal, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { closeIcon } from '../../svg/svg-xml-list';
import { styles } from './styles';
import { MessageRepository } from '@amityco/ts-sdk-react-native';
const EditMessageModal = ({
  visible,
  onClose,
  messageId,
  messageText,
  onFinishEdit
}) => {
  const [inputMessage, setInputMessage] = useState(messageText);
  useEffect(() => {
    setInputMessage(messageText);
  }, [messageText]);
  const updateMessage = async () => {
    const updatedMessage = {
      data: {
        text: inputMessage
      }
    };
    const {
      data: message
    } = await MessageRepository.updateMessage(messageId, updatedMessage);
    if (message) {
      onFinishEdit && onFinishEdit();
    }
  };
  return /*#__PURE__*/React.createElement(Modal, {
    visible: visible,
    animationType: "slide"
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.closeButton,
    onPress: onClose
  }, /*#__PURE__*/React.createElement(SvgXml, {
    xml: closeIcon,
    width: "17",
    height: "17"
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.headerText
  }, "Edit Message")), /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: updateMessage,
    style: styles.headerTextContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.headerText
  }, "Save"))), /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.AllInputWrap
  }, /*#__PURE__*/React.createElement(KeyboardAvoidingView, {
    behavior: Platform.OS === 'ios' ? 'padding' : 'height',
    keyboardVerticalOffset: Platform.select({
      ios: 100,
      android: 80
    }),
    style: styles.AllInputWrap
  }, /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(TextInput, {
    multiline: true,
    placeholder: "What's going on...",
    style: styles.textInput,
    value: inputMessage,
    onChangeText: text => setInputMessage(text)
  }))))));
};
export default EditMessageModal;
//# sourceMappingURL=index.js.map