import React, { useState, useCallback } from 'react';
import { Alert, FlatList, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { hikeName } from '../data/routes';
import { load, save, KEYS } from '../storage';
import { useTheme } from '../ThemeContext';
import { Btn, Empty, IconBtn, PhotoHeader } from '../components';

export default function LogScreen({ navigation }) {
  const { colors, s } = useTheme();
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');

  useFocusEffect(useCallback(() => { load(KEYS.logs, []).then(setLogs); }, []));

  const remove = (id) => {
    Alert.alert('Delete entry?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          const next = logs.filter((l) => l.id !== id);
          setLogs(next);
          await save(KEYS.logs, next);
        },
      },
    ]);
  };

  const shown = logs
    .filter((l) => hikeName(l).toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <View style={s.screen}>
      <FlatList
        data={shown}
        keyExtractor={(l) => l.id}
        ListHeaderComponent={
          <View>
            <PhotoHeader source={require('../../assets/banner.jpg')} title="My Hike Log" subtitle={`${logs.length} hikes recorded`} />
            <TextInput
              style={s.input}
              placeholder="Search your log..."
              placeholderTextColor={colors.sub}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        }
        ListEmptyComponent={<Empty text="No hikes logged yet." />}
        renderItem={({ item }) => (
          <View style={s.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[s.title, { flex: 1, marginRight: 8 }]}>{hikeName(item)}</Text>
              <IconBtn icon="🗑️" onPress={() => remove(item.id)} />
            </View>
            <Text style={s.sub}>📅 {item.date}   ⏱️ {item.hours} h   {'⭐'.repeat(item.rating)}</Text>
            {item.notes ? <Text style={[s.text, { marginTop: 8 }]}>{item.notes}</Text> : null}
          </View>
        )}
      />
      <Btn title="+ New log entry" onPress={() => navigation.navigate('AddLog')} style={{ marginTop: 8, marginBottom: 0 }} />
    </View>
  );
}
