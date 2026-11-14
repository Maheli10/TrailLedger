import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { routes, routeById, hikeName, BASE_GEAR } from '../data/routes';
import { load, save, KEYS } from '../storage';
import { todayStr, validDate } from '../helpers';
import { useTheme } from '../ThemeContext';
import { Btn } from '../components';

// One screen to: name the hike, pick a date, add notes and tick the packing list.
// Opened from "Plan this hike" (route name pre-filled), "+ Plan your hike" (empty) or "Plan more" (existing plan).
export default function PlanHikeScreen({ route, navigation }) {
  const { colors, s } = useTheme();
  const planId = route.params?.planId;
  const startRoute = routeById(route.params?.routeId);

  const [name, setName] = useState(startRoute ? startRoute.name : '');
  const [routeId, setRouteId] = useState(startRoute ? startRoute.id : null);
  const [date, setDate] = useState(todayStr());
  const [notes, setNotes] = useState('');
  const [packed, setPacked] = useState([]);
  const [showList, setShowList] = useState(false);
  const [search, setSearch] = useState('');

  // When editing an existing plan, load its saved details
  useEffect(() => {
    if (!planId) return;
    navigation.setOptions({ title: 'Plan More' });
    (async () => {
      const plans = await load(KEYS.plans, []);
      const p = plans.find((x) => x.id === planId);
      if (p) {
        setName(hikeName(p));
        setRouteId(p.routeId || null);
        setDate(p.date);
        setNotes(p.notes || '');
      }
      const all = await load(KEYS.packed, {});
      setPacked(all[planId] || []);
    })();
  }, []);

  // Packing list = basic gear + extra gear of the chosen route (if any)
  const trail = routeById(routeId);
  const items = [...BASE_GEAR, ...(trail ? trail.extraGear : [])];

  const onNameChange = (text) => {
    setName(text);
    if (trail && text !== trail.name) setRouteId(null); // typed a different name
  };

  const pickRoute = (r) => {
    setRouteId(r.id);
    setName(r.name);
    setShowList(false);
    setSearch('');
  };

  const toggleItem = (item) =>
    setPacked(packed.includes(item) ? packed.filter((i) => i !== item) : [...packed, item]);

  const onSave = async () => {
    if (!name.trim()) return Alert.alert('Missing name', 'Type a hike name or choose a route.');
    if (!validDate(date)) return Alert.alert('Invalid date', 'Please use YYYY-MM-DD, e.g. 2026-12-24');

    const id = planId || Date.now().toString();
    const plan = { id, name: name.trim(), routeId, date, notes };
    const plans = await load(KEYS.plans, []);
    await save(KEYS.plans, planId ? plans.map((p) => (p.id === planId ? plan : p)) : [...plans, plan]);

    const all = await load(KEYS.packed, {});
    all[id] = packed.filter((i) => items.includes(i));
    await save(KEYS.packed, all);

    navigation.navigate('Main', { screen: 'Planner' });
  };

  const matches = routes.filter((r) => (r.name + ' ' + r.region).toLowerCase().includes(search.toLowerCase()));

  return (
    <ScrollView style={s.screen} keyboardShouldPersistTaps="handled">
      <Text style={s.label}>Hike name</Text>
      <TextInput
        style={[s.input, { marginBottom: 8 }]}
        placeholder="Type a name, e.g. Sunday walk"
        placeholderTextColor={colors.sub}
        value={name}
        onChangeText={onNameChange}
      />
      <Btn
        title={showList ? 'Hide route list' : '🔍  Choose from route list'}
        outline small style={{ marginBottom: 14 }}
        onPress={() => setShowList(!showList)}
      />

      {showList && (
        <View style={s.card}>
          <TextInput
            style={s.input}
            placeholder="Search routes..."
            placeholderTextColor={colors.sub}
            value={search}
            onChangeText={setSearch}
          />
          {matches.map((r) => (
            <TouchableOpacity
              key={r.id}
              onPress={() => pickRoute(r)}
              style={{ paddingVertical: 10, borderTopWidth: 1, borderColor: colors.border }}
            >
              <Text style={s.title}>{r.name}</Text>
              <Text style={s.sub}>{r.region} · {r.difficulty}</Text>
            </TouchableOpacity>
          ))}
          {matches.length === 0 && <Text style={s.sub}>No routes found. You can type your own name above.</Text>}
        </View>
      )}

      <Text style={s.label}>Hike date (YYYY-MM-DD)</Text>
      <TextInput style={s.input} value={date} onChangeText={setDate} />

      <Text style={s.label}>Notes</Text>
      <TextInput
        style={[s.input, { height: 90, textAlignVertical: 'top' }]}
        placeholder="Meeting point, who is coming..."
        placeholderTextColor={colors.sub}
        multiline value={notes} onChangeText={setNotes}
      />

      <View style={s.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
          <Text style={s.title}>🎒 Packing list</Text>
          <Text style={{ color: colors.primary, fontWeight: '700' }}>
            {packed.filter((i) => items.includes(i)).length}/{items.length}
          </Text>
        </View>
        {items.map((item) => {
          const done = packed.includes(item);
          return (
            <TouchableOpacity key={item} onPress={() => toggleItem(item)} style={{ paddingVertical: 8 }}>
              <Text style={{ fontSize: 15, color: done ? colors.sub : colors.text, textDecorationLine: done ? 'line-through' : 'none' }}>
                {done ? '☑️' : '⬜'}  {item}{trail && trail.extraGear.includes(item) ? '  (route gear)' : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Btn title="Save plan" onPress={onSave} style={{ marginBottom: 30 }} />
    </ScrollView>
  );
}
