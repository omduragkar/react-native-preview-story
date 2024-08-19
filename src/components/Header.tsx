import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import React from 'react';
import styles from '../Styled';
import PlayImage from '../assets/play.png';
import PauseImage from '../assets/pause.png';
import CrossImage from '../assets/white-cross.png';
import type { IHeaderProps } from '../types';

const Header: React.FC<IHeaderProps> = ({
  storyName,
  stories,
  currentStoryIndex,
  pausePlay,
  isPaused,
  onComplete,
  getProgressBarWidth,
  playPause,
  close,
  storyNameText = {},
  headerStyle = {},
}) => {
  const headerViewContainer: StyleProp<ViewStyle> = React.useMemo(() => {
    const style: ViewStyle = {
      justifyContent: storyName ? 'space-between' : 'flex-end',
    };
    return [styles.headerViewContainer, style];
  }, [storyName]);
  return (
    <View style={styles.headerContainer}>
      <View style={headerViewContainer}>
        {storyName && (
          <Text style={[styles.storyNameText, storyNameText]}>{storyName}</Text>
        )}
        <View style={styles.buttonContainer}>
          {playPause && (
            <TouchableOpacity onPress={() => pausePlay()}>
              <Image
                source={isPaused ? PlayImage : PauseImage}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
          {close && (
            <TouchableOpacity onPress={onComplete}>
              <Image source={CrossImage} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.progressBarContainer}>
        {stories.map((story: any, index: number) => (
          <View key={story.id} style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: getProgressBarWidth(index, currentStoryIndex),
                },
                headerStyle,
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Header;
