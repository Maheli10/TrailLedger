import React, { useState, useCallback } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { load, KEYS } from '../storage';
import { routes, routeById } from '../data/routes';
import { useTheme } from '../ThemeContext';
import { Btn, IconBtn, StatBox } from '../components';

// Dark mode: Home uses this dark green below the photo (light mode uses the normal background)
const HOME_BG_DARK = '#0F2027';
const TAGLINE_COLOR = '#8EB69B';
const TAGLINE = ['Discover', 'Plan', 'Remember'];

export default function HomeScreen({ navigation }) {
  const { colors, isDark, toggle } = useTheme();
  const HOME_BG = isDark ? HOME_BG_DARK : colors.bg;
  const insets = useSafeAreaInsets();
  const [plans, setPlans] = useState([]);
  const [logs, setLogs] = useState([]);

  // Reload every time this screen comes into view
  useFocusEffect(
    useCallback(() => {
      load(KEYS.plans, []).then(setPlans);
      load(KEYS.logs, []).then(setLogs);
    }, [])
  );

  // Km hiked = distance of every logged hike that uses a listed route
  const totalKm = logs.reduce((sum, l) => sum + ((routeById(l.routeId) || {}).distanceKm || 0), 0);

  const card = { width: '48%', marginBottom: 12 };

  return (
    // flexGrow makes the content fill the whole screen, so there is no empty space at the bottom
    <ScrollView style={{ flex: 1, backgroundColor: HOME_BG }} contentContainerStyle={{ flexGrow: 1, backgroundColor: HOME_BG }}>
      <ImageBackground
        source={require('../../assets/hero.jpg')}
        style={{ flex: 1, minHeight: 300, justifyContent: 'space-between', paddingTop: insets.top + 10, paddingHorizontal: 18, paddingBottom: 24 }}
      >
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.4)' }]} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Image source={require('../../assets/logo-light.png')} style={{ width: 56, height: 46 }} resizeMode="contain" />
          <IconBtn icon={isDark ? '🌙' : '☀️'} onPress={toggle} />
        </View>
        <View>
          <Text style={{ color: '#fff', fontSize: 38, fontWeight: '800', marginBottom: 6 }}>TrailLedger</Text>
          {TAGLINE.map((word) => (
            <Text key={word} style={{ color: TAGLINE_COLOR, fontSize: 19, fontWeight: '600', letterSpacing: 1, lineHeight: 26 }}>
              {word}
            </Text>
          ))}
        </View>
      </ImageBackground>

      <View style={{ paddingHorizontal: 16, marginTop: 16, paddingBottom: 20 }}>
        {/* Transparent stat cards in 2 rows */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <StatBox key={`routes-${isDark}`} transparent value={routes.length} label="Routes" style={card} />
          <StatBox key={`planned-${isDark}`} transparent value={plans.length} label="Planned" style={card} />
          <StatBox key={`logged-${isDark}`} transparent value={logs.length} label="Logged" style={card} />
          <StatBox key={`km-${isDark}`} transparent value={totalKm} label="Km hiked" style={card} />
        </View>

        <Btn title="Explore Routes" icon={require('../../assets/tab-routes.png')} color="#235347" onPress={() => navigation.navigate('Routes')} />
        <Btn title="Plan Your Hike" icon={require('../../assets/tab-planner.png')} outline tint={isDark ? '#8EB69B' : colors.primary} onPress={() => navigation.navigate('PlanHike', {})} />
        <Btn title="Add to Log" icon={require('../../assets/tab-log.png')} outline tint={isDark ? '#8EB69B' : colors.primary} onPress={() => navigation.navigate('AddLog')} />
      </View>
    </ScrollView>
  );
}
