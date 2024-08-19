import { View, Text, TouchableOpacity, Image, Animated,  } from 'react-native'
import React from 'react'
import styles from "../Styled";
import PlayImage from "../assets/play.png";
import PauseImage from "../assets/pause.png";
import CrossImage from "../assets/white-cross.png";
interface IHeaderProps {
    storyName: string,
    stories: any[],
    currentStoryIndex: number,
    pausePlay: () => void,
    isPaused: boolean,
    onComplete: () => void
    getProgressBarWidth: (index: number, currentStoryIndex: number) => "100%" | Animated.AnimatedInterpolation<string | number> | "0%"
}

const Header:React.FC<IHeaderProps> = ({
    storyName,
    stories,
    currentStoryIndex,
    pausePlay,
    isPaused,
    onComplete,
    getProgressBarWidth
}) => {

    return (
        <View style={styles.headerContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {storyName}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => pausePlay()}>
                <Image source={isPaused ? PlayImage : PauseImage} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onComplete}>
                <Image source={CrossImage} style={styles.icon} />
              </TouchableOpacity>
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
                  ]}
                />
              </View>
            ))}
          </View>
        </View>
      );
}

export default Header