import React from 'react';
import type { UserInterface } from '../../types/user.interface';
interface IModal {
    visible: boolean;
    userId?: string;
    initUserList?: UserInterface[];
    onClose?: () => void;
    onFinish?: (users: UserInterface[]) => void;
}
export type SelectUserList = {
    title: string;
    data: UserInterface[];
};
declare const AddMembersModal: ({ visible, onClose, onFinish, initUserList, }: IModal) => React.JSX.Element;
export default AddMembersModal;
//# sourceMappingURL=index.d.ts.map