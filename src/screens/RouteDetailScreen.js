import React, { useState, useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { routes } from '../data/routes';
import { load, save, KEYS } from '../storage';
import { Btn, Badge, common } from '../components';

export default function RouteDetailScreen({ route, navigation }) {
  const trail = routes.find((r) => r.id === route.params.routeId);
  const [favs, setFavs] = useState([]);

  useFocusEffect(useCallback(() => { load(KEYS.favourites, []).then(setFavs); }, []));

  const isFav = favs.includes(trail.id);
  const toggleFav = async () => {
    const next = isFav ? favs.filter((f) => f !== trail.id) : [...favs, trail.id];
    setFavs(next);
    await save(KEYS.favourites, next);
  };

  return (
    <ScrollView style={common.screen}>
      <View style={common.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[common.title, { flex: 1, fontSize: 22 }]}>{trail.name}</Text>
          <Badge level={trail.difficulty} />
        </View>
        <Text style={common.sub}>{trail.region}</Text>
        <Text style={{ marginVertical: 10 }}>{trail.description}</Text>
        <Text>📏 Distance: {trail.distanceKm} km</Text>
        <Text>⏱️ Duration: {trail.durationHrs} hours</Text>
        <Text>⛰️ Elevation gain: {trail.elevationGainM} m</Text>
        <Text>📍 Checkpoints: {trail.checkpoints.length}</Text>
      </View>

      <Btn title={isFav ? '★ Remove from favourites' : '☆ Add to favourites'} outline onPress={toggleFav} />
      <Btn title="📅 Plan this hike" onPress={() => navigation.navigate('PlanHike', { routeId: trail.id })} />
      <Btn title="📍 Checkpoint reference" onPress={() => navigation.navigate('Checkpoints', { routeId: trail.id })} />
      <Btn title="🎒 Packing list" onPress={() => navigation.navigate('Packing', { routeId: trail.id })} />
    </ScrollView>
  );
}
