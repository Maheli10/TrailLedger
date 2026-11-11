import React, { useState, useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { load, KEYS } from '../storage';
import { routes } from '../data/routes';
import { Btn, common } from '../components';

export default function HomeScreen({ navigation }) {
  const [plans, setPlans] = useState([]);
  const [logs, setLogs] = useState([]);

  // Reload every time this screen comes into view
  useFocusEffect(
    useCallback(() => {
      load(KEYS.plans, []).then(setPlans);
      load(KEYS.logs, []).then(setLogs);
    }, [])
  );

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = plans.filter((p) => p.date >= today).sort((a, b) => a.date.localeCompare(b.date))[0];
  const upcomingRoute = upcoming && routes.find((r) => r.id === upcoming.routeId);
  const totalKm = logs.reduce((sum, l) => {
    const r = routes.find((x) => x.id === l.routeId);
    return sum + (r ? r.distanceKm : 0);
  }, 0);

  return (
    <ScrollView style={common.screen}>
      <Text style={{ fontSize: 26, fontWeight: '800', marginBottom: 12 }}>⛰️ TrailLedger</Text>

      <View style={common.card}>
        <Text style={common.title}>Next planned hike</Text>
        {upcoming ? (
          <Text style={common.sub}>{upcomingRoute?.name} on {upcoming.date}</Text>
        ) : (
          <Text style={common.sub}>Nothing planned yet. Pick a route to start!</Text>
        )}
      </View>

      <View style={[common.card, { flexDirection: 'row', justifyContent: 'space-around' }]}>
        <Stat n={routes.length} label="Routes" />
        <Stat n={plans.length} label="Planned" />
        <Stat n={logs.length} label="Logged" />
        <Stat n={totalKm} label="Km hiked" />
      </View>

      <Btn title="Browse routes" onPress={() => navigation.navigate('Routes')} />
      <Btn title="My planner" outline onPress={() => navigation.navigate('Planner')} />
      <Btn title="Add a hike log" outline onPress={() => navigation.navigate('AddLog')} />
    </ScrollView>
  );
}

function Stat({ n, label }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: '800' }}>{n}</Text>
      <Text style={common.sub}>{label}</Text>
    </View>
  );
}
