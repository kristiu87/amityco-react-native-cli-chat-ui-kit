import translations from './translation.json';
const translate = key => {
  const language = globalThis.Language;
  const translation = translations[key];
  if (translation && translation[language]) {
    return translation[language];
  } else {
    return key;
  }
};
export default translate;
//# sourceMappingURL=translate.js.map