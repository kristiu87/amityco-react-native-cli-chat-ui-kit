import type { UserInterface } from '../types/user.interface';
export declare function createAmityChannel(currentUserID: string, users: UserInterface[]): Promise<Amity.Channel>;
export declare function leaveAmityChannel(channelID: string): Promise<boolean | undefined>;
export declare function updateAmityChannel(channelID: string, fileId: string, displayName: string | undefined): Promise<Amity.InternalChannel<any>>;
//# sourceMappingURL=channel-provider.d.ts.map