import React, { useState, useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { routes, BASE_GEAR } from '../data/routes';
import { load, save, KEYS } from '../storage';
import { Btn, common } from '../components';
import { colors } from '../theme';

export default function PackingScreen({ route }) {
  const trail = routes.find((r) => r.id === route.params.routeId);
  // Packing list = basic gear for every hike + extra gear for this route
  const items = [...BASE_GEAR, ...trail.extraGear];
  const [allPacked, setAllPacked] = useState({});
  const packed = allPacked[trail.id] || [];

  useFocusEffect(useCallback(() => { load(KEYS.packed, {}).then(setAllPacked); }, []));

  const update = async (list) => {
    const next = { ...allPacked, [trail.id]: list };
    setAllPacked(next);
    await save(KEYS.packed, next);
  };

  const toggle = (item) =>
    update(packed.includes(item) ? packed.filter((i) => i !== item) : [...packed, item]);

  return (
    <View style={common.screen}>
      <Text style={common.title}>{trail.name}</Text>
      <Text style={[common.sub, { marginBottom: 12 }]}>Packed {packed.length} of {items.length} items</Text>
      <FlatList
        data={items}
        keyExtractor={(i) => i}
        renderItem={({ item }) => {
          const done = packed.includes(item);
          return (
            <TouchableOpacity style={[common.card, done && { backgroundColor: colors.light }]} onPress={() => toggle(item)}>
              <Text style={{ fontSize: 16 }}>
                {done ? '☑️' : '⬜'} {item}{trail.extraGear.includes(item) ? '  (route specific)' : ''}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <Btn title="Clear all" outline onPress={() => update([])} />
    </View>
  );
}
