import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { colors } from './theme';

export function Btn({ title, onPress, style, danger, outline }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        s.btn,
        danger && { backgroundColor: colors.danger },
        outline && { backgroundColor: '#fff', borderWidth: 1, borderColor: colors.primary },
        style,
      ]}
    >
      <Text style={[s.btnText, outline && { color: colors.primary }]}>{title}</Text>
    </TouchableOpacity>
  );
}

export function Chip({ label, active, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[s.chip, active && s.chipActive]}>
      <Text style={{ color: active ? '#fff' : colors.primary, fontWeight: '600' }}>{label}</Text>
    </TouchableOpacity>
  );
}

export function Badge({ level }) {
  return (
    <View style={[s.badge, { backgroundColor: colors[level] }]}>
      <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>{level}</Text>
    </View>
  );
}

export function Empty({ text }) {
  return <Text style={{ textAlign: 'center', color: colors.grey, marginTop: 40 }}>{text}</Text>;
}

export const common = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 12,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  title: { fontSize: 18, fontWeight: '700', color: colors.text },
  sub: { color: colors.grey, marginTop: 2 },
  input: {
    backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#cfd8cf',
    padding: 10, marginBottom: 12, fontSize: 15,
  },
  label: { fontWeight: '600', color: colors.text, marginBottom: 4 },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
});

const s = StyleSheet.create({
  btn: { backgroundColor: colors.primary, padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  chip: {
    borderWidth: 1, borderColor: colors.primary, borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 6, marginRight: 8, marginBottom: 8,
  },
  chipActive: { backgroundColor: colors.primary },
  badge: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
});
