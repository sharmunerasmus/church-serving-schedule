import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { Fonts } from '@/constants/theme';
import { events } from '@/data/events';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const now = new Date();
  const upcomingEvents = events    .filter((event) => event.dateTime > now)
    .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
    .slice(0, 19);
    const [activeTab, setActiveTab] = useState('services');
    const serviceEvents = upcomingEvents.filter((event) => event.type === 'service');
    const practiceEvents = upcomingEvents.filter((event) => event.type === 'practice');
    const months= ['May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [selectedMonth, setSelectedMonth] = useState('May');
  return (
    <SafeAreaView style={styles.screen}>
    <ScrollView contentContainerStyle={styles.content}>
      

      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Media Team Dashboard
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.monthContainer}>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.monthScroll}
        >
          {months.map((month) => (
            <Pressable
              key={month}
              onPress={() => setSelectedMonth(month)}
              style={[
                styles.monthButton,
                selectedMonth === month && styles.activeMonthButton,
              ]}
              >
                <ThemedText
                  type={selectedMonth === month ? 'defaultSemiBold' : 'default'}
                  >
                {month}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>
      </ThemedView>


      <ThemedView style={styles.tabCard}>
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
      </ThemedView>

{activeTab === 'services' && (
  <>
{serviceEvents.map((event) => (
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
</>
)}

{activeTab === 'practices' && (
  <>
{practiceEvents.map((event) => (
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
</>
)}

{activeTab === 'equipment' && (
  <ThemedText>Equipment events will be displayed here.</ThemedText>
)}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
monthContainer: {
  backgroundColor: '#fff',
  borderRadius: 18,
  padding: 14,
  marginTop: 16,
  marginBottom: 20,
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 3,
},

screen: {
  flex: 1,
  backgroundColor: '#fff',
},

content: {
  padding: 20,
},

monthScroll: {
marginTop: 16,
marginBottom: 20,
},

monthButton: {
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 999,
  marginRight: 10,
  backgroundColor: '#eee',
},

activeMonthButton: {
  backgroundColor: '#ff0000',
},

tabCard: {
  backgroundColor: '#fff',
  borderRadius: 18,
  padding: 14,
  marginBottom: 20,
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 3,
},

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
