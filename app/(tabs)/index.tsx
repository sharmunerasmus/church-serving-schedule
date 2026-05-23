import { Image } from 'expo-image';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, TextInput } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';

const Sunday24thAMRoster = {
  Title: 'Sunday 24th AM',
  CallTime: '7:30am',
  StartTime: '9:00am',
  roster: [
  { role: 'Sound Engineer', name: 'Buddy/Natanya' },
  { role: 'Lights/Steaming', name: 'Cole' },
  { role: 'Lyrics/Scripture', name: 'Faith/Tyrone' },
  { role: 'Switching', name: 'Nel-Mari' },
  { role: 'Camera 1', name: 'Keagan' },
  { role: 'Camera 2', name: 'Faith/Xavier' },
  { role: 'Camera 3', name: 'Luke' },
  { role: 'Handheld Camera', name: 'Sharmun' }
],
}

const Sunday24thPMRoster = {
  Title: 'Sunday 24th PM',
  CallTime: '4:30pm',
  StartTime: '6:00pm',
  roster: [
  { role: 'Sound Engineer', name: 'Kudzai/Sharmun' },
  { role: 'Lights/Steaming', name: 'Cole' },
  { role: 'Lyrics/Scripture', name: 'Sharmun/Faith' },
  { role: 'Switching', name: 'Sharmun/Cuan' },
  { role: 'Camera 1', name: 'Keagan' },
  { role: 'Camera 2', name: '?/Static' },
  { role: 'Camera 3', name: 'Luke' },
  { role: 'Handheld Camera', name: 'N/A' }
],
}

const Monday25thPMRoster = {
  Title: 'Monday 25th PM',
  CallTime: '6:00pm',
  StartTime: '6:30pm',
  roster: [
  { role: 'Sound Engineer', name: '?' },
  { role: 'Lights/Steaming', name: '?' },
  { role: 'Lyrics/Scripture', name: '?' },
  { role: 'Switching', name: '?' },
  { role: 'Camera 1', name: '?' },
  { role: 'Camera 2', name: '?' },
  { role: 'Camera 3', name: '?' },
  { role: 'Handheld Camera', name: 'N/A' }
],
}

export default function HomeScreen() {const [volunteerName, setVolunteerName] = useState('');
  const [draftName, setDraftName] = useState('');
  const [sunday24AM, setSunday24AM] = useState(Sunday24thAMRoster);
  function claimRole(roleName: string) {
    setSunday24AM({
      ...sunday24AM,
      roster: sunday24AM.roster.map((item) => {
        if (item.role !== roleName) {
          return item;
        }
        if (item.name === volunteerName) {
          return { ...item, name: '' };
        }
        if (!item.name || item.name === '?' || item.name === 'N/A') {
          return { ...item, name: volunteerName };
        }
        return item;
      }),
    });
  }  
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
          source={require('@/assets/images/Header Media.jpg')}
          style={styles.reactLogo}
          contentFit="fill"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Media Serving Schedule</ThemedText>
      </ThemedView>
      <ThemedText>
        Hello <ThemedText type="defaultSemiBold">{volunteerName}</ThemedText>
      </ThemedText>
      <ThemedText> 
        Below is the schedule for the upcoming services. Please check in with your role lead if you need to swap shifts.
      </ThemedText>

      <Collapsible title={sunday24AM.Title}>
      <ThemedText>
      Call Time: <ThemedText type="defaultSemiBold">{sunday24AM.CallTime}</ThemedText>
      </ThemedText>
      <ThemedText>
      Start Time: <ThemedText type="defaultSemiBold">{sunday24AM.StartTime}</ThemedText>
      </ThemedText>
            <ThemedView style={styles.stepContainer}>
        </ThemedView>
      {sunday24AM.roster.map((item) => (
        <Pressable key={item.role} onPress={() => claimRole(item.role)}>
        <ThemedText>
           {item.role}:{' '}
         <ThemedText type="defaultSemiBold">
          {item.name || 'Open'}
         </ThemedText>
        </ThemedText>
        </Pressable>
      ))}
      </Collapsible>

      <Collapsible title={Sunday24thPMRoster.Title}>
      <ThemedText>
      Call Time: <ThemedText type="defaultSemiBold">{Sunday24thPMRoster.CallTime}</ThemedText>
      </ThemedText>
      <ThemedText>
      Start Time: <ThemedText type="defaultSemiBold">{Sunday24thPMRoster.StartTime}</ThemedText>
      </ThemedText>
      <ThemedView style={styles.stepContainer}>
        </ThemedView>
      {Sunday24thPMRoster.roster.map((item) => (
        <ThemedText key={item.role}>
          {item.role}: <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
        </ThemedText>
      ))}
      </Collapsible>

      <Collapsible title={Monday25thPMRoster.Title}>
      <ThemedText>
      Call Time: <ThemedText type="defaultSemiBold">{Monday25thPMRoster.CallTime}</ThemedText>
      </ThemedText>
      <ThemedText>
      Start Time: <ThemedText type="defaultSemiBold">{Monday25thPMRoster.StartTime}</ThemedText>
      </ThemedText>
      <ThemedView style={styles.stepContainer}>
        </ThemedView>
      {Monday25thPMRoster.roster.map((item) => (
        <ThemedText key={item.role}>
          {item.role}: <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
        </ThemedText>
      ))}
      </Collapsible>

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
