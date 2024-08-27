import React, { type FC } from 'react';
import type { AuthContextInterface } from '../types/auth.interface';
import type { IAmityUIkitProvider } from './amity-ui-kit-provider';
export declare const AuthContext: React.Context<AuthContextInterface>;
export declare const AuthContextProvider: FC<Omit<IAmityUIkitProvider, 'roleConfig'>>;
export default AuthContextProvider;
//# sourceMappingURL=auth-provider.d.ts.map