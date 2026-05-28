import { Image } from 'expo-image';
import { Pressable, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { Fonts } from '@/constants/theme';
import { events } from '@/data/events';
import { useState } from 'react';

export default function TabTwoScreen() {
  const now = new Date();
  const upcomingservices = events    .filter((event) => event.dateTime > now)
    .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
    .slice(0, 12);
    const [activeTab, setActiveTab] = useState('services');
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
          Media Team Dashboard
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.tabContainer}>

        <Pressable onPress={() => setActiveTab('services')}
        style={[
          styles.tabButton,
          activeTab === 'services' && styles.activeTab,
        ]}>
          <ThemedText type={activeTab === 'services' ? 'defaultSemiBold' : 'default'}>
            Services
          </ThemedText>
        </Pressable>

        <Pressable onPress={() => setActiveTab('practices')}
          style={[
            styles.tabButton,
            activeTab === 'practices' && styles.activeTab,
          ]}>
          <ThemedText type={activeTab === 'practices' ? 'defaultSemiBold' : 'default'}>
            Practices
          </ThemedText>
        </Pressable>

        <Pressable onPress={() => setActiveTab('equipment')}
          style={[
            styles.tabButton,
            activeTab === 'equipment' && styles.activeTab,
          ]}>
          <ThemedText type={activeTab === 'equipment' ? 'defaultSemiBold' : 'default'}>
            Equipment
          </ThemedText>
        </Pressable>
      </ThemedView>



{upcomingservices.map((event) => (
  <ThemedView key={event.Title} style={styles.eventCard}>
    <Collapsible title={event.Title}>
      <ThemedText>
        Call Time: <ThemedText type="defaultSemiBold">{event.CallTime}</ThemedText>
      </ThemedText>

      <ThemedText>
        Start Time: <ThemedText type="defaultSemiBold">{event.StartTime}</ThemedText>
      </ThemedText>

      {event.roster.map((item) => (
        <ThemedText key={item.role}>
          {item.role}:{' '}
          <ThemedText type="defaultSemiBold">
            {item.name || 'Open'}
          </ThemedText>
        </ThemedText>
      ))}
    </Collapsible>
  </ThemedView>
))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
tabContainer: {
  flexDirection: 'row',
  justifyContent:  'space-between' ,
  marginBottom: 18,
  marginTop: 8,
},
tabButton: {
paddingBottom: 8,
},
activeTab: {
  borderBottomWidth: 2,
  borderBottomColor: '#ff0000',
},
  
eventCard: {
  backgroundColor: '#fff',
  borderRadius: 18,
  padding: 18,
  marginBottom: 14,

  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 3,
},
  reactLogo: {
    height: '100%',
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
