import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { Fonts } from '@/constants/theme';
import { events } from '@/data/events';
import { Link } from 'expo-router';


export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/Header Media.jpg')}
          style={styles.reactLogo}
          contentFit="fill"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Media Serving Schedule
        </ThemedText>
      </ThemedView>
      {events
        .filter((event) => event.dateTime > new Date())
        .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
        .slice(0, 5)
        .map((event) => (
        <Collapsible key={event.Title} title={event.Title}>
        <ThemedText>
            Call Time: <ThemedText type="defaultSemiBold">{event.CallTime}</ThemedText>
          </ThemedText>
          <ThemedText>
            Start Time: <ThemedText type="defaultSemiBold">{event.StartTime}</ThemedText>
          </ThemedText>
          {event.roster.map((item) => (
            <ThemedText key={item.role}>
              {item.role}: {' '}
              <ThemedText type="defaultSemiBold">{item.name || 'Open'}</ThemedText>
            </ThemedText>
          ))}
        </Collapsible>
      ))}
      <Link href="/Full Schedule">
      <ThemedText type="defualtSemiBold">
        Full Month Schedule
      </ThemedText>
      </Link>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: '100%',
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
