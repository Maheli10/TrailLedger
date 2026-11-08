import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { routes } from '../data/routes';
import { Chip, Badge, Empty, common } from '../components';

const LEVELS = ['All', 'Easy', 'Moderate', 'Hard'];

export default function RoutesScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('All');

  // Searching + filtering the dataset
  const filtered = routes.filter((r) => {
    const matchesText = (r.name + ' ' + r.region).toLowerCase().includes(search.toLowerCase());
    const matchesLevel = level === 'All' || r.difficulty === level;
    return matchesText && matchesLevel;
  });

  return (
    <View style={common.screen}>
      <TextInput
        style={common.input}
        placeholder="Search by name or region..."
        value={search}
        onChangeText={setSearch}
      />
      <View style={common.row}>
        {LEVELS.map((l) => (
          <Chip key={l} label={l} active={level === l} onPress={() => setLevel(l)} />
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Empty text="No routes match your search." />}
        renderItem={({ item }) => (
          <TouchableOpacity style={common.card} onPress={() => navigation.navigate('RouteDetail', { routeId: item.id })}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[common.title, { flex: 1 }]}>{item.name}</Text>
              <Badge level={item.difficulty} />
            </View>
            <Text style={common.sub}>{item.region}</Text>
            <Text style={common.sub}>{item.distanceKm} km · {item.durationHrs} h · +{item.elevationGainM} m</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
