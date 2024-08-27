import translations from './translation.json';

const translate = (key: string): string => {
    const language = globalThis.Language
    const translation = translations[key];
    if (translation && translation[language]) {
        return translation[language];
    } else {
        return key;
    }
};

export default translate
