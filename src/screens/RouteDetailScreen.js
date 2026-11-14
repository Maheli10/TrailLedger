import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { routeById } from '../data/routes';
import { useTheme } from '../ThemeContext';
import { Btn, Badge, PhotoHeader } from '../components';

export default function RouteDetailScreen({ route, navigation }) {
  const { colors, s } = useTheme();
  const trail = routeById(route.params.routeId);

  const stats = [
    { value: trail.distanceKm, unit: 'km', label: 'Distance' },
    { value: trail.durationHrs, unit: 'h', label: 'Est. time' },
    { value: trail.elevationGainM, unit: 'm', label: 'Elevation' },
  ];

  return (
    <ScrollView style={s.screen}>
      <PhotoHeader source={require('../../assets/banner.jpg')} title={trail.name} subtitle={`📍 ${trail.region}`} height={150} />

      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <Badge level={trail.difficulty} />
      </View>

      {/* Green stats panel */}
      <View style={{ flexDirection: 'row', backgroundColor: colors.panel, borderRadius: 18, paddingVertical: 16, marginBottom: 12 }}>
        {stats.map((st) => (
          <View key={st.label} style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: '#DAF1DE', fontSize: 22, fontWeight: '800' }}>
              {st.value}
              <Text style={{ fontSize: 13, fontWeight: '500' }}> {st.unit}</Text>
            </Text>
            <Text style={{ color: '#BFDCC6', fontSize: 12, marginTop: 2 }}>{st.label}</Text>
          </View>
        ))}
      </View>

      <View style={s.card}>
        <Text style={s.title}>About this trail</Text>
        <Text style={[s.text, { marginTop: 6, lineHeight: 21 }]}>{trail.description}</Text>
      </View>

      <View style={s.card}>
        <Text style={[s.title, { marginBottom: 8 }]}>Checkpoints</Text>
        {trail.checkpoints.map((c, i) => (
          <View key={c.name} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 }}>
            <Text style={s.text}>{i + 1}. {c.name}</Text>
            <Text style={{ color: colors.sub }}>{c.elevationM} m</Text>
          </View>
        ))}
      </View>

      <Btn title="📅  Plan this hike" onPress={() => navigation.navigate('PlanHike', { routeId: trail.id })} />
    </ScrollView>
  );
}
