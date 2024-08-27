import React from 'react';
interface IModal {
    visible: boolean;
    onClose: () => void;
    onFinishEdit?: () => void;
    messageId: string;
    messageText: string;
}
declare const EditMessageModal: ({ visible, onClose, messageId, messageText, onFinishEdit }: IModal) => React.JSX.Element;
export default EditMessageModal;
//# sourceMappingURL=index.d.ts.map