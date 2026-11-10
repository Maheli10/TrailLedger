import React, { useState, useCallback } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { routes } from '../data/routes';
import { load, KEYS } from '../storage';
import { Btn, Empty, common } from '../components';

export default function LogScreen({ navigation }) {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');

  useFocusEffect(useCallback(() => { load(KEYS.logs, []).then(setLogs); }, []));

  const shown = logs
    .filter((l) => {
      const trail = routes.find((r) => r.id === l.routeId);
      return trail.name.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <View style={common.screen}>
      <TextInput style={common.input} placeholder="Search your log..." value={search} onChangeText={setSearch} />
      <FlatList
        data={shown}
        keyExtractor={(l) => l.id}
        ListEmptyComponent={<Empty text="No hikes logged yet." />}
        renderItem={({ item }) => {
          const trail = routes.find((r) => r.id === item.routeId);
          return (
            <TouchableOpacity style={common.card} onPress={() => navigation.navigate('LogDetail', { logId: item.id })}>
              <Text style={common.title}>{trail.name}</Text>
              <Text style={common.sub}>{item.date} · {item.hours} h · {'⭐'.repeat(item.rating)}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <Btn title="+ New log entry" onPress={() => navigation.navigate('AddLog')} />
    </View>
  );
}
