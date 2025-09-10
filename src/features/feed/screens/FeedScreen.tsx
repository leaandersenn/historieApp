import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, NativeScrollEvent, NativeSyntheticEvent, Dimensions, StatusBar } from 'react-native';
import VideoCard from '../components/VideoCard';
import BackButton from '../components/BackButton';
import { API_ENDPOINT } from '@env';

const { height } = Dimensions.get('window');

const HISTORICAL_EMOJIS = [
  '🏛️', '👑', '📜', '⚔️', '🛡️', '⚱️', '🗿', '🏰', '🗽', '⛵', '🗺️', '⚖️'
];

const getRandomEmoji = () => {
  const randomIndex = Math.floor(Math.random() * HISTORICAL_EMOJIS.length);
  return HISTORICAL_EMOJIS[randomIndex];
}

/* // Mock data 
const FEED = [
  { id: '2', uri: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Antikken i Roma', description: 'Beskrivelse av videoen'},
  { id: '3', uri: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', title: 'Napoleon kort forklart', description: 'Beskrivelse av videoen' },
];
 */
export default function FeedScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [feed, setFeed] = useState([]);
  const [loading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchFeed();
  }, []);
  
  const fetchFeed = async () => {
    try {
      console.log("API endpoint: ", API_ENDPOINT);
      console.log("Inne i try i fetchFeed, linje 35 FeedScreen")
      const response = await fetch(API_ENDPOINT);
      const responseData = await response.json();
      console.log("Etter data np i fetcheed, linje 38 FeedScreen")
      const feedData = JSON.parse(responseData.body);
      setFeed(feedData);
      console.log("data", feedData);
    } catch (error) {
      console.error("Feil ved henting av data fra AWS:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  const viewabilityConfig = { itemVisiblePercentThreshold: 80 };
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems?.length > 0) {
      const i = viewableItems[0].index ?? 0;
      setActiveIndex(i);
    }
  }).current;

  const keyExtractor = useCallback((item: any) => item.id, []);
  const getItemLayout = useCallback((_: any, index: number) => ({
    length: height,
    offset: height * index,
    index,
  }), []);

  return (
    <View style={styles.wrap}>
      <StatusBar barStyle="light-content" />
        <FlatList
          data={feed}
          keyExtractor={keyExtractor}
          renderItem={({ item, index }) => (
            <VideoCard 
            uri={item.uri} 
            emoji={getRandomEmoji()}
            title={item.title} 
            description={item.description} 
            isActive={index === activeIndex} /> 
          )}
          pagingEnabled
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          snapToInterval={height}
          snapToAlignment="start"
          getItemLayout={getItemLayout}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
        <BackButton />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { 
    flex: 1,
    backgroundColor: '#000',
  },
});
