# react-native-preview-story

React Native Story Component Which takes Stories array and show exact story view like infamous instagram

## Installation

```sh
npm install react-native-preview-story
```

## Usage

```js
import { StoryView } from 'react-native-preview-story';

// ...

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
          <View
            style={{
              marginTop: 50,
            }}
          >
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
/>;
```
This package is as much customizable as it can be with plenty of feature constituing to header components with custom and types to handle props easily!
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
