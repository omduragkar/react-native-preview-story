# React Native Preview Story

A React Native component to display stories similar to Instagram and Snapchat.

## Installation

```sh
npm install react-native-preview-story
```

## Features

### 1. Add Custom Component

You can add custom components in your story to make it more user-friendly.

### 2. Auto Pause Option While Loading

The library automatically pauses the component timer until the image is fully loaded.

### 3. Customizable Features

It's a TypeScript-built library, so you can customize each and every prop you need, from rendering the complete header to everything else.

## Props

### StoryView Component

The [`StoryView`](https://github.com/omduragkar/react-native-preview-story.git) component is used to display a series of stories with various controls and customization options.

#### Props

- **visible** (`boolean`): Determines if the StoryView is visible. (Mandatory)
- **stories** (`IStoryProp[]`): Array of story objects to be displayed. (Mandatory)
- **imageStyle** (`any`): Style for the story image.
- **containerStyle** (`any`): Style for the container.
- **onComplete** (`() => void`): Callback when all stories are viewed.
- **duration** (`number`): Duration for each story in milliseconds. Default is 5000.
- **renderHeaderComponent** (`(props: IHeaderProps) => React.ReactNode | Element | null | any`): Function to render a custom header component.
- **onChangePosition** (`(position: number) => void`): Callback when the story position changes.
- **index** (`number`): Initial index of the story to be displayed.
- **noPause** (`boolean`): If true, the story will not pause on touch.
- **noControls** (`boolean`): If true, the default controls will not be displayed.

## Example

Here is an example of how to use the [`StoryView`](https://github.com/omduragkar/react-native-preview-story/tree/main/example/src/app) component in an app:

```jsx
import React from 'react';
import { View, Text, Button, SafeAreaView, StatusBar } from 'react-native';
import StoryView from 'react-native-preview-story';
import styles from './styles';

const CustomHeader = ({ title }) => (
  <View style={{ padding: 10, backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <Text style={{ color: 'white' }}>{title}</Text>
  </View>
);

export default function App() {
  const [visible, setVisible] = React.useState(true);

  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar />
      {visible ? (
        <StoryView
          stories={[
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
                <View>
                  <Text>Custom Component</Text>
                  <Button
                    title="Press Me"
                    onPress={() => console.log('Button Pressed')}
                  />
                </View>
              ),
              id: 1,
              duration: 5,
            },
          ]}
          visible
          renderHeaderComponent={() => (
            <CustomHeader title="My Custom Header" />
          )}
          onComplete={() => {
            setVisible(false);
            console.log('close');
          }}
          noControls
        />
      ) : (
        <Button title="Show Story" onPress={() => setVisible(true)} />
      )}
    </SafeAreaView>
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

```

This README includes detailed information about the [`StoryView`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fom.duragkar%2FDesktop%2Frepos%2Frepo2%2Freact-native-preview-story%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fom.duragkar%2FDesktop%2Frepos%2Frepo2%2Freact-native-preview-story%2FREADME.md%22%2C%22path%22%3A%22%2FUsers%2Fom.duragkar%2FDesktop%2Frepos%2Frepo2%2Freact-native-preview-story%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A185%2C%22character%22%3A7%7D%7D%5D%2C%224b54566e-834f-4df0-b0cd-00869a31cfb9%22%5D "Go to definition") component and an example app demonstrating its usage with a custom header component.
```
