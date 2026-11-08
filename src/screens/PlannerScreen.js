import React, { useState, useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { routes } from '../data/routes';
import { load, save, KEYS } from '../storage';
import { Btn, Empty, common } from '../components';

export default function PlannerScreen({ navigation }) {
  const [plans, setPlans] = useState([]);

  useFocusEffect(useCallback(() => { load(KEYS.plans, []).then(setPlans); }, []));

  const remove = (id) => {
    Alert.alert('Delete plan?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          const next = plans.filter((p) => p.id !== id);
          setPlans(next);
          await save(KEYS.plans, next);
        },
      },
    ]);
  };

  const sorted = [...plans].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <View style={common.screen}>
      <FlatList
        data={sorted}
        keyExtractor={(p) => p.id}
        ListEmptyComponent={<Empty text="No planned hikes yet. Open a route and tap 'Plan this hike'." />}
        renderItem={({ item }) => {
          const trail = routes.find((r) => r.id === item.routeId);
          return (
            <View style={common.card}>
              <TouchableOpacity onPress={() => navigation.navigate('RouteDetail', { routeId: trail.id })}>
                <Text style={common.title}>{trail.name}</Text>
                <Text style={common.sub}>📅 {item.date}</Text>
                {item.notes ? <Text style={{ marginTop: 6 }}>{item.notes}</Text> : null}
              </TouchableOpacity>
              <View style={[common.row, { marginTop: 10 }]}>
                <Btn title="Packing" outline style={{ flex: 1, marginRight: 6 }}
                  onPress={() => navigation.navigate('Packing', { routeId: trail.id })} />
                <Btn title="Delete" danger style={{ flex: 1 }} onPress={() => remove(item.id)} />
              </View>
            </View>
          );
        }}
      />
      <Btn title="+ Find a route to plan" onPress={() => navigation.navigate('Routes')} />
    </View>
  );
}
