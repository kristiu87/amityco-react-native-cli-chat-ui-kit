"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _reactNative = require("react-native");
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: _reactNative.Platform.OS === 'android' ? 35 : 10 // Adjust for Android status bar
  },
  header: {
    paddingTop: _reactNative.Platform.OS === 'ios' ? 50 : 20,
    // Adjust for iOS notch
    zIndex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  closeButton: {
    padding: 3
  },
  headerTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'center'
  },
  communityText: {
    marginLeft: 12,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '600'
  },
  myCommunityText: {
    color: '#292B32',
    padding: 16,
    opacity: 0.4,
    fontSize: 17
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  rowContainerMyTimeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop: 26,
    paddingHorizontal: 16,
    borderBottomColor: '#EBECEF',
    borderBottomWidth: 1
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: '#D9E5FC'
  },
  categoryIcon: {
    alignItems: 'center'
  },
  LoadingIndicator: {
    paddingVertical: 20
  },
  headerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputWrap: {
    marginHorizontal: 16,
    backgroundColor: '#EBECEF',
    padding: 10,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  input: {
    flex: 1,
    marginHorizontal: 6
  },
  cancelBtn: {
    marginRight: 16
  },
  searchScrollList: {
    paddingBottom: 110,
    marginTop: 10
  },
  doneText: {
    color: '#1054DE'
  },
  disabledDone: {
    opacity: 0.5
  }
});
//# sourceMappingURL=styles.js.map