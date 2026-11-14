import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from './ThemeContext';
import { levelColors } from './theme';

export function Btn({ title, onPress, style, outline, danger, small, color, tint, icon }) {
  const { colors } = useTheme();
  const tintColor = tint || colors.primary;
  const bg = color || (danger ? colors.danger : outline ? 'transparent' : colors.primary);
  const fg = color ? '#DAF1DE' : danger ? '#fff' : outline ? tintColor : colors.onPrimary;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        { backgroundColor: bg, padding: small ? 8 : 13, paddingHorizontal: small ? 14 : 13, borderRadius: 14, alignItems: 'center', marginBottom: small ? 0 : 10 },
        outline && { borderWidth: 1.5, borderColor: tintColor },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon ? <Image source={icon} style={{ width: 22, height: 22, tintColor: fg, marginRight: 10 }} resizeMode="contain" /> : null}
        <Text style={{ color: fg, fontWeight: '700', fontSize: small ? 13 : 15 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function Chip({ label, active, onPress }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderWidth: 1, borderColor: colors.primary, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6,
        marginRight: 8, marginBottom: 8, backgroundColor: active ? colors.primary : 'transparent',
      }}
    >
      <Text style={{ color: active ? colors.onPrimary : colors.primary, fontWeight: '600' }}>{label}</Text>
    </TouchableOpacity>
  );
}

export function Badge({ level }) {
  return (
    <View style={{ backgroundColor: levelColors[level], borderRadius: 10, paddingHorizontal: 10, paddingVertical: 3 }}>
      <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>{level}</Text>
    </View>
  );
}

// Small round button with an emoji (used for the trash and sun/moon icons)
export function IconBtn({ icon, onPress }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: colors.soft, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text style={{ fontSize: 16 }}>{icon}</Text>
    </TouchableOpacity>
  );
}

// transparent = see-through card used on the Home screen
export function StatBox({ value, label, style, transparent }) {
  const { colors, isDark } = useTheme();
  // see-through look: dark mode = clear card, light mode = soft white glass
  const glass = isDark
    ? { backgroundColor: 'rgba(11, 43, 38, 0.75', borderColor: '#235347' }
    : { backgroundColor: 'rgba(255,255,255,0.92)', borderColor: colors.border };
  return (
    <View
      style={[
        { borderRadius: 20, paddingVertical: 20, alignItems: 'center', borderWidth: 1 },
        transparent
          ? glass
          : {
              backgroundColor: colors.card, borderColor: colors.border, elevation: 3,
              shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
            },
        style,
      ]}
    >
      <Text style={{ fontSize: 32, fontWeight: '800', color: transparent && isDark ? '#DAF1DE' : colors.primary }}>{value}</Text>
      <Text style={{ fontSize: 14, color: transparent && isDark ? '#8EB69B' : colors.sub, marginTop: 4 }}>{label}</Text>
    </View>
  );
}

// Photo banner with a title on top
export function PhotoHeader({ source, title, subtitle, height = 130 }) {
  return (
    <ImageBackground
      source={source}
      style={{ height, borderRadius: 20, overflow: 'hidden', justifyContent: 'flex-end', marginBottom: 14 }}
    >
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.45)' }]} />
      <View style={{ padding: 16 }}>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: '800' }}>{title}</Text>
        {subtitle ? <Text style={{ color: '#D7E8DA', marginTop: 2 }}>{subtitle}</Text> : null}
      </View>
    </ImageBackground>
  );
}

export function Empty({ text }) {
  const { colors } = useTheme();
  return <Text style={{ textAlign: 'center', color: colors.sub, marginTop: 30 }}>{text}</Text>;
}
