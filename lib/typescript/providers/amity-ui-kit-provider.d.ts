import * as React from 'react';
import { type MD3Theme } from 'react-native-paper';
import { RolesConfig } from './roles-config-provider';
export interface IAmityUIkitProvider {
    userId: string;
    displayName: string;
    apiKey: string;
    roleConfig: RolesConfig;
    children: React.ReactNode;
    apiRegion?: string;
    language?: string;
    apiEndpoint?: string;
    theme?: CustomColors;
    darkMode?: boolean;
    authToken?: string;
}
interface CustomColors {
    primary?: string;
    secondary?: string;
    background?: string;
    border?: string;
    base?: string;
    baseShade1?: string;
    baseShade2?: string;
    baseShade3?: string;
    chatTopBar?: string;
    screenBackground?: string;
    chatBubbles?: {
        userBubble: string;
        friendBubble: string;
    };
    chatMessageTexts?: {
        userMessageText: string;
        friendMessageText: string;
    };
}
export interface MyMD3Theme extends MD3Theme {
    colors: MD3Theme['colors'] & CustomColors;
}
export default function AmityUiKitProvider({ userId, displayName, apiKey, apiRegion, language, apiEndpoint, children, theme, authToken, roleConfig, darkMode, }: IAmityUIkitProvider): React.JSX.Element;
export {};
//# sourceMappingURL=amity-ui-kit-provider.d.ts.map