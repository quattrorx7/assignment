import { DetailsPresenter } from './Details.presenter';
import { useDetailsData } from './Details.hooks';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../components/Navigation/Navigation.types';

export const DetailsContainer = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DetailsScreen'>>();

  const { isLoading, isError, post, setIsLoading, getPost } = useDetailsData(
    route?.params?.postId,
  );
  const onRefresh = () => {
    setIsLoading(true);
    getPost();
  };

  return (
    <DetailsPresenter
      onRefresh={onRefresh}
      isError={isError}
      post={post}
      isLoading={isLoading}
    />
  );
};
