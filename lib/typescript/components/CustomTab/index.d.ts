import { type ReactElement } from 'react';
interface ICustomTab {
    onTabChange: (tabIndex: number) => any;
    tabName: string[];
}
declare const CustomTab: ({ tabName, onTabChange }: ICustomTab) => ReactElement;
export default CustomTab;
//# sourceMappingURL=index.d.ts.map