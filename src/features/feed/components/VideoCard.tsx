import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Pressable, Text} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import Ionicons from '@expo/vector-icons/Ionicons';
import BackButton from './BackButton';

const { height, width } = Dimensions.get('window');

type Props = {
  uri: string;
  emoji: string;
  title: string;
  description: string;
  isActive: boolean;
};

export default function VideoCard({ uri, emoji, title, description, isActive }: Props) {

  const [isPlaying, setIsPlaying] = useState(false);
  const player = useVideoPlayer(uri);

  useEffect(() => {
    if (isActive) {
      player.pause();
    } else {
      setIsPlaying(false);
      player.pause();
    }
  }, [isActive, player]);

  const togglePlayPause = () => {
    if (isPlaying) {
        player.pause();
    } else {
        player.play();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        contentFit="cover"
        allowsFullscreen={false}
        allowsPictureInPicture={false}
      />
      <Pressable style={styles.overlay} onPress={togglePlayPause}>
        {!isPlaying && (
            <Ionicons name="play-circle-outline" size={80} color='white' />
        )}
      </Pressable>

      {!isPlaying && (
      <View style={styles.infoContainer}>
        <Text style={styles.title}>
            <Text>{emoji}</Text> {title}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    height, 
    width, 
    backgroundColor: '#000' 
},
  video: { 
    ...StyleSheet.absoluteFillObject
},
  overlay: {
     ...StyleSheet.absoluteFillObject,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: 'rgba(0,0,0,0.2)'
},
  infoContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(8, 87, 49, 0.26)'
 },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginTop: 5
  }
});
