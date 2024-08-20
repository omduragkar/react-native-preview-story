import { Header, StoryView } from 'react-native-preview-story';
import { SafeAreaView, Text, Button, View, StatusBar } from 'react-native';
import styles from '../../src/Styled';

export default function App() {
  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar />
      <StoryView
        stories={[
          {
            type: 'component',
            duration: 5,
            url: 'https://picsum.photos/100/600',
            id: 12,
            storyId: 1,
            isSeen: false,
            component: (
              <View>
                <Text>Custom Component</Text>
                <View>
                  <Button
                    title="Press Me"
                    onPress={() => console.log('Button Pressed')}
                  />
                </View>
              </View>
            ),
          },
          {
            type: 'image',
            duration: 5,
            url: 'https://picsum.photos/200/300',
            id: 1,
            storyId: 1,
            isSeen: false,
          },
          {
            type: 'image',
            duration: 5,
            url: 'https://picsum.photos/300/400',
            id: 2,
            storyId: 1,
            isSeen: false,
          },
          {
            type: 'image',
            duration: 5,
            url: 'https://picsum.photos/400/500',
            id: 3,
            storyId: 1,
            isSeen: false,
          },
          {
            type: 'component',
            duration: 5,
            url: 'https://picsum.photos/100/600',
            id: 4,
            storyId: 1,
            isSeen: false,
            component: (
              <View>
                <Text>Custom Component</Text>
                <View>
                  <Button
                    title="Press Me"
                    onPress={() => console.log('Button Pressed')}
                  />
                </View>
              </View>
            ),
          },
        ]}
        visible
        onComplete={() => console.log('onComplete')}
        close={false}
        renderHeaderComponent={(props) => <Header {...props} />}
      />
    </SafeAreaView>
  );
}
