import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  View,
  type GestureResponderEvent,
} from "react-native";
import styles from "../Styled";
import Header from "./Header";
type IStoryProp = {
  id: number;
  url: string;
  type: "image";
  duration: number;
  storyId: number;
  isSeen: false;
};
type IStoryViewProp = {
  onComplete: () => void;
  stories: IStoryProp[];
  visible?: boolean;
  imageStyle?: any;
  maxDuration?: number;
  renderHeaderComponent?: () => React.ReactNode;
  onChangePosition?: (position: number) => void;
  storyName?: string;
  index?: number;
};

const { width } = Dimensions.get("window");

const StoryView: React.FC<IStoryViewProp> = ({
  onComplete,
  stories,
  visible = false,
  imageStyle,
  maxDuration = 3,
  renderHeaderComponent = null,
  storyName = "Preview",
  onChangePosition,
  index,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(index || 0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pausedProgress = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentStory = React.useMemo(
    () => stories[currentStoryIndex],
    [currentStoryIndex, stories]
  );
  const maxDurationPerStory = React.useMemo(
    () => currentStory?.duration || maxDuration,
    [currentStory, maxDuration]
  );
  const [wentBack, setWentBack] = useState(0);

  const renderStoryContent = (story: any) => {
    switch (story.type) {
      case "image":
        return (
          <Image
            source={{
              uri: story.url,
            }}
            style={[styles.backgroundImage, imageStyle]}
          />
        );
      default:
        return null;
    }
  };

  const goToNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 3,
        useNativeDriver: false,
      }).start(() => {
        pausedProgress.current = 0;
        setCurrentStoryIndex(currentStoryIndex + 1);
        progressAnim.setValue(0);
        onChangePosition && onChangePosition(currentStoryIndex + 1);
      });
    } else {
      setWentBack(0);
      onComplete();
      setCurrentStoryIndex(0);
      onChangePosition && onChangePosition(0);
    }
  };

  const runProgressAnimation = () => {
    // this will run the animations at the top for the story
    progressAnim.setValue(pausedProgress.current); //set the value of the progress of the story
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: (1 - pausedProgress.current) * maxDurationPerStory * 1000, //for how long each story currently 6 seconds
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        goToNextStory(); //once finished goes to nextStory()
      }
    });
  };
  const getProgressBarWidth = (storyIndex: number, currentIndex: number) => {
    if (currentIndex > storyIndex) {
      return "100%";
    } // this is when the Story has been viewed
    if (currentIndex === storyIndex) {
      return progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"], // this is when the story is being viewed
      });
    }
    return "0%"; // this is when the Story has not been viewed yet
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStoryIndex, isPaused]);

  return visible ? (
    <SafeAreaView style={styles.safeArea}>
      <Pressable
        onPress={handleScreenTouch}
        onLongPress={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.9 : 1, //when clicked shows the user screen a little dimmed for feedback
          },
          styles.container,
        ]}
      >
        <View style={styles.container}>
          {currentStory?.type && renderStoryContent(currentStory)}
          <SafeAreaView style={styles.topBarContainer}>
            <>{renderHeaderComponent ? renderHeaderComponent : <Header
              getProgressBarWidth={getProgressBarWidth}
              storyName={storyName}
              stories={stories}
              currentStoryIndex={currentStoryIndex}
              pausePlay={pausePlay}
              isPaused={isPaused}
              onComplete={onComplete}
            />
            }
            </>
          </SafeAreaView>
        </View>
      </Pressable>
    </SafeAreaView>
  ) : null;
};

export default StoryView;