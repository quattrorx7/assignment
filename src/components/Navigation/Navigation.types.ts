import { PATHS } from './Navigation.constants';

export type RootStackParamList = {
  [PATHS.HOME_SCREEN]: undefined;
  [PATHS.DETAILS_SCREEN]: { postId?: number };
};
