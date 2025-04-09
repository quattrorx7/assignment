import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DataLoadWrapper } from '../../components';
import { IPost } from '../HomeScreen/Home.types';

interface Props {
  isLoading: boolean;
  isError: boolean;
  post: IPost | null;
  onRefresh: () => void;
}

export const DetailsPresenter: FC<Props> = ({
  isLoading,
  isError,
  post,
  onRefresh,
}) => {
  const { top } = useSafeAreaInsets();

  return (
    <DataLoadWrapper
      onRefresh={onRefresh}
      isLoading={isLoading}
      isError={isError}>
      <View style={[styles.container, { paddingTop: top }]}>
        <Text>{post?.body}</Text>
      </View>
    </DataLoadWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
