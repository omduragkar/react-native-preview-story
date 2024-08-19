import React from 'react';
import { Image } from 'react-native';
import styles from '../Styled';
import type { IContentViewProps } from '../types';

const ContentView: React.FC<IContentViewProps> = ({ story, imageStyle }) => {
  switch (story.type) {
    case 'image':
      return (
        <Image
          source={{
            uri: story.url,
          }}
          style={[styles.backgroundImage, imageStyle]}
        />
      );
    default:
      return story.component;
  }
};

export default ContentView;
