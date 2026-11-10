import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, View } from 'react-native';
import { routes } from '../data/routes';
import { load, save, KEYS } from '../storage';
import { Btn, Chip, common } from '../components';

export default function AddLogScreen({ navigation }) {
  const [routeId, setRouteId] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [hours, setHours] = useState('');
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');

  const onSave = async () => {
    if (!routeId) return Alert.alert('Missing route', 'Please choose a route.');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return Alert.alert('Invalid date', 'Use YYYY-MM-DD.');
    if (!hours || isNaN(Number(hours))) return Alert.alert('Invalid hours', 'Enter the hike time as a number.');
    if (rating === 0) return Alert.alert('Missing rating', 'Please give 1 to 5 stars.');

    const logs = await load(KEYS.logs, []);
    logs.push({ id: Date.now().toString(), routeId, date, hours: Number(hours), rating, notes });
    await save(KEYS.logs, logs);
    navigation.goBack();
  };

  return (
    <ScrollView style={common.screen}>
      <Text style={common.label}>Route</Text>
      <View style={common.row}>
        {routes.map((r) => (
          <Chip key={r.id} label={r.name} active={routeId === r.id} onPress={() => setRouteId(r.id)} />
        ))}
      </View>

      <Text style={common.label}>Date (YYYY-MM-DD)</Text>
      <TextInput style={common.input} value={date} onChangeText={setDate} />

      <Text style={common.label}>Time taken (hours)</Text>
      <TextInput style={common.input} value={hours} onChangeText={setHours} keyboardType="numeric" placeholder="e.g. 4.5" />

      <Text style={common.label}>Rating</Text>
      <View style={common.row}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Chip key={n} label={`${n} ⭐`} active={rating === n} onPress={() => setRating(n)} />
        ))}
      </View>

      <Text style={common.label}>Notes</Text>
      <TextInput
        style={[common.input, { height: 100, textAlignVertical: 'top' }]}
        multiline value={notes} onChangeText={setNotes} placeholder="Weather, highlights, what to do better..."
      />
      <Btn title="Save log" onPress={onSave} />
    </ScrollView>
  );
}
