import { StoryView, type IStoryProp } from 'react-native-preview-story';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, { useMemo } from 'react';

export default function App() {
  const [visible, setVisible] = React.useState(true);
  const storyArray: IStoryProp[] = useMemo(
    () => [
      {
        url: 'https://media.giphy.com/media/3o7TKz9b4v8l5ZjGxi/giphy.gif',
        type: 'image',
        id: 3,
        duration: 5,
      },
      {
        url: 'https://media.giphy.com/media/3o7TKz9b4v8l5ZjGxi/giphy.gif',
        type: 'image',
        id: 4,
        duration: 5,
      },
      {
        url: 'https://media.giphy.com/media/3o7TKz9b4v8l5ZjGxi/giphy.gif',
        type: 'image',
        id: 5,
        duration: 5,
      },
      {
        type: 'component',
        component: (
          <View style={styles.component}>
            <Button
              title="Hello"
              onPress={() => {
                setVisible(false);
                console.log('close');
              }}
            />
          </View>
        ),
        id: 1,
        duration: 5,
      },
    ],
    []
  );
  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar />
      {visible ? (
        <StoryView
          stories={storyArray}
          visible
          storyName="Story Name"
          onComplete={() => {
            setVisible(false);
            console.log('close');
          }}
        />
      ) : (
        <Button title="Show Story" onPress={() => setVisible(true)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  component: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200,
  },
});
