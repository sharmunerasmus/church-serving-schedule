import { Image } from 'expo-image';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, TextInput } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { events } from '@/data/events';

export default function HomeScreen() {
  const [volunteerName, setVolunteerName] = useState('');
  const [draftName, setDraftName] = useState('');
  const nextEvent = events.find((event) => event.dateTime > new Date());
  return (
    <>
      <Modal visible={!volunteerName} transparent animationType="fade">
  <ThemedView style={styles.modalBackdrop}>
    <ThemedView style={styles.modalCard}>
      <ThemedText type="subtitle">Welcome Volunteer</ThemedText>

      <TextInput
        placeholder="Volunteer Name"
        placeholderTextColor="#999"
        value={draftName}
        onChangeText={setDraftName}
        style={styles.input}
      />

      <Pressable
        style={styles.primaryButton}
        onPress={() => setVolunteerName(draftName.trim())}
      >
        <ThemedText type="defaultSemiBold">Continue</ThemedText>
      </Pressable>
    </ThemedView>
  </ThemedView>
</Modal>

    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/Worship-hands.jpg')}
          style={styles.reactLogo}
          contentFit="fill"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Media Team Home</ThemedText>
      </ThemedView>
      <ThemedText>
        Hello <ThemedText type="defaultSemiBold">{volunteerName}</ThemedText>
      </ThemedText>
      <ThemedText> 
        Below is the up coming service. Please check in with your role lead if you need to swap shifts.
      </ThemedText>

{nextEvent && (
  <Collapsible title={nextEvent.Title}>
    <ThemedText>
      Call Time: <ThemedText type="defaultSemiBold">{nextEvent.CallTime}</ThemedText>
    </ThemedText>

    <ThemedText>
      Start Time: <ThemedText type="defaultSemiBold">{nextEvent.StartTime}</ThemedText>
    </ThemedText>

    {nextEvent.roster.map((item) => (
      <ThemedText key={item.role}>
        {item.role}:{' '}
        <ThemedText type="defaultSemiBold">{item.name || 'Open'}</ThemedText>
      </ThemedText>
   ))}
  </Collapsible>
)}
    </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.55)',
  justifyContent: 'center',
  padding: 24,
},

modalCard: {
  borderRadius: 20,
  padding: 24,
  gap: 16,
},

input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 12,
  padding: 14,
  fontSize: 16,
  backgroundColor: '#fff',
},

primaryButton: {
  padding: 14,
  borderRadius: 12,
  alignItems: 'center',
  backgroundColor: '#ddd',
},
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
  },
});
