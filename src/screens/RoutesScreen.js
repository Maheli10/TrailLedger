import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { routes } from '../data/routes';
import { useTheme } from '../ThemeContext';
import { Chip, Badge, Empty } from '../components';

const LEVELS = ['All', 'Easy', 'Moderate', 'Hard'];

export default function RoutesScreen({ navigation }) {
  const { colors, s } = useTheme();
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('All');

  // Searching + filtering the dataset
  const filtered = routes.filter((r) => {
    const matchesText = (r.name + ' ' + r.region).toLowerCase().includes(search.toLowerCase());
    const matchesLevel = level === 'All' || r.difficulty === level;
    return matchesText && matchesLevel;
  });

  return (
    <View style={s.screen}>
      <TextInput
        style={s.input}
        placeholder="Search by name or region..."
        placeholderTextColor={colors.sub}
        value={search}
        onChangeText={setSearch}
      />
      <View style={s.row}>
        {LEVELS.map((l) => (
          <Chip key={l} label={l} active={level === l} onPress={() => setLevel(l)} />
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Empty text="No routes match your search." />}
        renderItem={({ item }) => (
          <TouchableOpacity style={s.card} onPress={() => navigation.navigate('RouteDetail', { routeId: item.id })}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={[s.title, { flex: 1, marginRight: 8 }]}>{item.name}</Text>
              <Badge level={item.difficulty} />
            </View>
            <Text style={s.sub}>📍 {item.region}</Text>
            <Text style={[s.sub, { marginTop: 6 }]}>
              📏 {item.distanceKm} km   ⏱️ {item.durationHrs} h   ⛰️ {item.elevationGainM} m
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
