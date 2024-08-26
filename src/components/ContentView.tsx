import React from 'react';
import { Dimensions, Image } from 'react-native';
import styles from '../Styled';
import type { IContentViewProps } from '../types';
const { width, height } = Dimensions.get('window');
const ContentView: React.FC<IContentViewProps> = ({
  story,
  imageStyle,
  onLoadStart,
  onLoadEnd,
}) => {
  switch (story.type) {
    case 'image':
      return (
        <Image
          source={{
            uri: story.url,
            height: imageStyle?.height || height,
            width: imageStyle?.width || width,
            scale: imageStyle?.scale || 1,
          }}
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          style={[styles.backgroundImage, imageStyle]}
        />
      );
    default:
      return story.component;
  }
};

export default ContentView;
