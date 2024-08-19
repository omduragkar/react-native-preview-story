import type { Animated } from 'react-native';

export interface IStoryProp {
  id: number;
  url?: string;
  type: 'image' | 'component';
  duration: number;
  storyId: number;
  isSeen: false;
  component?: React.ReactNode;
}
interface IHeaderCommonProps {
  storyName?: string;
  stories: IStoryProp[];
  close?: boolean;
  playPause?: boolean;
  storyNameText?: any;
  onComplete: () => void;
  headerStyle?: any;
}
export interface IStoryViewProp extends IHeaderCommonProps {
  visible?: boolean;
  imageStyle?: any;
  maxDuration?: number;
  renderHeaderComponent?: () => React.FC<IHeaderProps>;
  onChangePosition?: (position: number) => void;
  index?: number;
}
export interface IHeaderProps extends IHeaderCommonProps {
  currentStoryIndex: number;
  pausePlay: () => void;
  isPaused: boolean;
  getProgressBarWidth: (
    index: number,
    currentStoryIndex: number
  ) => '100%' | Animated.AnimatedInterpolation<string | number> | '0%';
  setCurrentStoryIndex?: React.Dispatch<React.SetStateAction<number>>;
}
export interface IContentViewProps {
  story: IStoryProp;
  imageStyle: any;
}
