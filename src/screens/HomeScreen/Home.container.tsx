import { HomePresenter } from './Home.presenter';
import { useHomeData } from './Home.hooks';
import { useNavigation } from '@react-navigation/native';
import { PATHS } from '../../components/Navigation/Navigation.constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../components/Navigation/Navigation.types';

export const HomeContainer = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'DetailsScreen'>>();
  const {
    isLoading,
    posts,
    isError,
    isProcessingPosts,
    getPosts,
    currentPage,
    loadNextPage,
    processedPosts,
  } = useHomeData();

  const getOnItemPressHander = (id?: number) => () => {
    navigation.navigate(PATHS.DETAILS_SCREEN, { postId: id });
  };

  const onRefresh = () => {
    getPosts();
  };

  const onLoadMore = () => {
    loadNextPage(posts, currentPage);
  };

  return (
    <HomePresenter
      isError={isError}
      posts={posts}
      processedPosts={processedPosts}
      onLoadMore={onLoadMore}
      currentPage={currentPage}
      isLoading={isLoading}
      isProcessingPosts={isProcessingPosts}
      onRefresh={onRefresh}
      getOnItemPressHander={getOnItemPressHander}
    />
  );
};
