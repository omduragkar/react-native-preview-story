import type { Animated } from 'react-native';

export interface IStoryProp {
  id: number;
  url?: string;
  type: 'image' | 'component';
  duration?: number;
  component?: React.ReactNode;
}
interface IHeaderCommonProps {
  storyName?: string;
  stories: IStoryProp[];
  close?: boolean;
  playPause?: boolean;
  storyNameText?: any;
  onComplete: () => void;
  headerStyle?: {
    progressColor?: string;
    cornerRadius?: number;
    progressBarBackground?: string;
    containerBackground?: string;
    progressBarHeight?: number;
    conatinerHeight?: string | number;
  };
}
export interface IStoryViewProp extends IHeaderCommonProps {
  visible: boolean;
  imageStyle?: any;
  maxDuration?: number;
  renderHeaderComponent?: (
    props: IHeaderProps
  ) => React.ReactNode | Element | null | any;
  onChangePosition?: (position: number) => void;
  index?: number;
  noPause?: boolean;
  noControls?: boolean;
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
  imageStyle: {
    height?: number;
    width?: number;
    scale?: number;
  };
}
