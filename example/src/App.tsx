
import { Dimensions, StyleSheet, View } from 'react-native';
import { StoryView } from 'react-native-preview-story';

export default function App() {

  return (
    <View style={styles.container}>
        <StoryView
          stories={[{
            type: 'image',
            duration: 5000,
            url: 'https://picsum.photos/200/300' ,
            id: 1,
            storyId: 1,
            isSeen: false
          },
          {
            type: 'image',
            duration: 5000,
            url: 'https://picsum.photos/200/300' ,
            id: 2,
            storyId: 1,
            isSeen: false
          },
          {
            type: 'image',
            duration: 5000,
            url: 'https://picsum.photos/200/300' ,
            id: 3,
            storyId: 1,
            isSeen: false

          },
          {
            type: 'image',
            duration: 5000,
            url: 'https://picsum.photos/200/300' ,
            id: 4,
            storyId: 1,
            isSeen: false
          }]}
          onComplete={() => console.log('onComplete')}
          />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  }
});
