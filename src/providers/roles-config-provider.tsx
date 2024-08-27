import { createContext } from 'react';

export interface RolesConfig {
  vipUserRoleId: string;
  customerServiceRoleId: string;
}

export const RolesConfigContext = createContext<RolesConfig>(null);
