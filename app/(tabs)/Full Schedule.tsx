import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { events } from '@/data/events';
import { ScrollView } from 'react-native';

export default function FullScheduleScreen() {
    return (
        <ScrollView>
            <ThemedView>
                <ThemedText type="title">
                    Full Month Schedule
                </ThemedText>
            </ThemedView>
            {events
                .filter((event) => event.dateTime > new Date())
                .map ((event) => (
                    <Collapsible key={event.Title} title={event.Title}>
                        <ThemedText type="defaultSemiBold">
                            {event.StartTime}
                            </ThemedText>
                            {event.roster.map((item) => (
                                <ThemedText key={item.role}>
                                    {item.role}: {' '}
                                    <ThemedText type="defaultSemiBold">{item.name || 'Open'}</ThemedText>
                                </ThemedText>
                            ))}
                    </Collapsible>
                ))}
        </ScrollView>
    );
}

