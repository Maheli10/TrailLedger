import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { routes } from '../data/routes';
import { load, save, KEYS } from '../storage';
import { Btn, common } from '../components';

export default function LogDetailScreen({ route, navigation }) {
  const [log, setLog] = useState(null);

  useEffect(() => {
    load(KEYS.logs, []).then((logs) => setLog(logs.find((l) => l.id === route.params.logId)));
  }, []);

  if (!log) return null;
  const trail = routes.find((r) => r.id === log.routeId);

  const remove = async () => {
    const logs = await load(KEYS.logs, []);
    await save(KEYS.logs, logs.filter((l) => l.id !== log.id));
    navigation.goBack();
  };

  return (
    <ScrollView style={common.screen}>
      <Text style={[common.title, { fontSize: 22 }]}>{trail.name}</Text>
      <Text style={common.sub}>{trail.region} · {trail.distanceKm} km</Text>
      <Text style={{ marginTop: 14 }}>📅 Date: {log.date}</Text>
      <Text>⏱️ Time taken: {log.hours} h (estimated {trail.durationHrs} h)</Text>
      <Text>Rating: {'⭐'.repeat(log.rating)}</Text>
      <Text style={[common.label, { marginTop: 14 }]}>Notes</Text>
      <Text style={{ marginBottom: 20 }}>{log.notes || 'No notes written.'}</Text>
      <Btn title="Delete entry" danger onPress={remove} />
    </ScrollView>
  );
}
