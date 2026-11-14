import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, View } from 'react-native';
import { routes, routeById } from '../data/routes';
import { load, save, KEYS } from '../storage';
import { todayStr, validDate } from '../helpers';
import { useTheme } from '../ThemeContext';
import { Btn, Chip } from '../components';

export default function AddLogScreen({ navigation }) {
  const { colors, s } = useTheme();
  const [name, setName] = useState('');
  const [routeId, setRouteId] = useState(null);
  const [date, setDate] = useState(todayStr());
  const [hours, setHours] = useState('');
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');

  const onNameChange = (text) => {
    setName(text);
    const trail = routeById(routeId);
    if (trail && text !== trail.name) setRouteId(null); // typed a different name
  };

  const pickRoute = (r) => {
    setRouteId(r.id);
    setName(r.name);
  };

  const onSave = async () => {
    if (!name.trim()) return Alert.alert('Missing name', 'Type a hike name or choose a route.');
    if (!validDate(date)) return Alert.alert('Invalid date', 'Use YYYY-MM-DD.');
    if (!hours || isNaN(Number(hours))) return Alert.alert('Invalid hours', 'Enter the hike time as a number.');
    if (rating === 0) return Alert.alert('Missing rating', 'Please give 1 to 5 stars.');

    const logs = await load(KEYS.logs, []);
    logs.push({ id: Date.now().toString(), name: name.trim(), routeId, date, hours: Number(hours), rating, notes });
    await save(KEYS.logs, logs);
    navigation.goBack();
  };

  return (
    <ScrollView style={s.screen} keyboardShouldPersistTaps="handled">
      <Text style={s.label}>Hike name</Text>
      <TextInput
        style={s.input}
        placeholder="Type a name, e.g. Morning hike with friends"
        placeholderTextColor={colors.sub}
        value={name}
        onChangeText={onNameChange}
      />

      <Text style={s.label}>Or choose a route</Text>
      <View style={[s.row, { marginBottom: 6 }]}>
        {routes.map((r) => (
          <Chip key={r.id} label={r.name} active={routeId === r.id} onPress={() => pickRoute(r)} />
        ))}
      </View>

      <Text style={s.label}>Date (YYYY-MM-DD)</Text>
      <TextInput style={s.input} value={date} onChangeText={setDate} />

      <Text style={s.label}>Time taken (hours)</Text>
      <TextInput
        style={s.input} value={hours} onChangeText={setHours}
        keyboardType="numeric" placeholder="e.g. 4.5" placeholderTextColor={colors.sub}
      />

      <Text style={s.label}>Rating</Text>
      <View style={[s.row, { marginBottom: 8 }]}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Chip key={n} label={`${n} ⭐`} active={rating === n} onPress={() => setRating(n)} />
        ))}
      </View>

      <Text style={s.label}>Notes</Text>
      <TextInput
        style={[s.input, { height: 100, textAlignVertical: 'top' }]}
        multiline value={notes} onChangeText={setNotes}
        placeholder="Weather, highlights, what to do better..." placeholderTextColor={colors.sub}
      />
      <Btn title="Save log" onPress={onSave} style={{ marginBottom: 30 }} />
    </ScrollView>
  );
}
