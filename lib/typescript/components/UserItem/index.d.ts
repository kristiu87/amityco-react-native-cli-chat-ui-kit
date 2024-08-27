import React from 'react';
import type { UserInterface } from '../../types/user.interface';
export default function UserItem({ user, isCheckmark, showThreeDot, onPress, onThreeDotTap, isUserAccount, disabled, }: {
    user: UserInterface;
    isCheckmark?: boolean | undefined;
    showThreeDot?: boolean | undefined;
    onPress?: (user: UserInterface) => void;
    onThreeDotTap?: (user: UserInterface) => void;
    isUserAccount?: boolean;
    disabled?: boolean;
}): React.JSX.Element;
//# sourceMappingURL=index.d.ts.map