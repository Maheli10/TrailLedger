import React, { useState, useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { routes } from '../data/routes';
import { load, save, KEYS } from '../storage';
import { Btn, common } from '../components';
import { colors } from '../theme';

export default function CheckpointsScreen({ route }) {
  const trail = routes.find((r) => r.id === route.params.routeId);
  const [allReached, setAllReached] = useState({});
  const reached = allReached[trail.id] || [];

  useFocusEffect(useCallback(() => { load(KEYS.reached, {}).then(setAllReached); }, []));

  const update = async (list) => {
    const next = { ...allReached, [trail.id]: list };
    setAllReached(next);
    await save(KEYS.reached, next);
  };

  const toggle = (name) =>
    update(reached.includes(name) ? reached.filter((n) => n !== name) : [...reached, name]);

  return (
    <View style={common.screen}>
      <Text style={common.title}>{trail.name}</Text>
      <Text style={[common.sub, { marginBottom: 12 }]}>
        Reached {reached.length} of {trail.checkpoints.length} checkpoints. Works offline.
      </Text>
      <FlatList
        data={trail.checkpoints}
        keyExtractor={(c) => c.name}
        renderItem={({ item, index }) => {
          const done = reached.includes(item.name);
          return (
            <TouchableOpacity
              style={[common.card, done && { backgroundColor: colors.light }]}
              onPress={() => toggle(item.name)}
            >
              <Text style={common.title}>{done ? '✅' : '⬜'} {index + 1}. {item.name}</Text>
              <Text style={common.sub}>Elevation: {item.elevationM} m</Text>
            </TouchableOpacity>
          );
        }}
      />
      <Btn title="Reset progress" outline onPress={() => update([])} />
    </View>
  );
}
