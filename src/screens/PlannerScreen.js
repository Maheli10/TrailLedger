import React, { useState, useCallback } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { routeById, hikeName, BASE_GEAR } from '../data/routes';
import { load, save, KEYS } from '../storage';
import { MONTHS } from '../helpers';
import { useTheme } from '../ThemeContext';
import { Btn, Empty, IconBtn, PhotoHeader } from '../components';

export default function PlannerScreen({ navigation }) {
  const { colors, s } = useTheme();
  const [plans, setPlans] = useState([]);
  const [packed, setPacked] = useState({});

  useFocusEffect(
    useCallback(() => {
      load(KEYS.plans, []).then(setPlans);
      load(KEYS.packed, {}).then(setPacked);
    }, [])
  );

  const remove = (id) => {
    Alert.alert('Delete plan?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          setPlans(plans.filter((p) => p.id !== id));
          await save(KEYS.plans, plans.filter((p) => p.id !== id));
          const { [id]: removed, ...rest } = packed;
          setPacked(rest);
          await save(KEYS.packed, rest);
        },
      },
    ]);
  };

  const sorted = [...plans].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <View style={s.screen}>
      <FlatList
        data={sorted}
        keyExtractor={(p) => p.id}
        ListHeaderComponent={
          <PhotoHeader source={require('../../assets/banner.jpg')} title="My Hike Planner" subtitle={`${plans.length} planned`} />
        }
        ListEmptyComponent={<Empty text="No hikes planned yet. Tap '+ Plan your hike' below." />}
        renderItem={({ item }) => {
          const trail = routeById(item.routeId);
          const total = BASE_GEAR.length + (trail ? trail.extraGear.length : 0);
          const done = (packed[item.id] || []).length;
          const day = item.date.slice(8, 10);
          const month = MONTHS[Number(item.date.slice(5, 7)) - 1];
          return (
            <View style={[s.card, { flexDirection: 'row' }]}>
              <View style={{ width: 56, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.soft, borderRadius: 14, marginRight: 12, paddingVertical: 8 }}>
                <Text style={{ fontSize: 22, fontWeight: '800', color: colors.primary }}>{day}</Text>
                <Text style={{ fontSize: 12, fontWeight: '700', color: colors.sub }}>{month}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ flex: 1, marginRight: 8 }} onPress={() => navigation.navigate('PlanHike', { planId: item.id })}>
                    <Text style={s.title}>{hikeName(item)}</Text>
                  </TouchableOpacity>
                  <IconBtn icon="🗑️" onPress={() => remove(item.id)} />
                </View>

                {item.notes ? <Text style={s.sub} numberOfLines={2}>{item.notes}</Text> : null}

                {/* Packing progress bar */}
                <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.soft, marginTop: 10 }}>
                  <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.primary, width: `${(done / total) * 100}%` }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  <Text style={{ color: colors.sub, fontSize: 12 }}>{done}/{total} packed</Text>
                  <Btn title="Plan more →" outline small onPress={() => navigation.navigate('PlanHike', { planId: item.id })} />
                </View>
              </View>
            </View>
          );
        }}
      />
      <Btn title="+ Plan your hike" onPress={() => navigation.navigate('PlanHike', {})} style={{ marginTop: 8, marginBottom: 0 }} />
    </View>
  );
}
