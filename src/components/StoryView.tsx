import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  Pressable,
  SafeAreaView,
  View,
  type GestureResponderEvent,
} from 'react-native';
import styles from '../Styled';
import type { IStoryViewProp } from '../types';
import Header from './Header';
import ContentView from './ContentView';

const { width } = Dimensions.get('window');

const StoryView: React.FC<IStoryViewProp> = ({
  onComplete,
  stories,
  visible,
  imageStyle,
  maxDuration = 3,
  renderHeaderComponent = null,
  storyName = '',
  onChangePosition,
  index,
  close = true,
  playPause = true,
  storyNameText = {},
  headerStyle = {
    cornerRadius: 10,
    progressColor: 'orange',
    progressBarHeight: 7,
    progressBarBackground: 'white',
  },
  noPause = false,
  noControls = false,
  nativeDriver = false,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(index || 0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pausedProgress = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const isCompletedRef = useRef(false);

  const currentStory = React.useMemo(
    () => stories[currentStoryIndex],
    [currentStoryIndex, stories]
  );
  const maxDurationPerStory = React.useMemo(
    () => currentStory?.duration || maxDuration,
    [currentStory, maxDuration]
  );
  const [wentBack, setWentBack] = useState(0);
  let onClose = useCallback(() => {
    if (!isCompletedRef.current) {
      isCompletedRef.current = true;
      onComplete();
      return;
    }
  }, [onComplete]);
  useEffect(() => {
    const backAction = () => {
      if (visible) {
        onClose();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [visible, onClose]);

  const goToNextStory = useCallback(() => {
    if (currentStoryIndex < stories.length - 1) {
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 3,
        useNativeDriver: nativeDriver,
      }).start(() => {
        pausedProgress.current = 0;
        setCurrentStoryIndex(currentStoryIndex + 1);
        progressAnim.setValue(0);
        onChangePosition && onChangePosition(currentStoryIndex + 1);
      });
    } else {
      setWentBack(0);
      onClose();
      setCurrentStoryIndex(0);
      onChangePosition && onChangePosition(0);
    }
  }, [
    currentStoryIndex,
    stories,
    progressAnim,
    onChangePosition,
    onClose,
    nativeDriver,
  ]);

  const runProgressAnimation = useCallback(() => {
    // this will run the animations at the top for the story
    progressAnim.setValue(pausedProgress.current); //set the value of the progress of the story
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: (1 - pausedProgress.current) * maxDurationPerStory * 1000, //for how long each story currently 6 seconds
      useNativeDriver: nativeDriver,
    }).start(({ finished }) => {
      if (finished) {
        goToNextStory(); //once finished goes to nextStory()
      }
    });
  }, [maxDurationPerStory, progressAnim, goToNextStory, nativeDriver]);
  const getProgressBarWidth = (storyIndex: number, currentIndex: number) => {
    if (currentIndex > storyIndex) {
      return '100%';
    } // this is when the Story has been viewed
    if (currentIndex === storyIndex) {
      return progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'], // this is when the story is being viewed
      });
    }
    return '0%'; // this is when the Story has not been viewed yet
  };

  const goToPreviousStory = () => {
    if (isPaused) {
      setIsPaused(false);
    }
    pausedProgress.current = 0;
    progressAnim.setValue(0);
    if (currentStoryIndex === 0) {
      setWentBack(wentBack + 1);
      runProgressAnimation();
    } else {
      setCurrentStoryIndex(currentStoryIndex - 1);
      onChangePosition && onChangePosition(currentStoryIndex - 1);
    }
  };
  useEffect(() => {
    if (index) {
      setCurrentStoryIndex(index);
    }
  }, [index]);

  const handlePressIn = () => {
    //for pause if user holds the screen
    setIsPaused(true);
  };

  const handlePressOut = () => {
    //for pause if user releases the holded screen
    setIsPaused(false);
  };

  const handleScreenTouch = (evt: GestureResponderEvent) => {
    //this function takes the width and decided where the click was pressed if left or right
    if (noControls) return;
    const touchX = evt?.nativeEvent?.locationX;
    if (touchX < width / 2) {
      goToPreviousStory();
    } else {
      goToNextStory();
    }
  };

  const pausePlay = () => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
  };

  useEffect(() => {
    if (!isPaused) {
      runProgressAnimation();
    } else {
      progressAnim.stopAnimation((value) => {
        pausedProgress.current = value;
      });
    }
    return () => {
      progressAnim.stopAnimation();
    };
  }, [currentStoryIndex, isPaused, progressAnim, runProgressAnimation]);

  return visible ? (
    <SafeAreaView style={styles.safeArea}>
      <Pressable
        onPress={handleScreenTouch}
        {
          /*this is for pause if user holds the screen*/
          ...(noPause || noControls
            ? {}
            : { onLongPress: handlePressIn, onPressOut: handlePressOut })
        }
        style={({ pressed }) => [
          {
            opacity: pressed && !noControls ? 0.9 : 1, //when clicked shows the user screen a little dimmed for feedback
          },
          styles.container,
        ]}
      >
        <View style={styles.container}>
          <SafeAreaView style={styles.topBarContainer}>
            <>
              {renderHeaderComponent ? (
                renderHeaderComponent({
                  getProgressBarWidth,
                  storyName,
                  stories,
                  currentStoryIndex,
                  pausePlay,
                  isPaused,
                  onComplete: onClose,
                  close,
                  playPause,
                  storyNameText,
                  headerStyle,
                })
              ) : (
                <Header
                  getProgressBarWidth={getProgressBarWidth}
                  storyName={storyName}
                  stories={stories}
                  currentStoryIndex={currentStoryIndex}
                  pausePlay={pausePlay}
                  isPaused={isPaused}
                  onComplete={onClose}
                  close={!noControls ? close : false}
                  playPause={!noControls ? playPause : false}
                  storyNameText={storyNameText}
                  headerStyle={headerStyle}
                />
              )}
            </>
          </SafeAreaView>
          <View style={styles.imageContainer}>
            {currentStory?.type && (
              <ContentView story={currentStory} imageStyle={imageStyle} />
            )}
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  ) : null;
};

export default StoryView;
