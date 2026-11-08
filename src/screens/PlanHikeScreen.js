import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput } from 'react-native';
import { routes } from '../data/routes';
import { load, save, KEYS } from '../storage';
import { Btn, common } from '../components';

export default function PlanHikeScreen({ route, navigation }) {
  const trail = routes.find((r) => r.id === route.params.routeId);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState('');

  const onSave = async () => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || isNaN(new Date(date).getTime())) {
      Alert.alert('Invalid date', 'Please use the format YYYY-MM-DD, e.g. 2026-12-24');
      return;
    }
    const plans = await load(KEYS.plans, []);
    plans.push({ id: Date.now().toString(), routeId: trail.id, date, notes });
    await save(KEYS.plans, plans);
    Alert.alert('Saved', 'Hike added to your planner.');
    navigation.navigate('Main', { screen: 'Planner' });
  };

  return (
    <ScrollView style={common.screen}>
      <Text style={[common.title, { marginBottom: 14 }]}>{trail.name}</Text>
      <Text style={common.label}>Hike date (YYYY-MM-DD)</Text>
      <TextInput style={common.input} value={date} onChangeText={setDate} />
      <Text style={common.label}>Notes (meeting point, who is coming...)</Text>
      <TextInput
        style={[common.input, { height: 100, textAlignVertical: 'top' }]}
        multiline value={notes} onChangeText={setNotes}
      />
      <Btn title="Save to planner" onPress={onSave} />
    </ScrollView>
  );
}
