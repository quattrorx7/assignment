import { runOnJS, runOnUI } from 'react-native-reanimated';

export const runDataProcessing = (
  title: string,
  onFinish: (transformed: string) => void,
) => {
  runOnUI(() => {
    'worklet';
    let str = title;
    for (let i = 0; i < 10000000; i++) {
      str = str.toUpperCase();
    }
    runOnJS(onFinish)(str);
  })();
};
