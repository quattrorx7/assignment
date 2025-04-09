import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IPost } from './Home.types';
import { FC } from 'react';
import { DataLoadWrapper } from '../../components';
import { PAGE_SIZE } from './Home.constants';

interface Props {
  isLoading: boolean;
  isProcessingPosts: boolean;
  isError: boolean;
  currentPage: number;
  posts: IPost[];
  processedPosts: IPost[];
  onLoadMore: () => void;
  onRefresh: () => void;
  getOnItemPressHander: (id?: number) => () => void;
}

const getItemRenderer =
  (getOnItemPressHander: (id?: number) => () => void) =>
  ({ item }: { item: IPost }) => {
    const onPress = getOnItemPressHander(item.id);
    return (
      <Pressable onPress={onPress} style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </Pressable>
    );
  };

const getFooterRenderer = (
  onLoadMore: () => void,
  isProcessingPosts: boolean,
  currentPage: number,
  posts: IPost[],
) =>
  isProcessingPosts ? (
    <ActivityIndicator color="black" />
  ) : currentPage * PAGE_SIZE < posts.length ? (
    <Button title="Load more" onPress={onLoadMore} />
  ) : null;

const keyExtractor = (item: IPost, index: number) => `${item?.id}_${index}`;

export const HomePresenter: FC<Props> = ({
  posts,
  isLoading,
  isError,
  onLoadMore,
  currentPage,
  isProcessingPosts,
  processedPosts,
  onRefresh,
  getOnItemPressHander,
}) => {
  const { top } = useSafeAreaInsets();

  const renderItem = getItemRenderer(getOnItemPressHander);
  const renderFooter = getFooterRenderer(
    onLoadMore,
    isProcessingPosts,
    currentPage,
    posts,
  );

  return (
    <DataLoadWrapper
      onRefresh={onRefresh}
      isLoading={isLoading}
      isError={isError}>
      <FlatList
        data={processedPosts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        contentContainerStyle={[
          styles.listContentContainer,
          { paddingTop: top },
        ]}
      />
    </DataLoadWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 12,
  },
  listContentContainer: {
    padding: 16,
  },
  itemContainer: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'black',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  body: {
    marginTop: 8,
    fontSize: 12,
  },
});
