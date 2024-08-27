import React from "react";
import { TextInput } from 'react-native';
import { styles } from './styles';
export default function SearchBar({
  handleSearch
}) {
  return /*#__PURE__*/React.createElement(TextInput, {
    style: styles.searchBar
    // value={searchText}
    ,
    placeholder: "Search",
    onChangeText: handleSearch
  });
}
;
//# sourceMappingURL=index.js.map