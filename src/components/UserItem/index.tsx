import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useStyles } from './styles';
import RoundCheckbox from '../RoundCheckbox/index';
import type { UserInterface } from '../../types/user.interface';
import useAuth from '../../hooks/useAuth';
import { AvatarIcon } from '../../svg/AvatarIcon';
import { ThreeDotsIcon } from '../../svg/ThreeDotsIcon';
import { useTheme } from 'react-native-paper';
import type { MyMD3Theme } from '../../providers/amity-ui-kit-provider';
import translate from '../../translate/translate'
export default function UserItem({
  user,
  isCheckmark,
  showThreeDot,
  onPress,
  onThreeDotTap,
  isUserAccount,
  disabled,
}: {
  user: UserInterface;
  isCheckmark?: boolean | undefined;
  showThreeDot?: boolean | undefined;
  onPress?: (user: UserInterface) => void;
  onThreeDotTap?: (user: UserInterface) => void;
  isUserAccount?: boolean;
  disabled?: boolean;
}) {
  const theme = useTheme() as MyMD3Theme;
  const styles = useStyles();
  const { apiRegion } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const maxLength = 25;
  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (onPress) {
      onPress(user);
    }
  };

  const displayName = () => {
    if (user.displayName) {
      if (user.displayName!.length > maxLength) {
        return user.displayName!.substring(0, maxLength) + '..';
      }
      return user.displayName!;
    }
    return translate('Display name');
  };
  const avatarFileURL = (fileId: string) => {
    return `https://api.${apiRegion}.amity.co/api/v3/files/${fileId}/download?size=medium`;
  };

  const Container = ({ children }) => {
    if (disabled) return <View style={styles.listItem}>{children}</View>;

    return (
      <TouchableOpacity style={styles.listItem} onPress={handleToggle}>
        {children}
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <View style={styles.leftContainer}>
        {user?.avatarFileId ? (
          <Image
            style={styles.avatar}
            source={{ uri: avatarFileURL(user.avatarFileId) }}
          />
        ) : (
          <View style={styles.avatar}>
            <AvatarIcon />
          </View>
        )}
        <Text style={styles.itemText}>{displayName()}</Text>
      </View>
      {!isUserAccount && !showThreeDot
        ? !disabled && <RoundCheckbox isChecked={isCheckmark ?? false} />
        : !isUserAccount && (
            <TouchableOpacity
              style={styles.threedotsBtn}
              onPress={() => {
                if (onThreeDotTap) {
                  onThreeDotTap(user);
                }
              }}
            >
              <ThreeDotsIcon color={theme.colors.base} />
            </TouchableOpacity>
          )}
    </Container>
  );
}
