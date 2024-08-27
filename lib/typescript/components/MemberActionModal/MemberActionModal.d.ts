import React from 'react';
interface IMemberActionModal {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    userId: string;
    channelId: string;
    hasModeratorPermission?: boolean;
    isInModeratorTab?: boolean;
    isChannelModerator?: boolean;
    onFinish?: () => void;
}
declare const _default: React.NamedExoticComponent<IMemberActionModal>;
export default _default;
//# sourceMappingURL=MemberActionModal.d.ts.map