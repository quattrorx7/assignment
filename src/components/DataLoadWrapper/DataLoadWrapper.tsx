import { FC, ReactNode } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { styles } from './DataLoadWrapper.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  isLoading: boolean;
  isError: boolean;
  children: ReactNode;
  onRefresh: () => void;
}

export const DataLoadWrapper: FC<Props> = ({
  isLoading,
  isError,
  children,
  onRefresh,
}) => {
  const { top, bottom } = useSafeAreaInsets();
  if (isLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator color="black" />
      </View>
    );

  if (isError)
    return (
      <View
        style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
        <Text style={styles.errorText}>Something went wrong...</Text>
        <Button title="Refresh" onPress={onRefresh} />
      </View>
    );

  return children;
};
