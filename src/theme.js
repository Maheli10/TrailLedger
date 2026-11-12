import { StyleSheet } from 'react-native';

// Two forest-green colour sets: one for light mode, one for dark mode
export const palettes = {
  // Palette: #051F20 #0B2B26 #163832 #235347 #8EB69B #DAF1DE
  light: {
    bg: '#E6F4E9', card: '#FFFFFF', text: '#051F20', sub: '#4B6F63',
    primary: '#235347', onPrimary: '#DAF1DE', accent: '#8EB69B',
    soft: '#D3EAD8', border: '#BFDCC6', danger: '#C62828',
    header: '#163832', panel: '#235347', inputBg: '#FFFFFF', tabBar: '#FFFFFF',
  },
  dark: {
    bg: '#051F20', card: '#0B2B26', text: '#DAF1DE', sub: '#8EB69B',
    primary: '#8EB69B', onPrimary: '#051F20', accent: '#8EB69B',
    soft: '#163832', border: '#235347', danger: '#EF5350',
    header: '#0B2B26', panel: '#235347', inputBg: '#0B2B26', tabBar: '#04181A',
  },
};

export const levelColors = { Easy: '#43A047', Moderate: '#F9A825', Hard: '#E53935' };

// Styles shared by many screens (they change with the colours)
export function makeStyles(c) {
  return StyleSheet.create({
    screen: { flex: 1, backgroundColor: c.bg, padding: 16 },
    card: {
      backgroundColor: c.card, borderRadius: 18, padding: 14, marginBottom: 12,
      borderWidth: 1, borderColor: c.border,
      elevation: 2, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
    },
    title: { fontSize: 18, fontWeight: '700', color: c.text },
    sub: { color: c.sub, marginTop: 2 },
    text: { color: c.text },
    label: { fontWeight: '600', color: c.text, marginBottom: 6 },
    input: {
      backgroundColor: c.inputBg, color: c.text, borderRadius: 12, borderWidth: 1,
      borderColor: c.border, padding: 12, marginBottom: 14, fontSize: 15,
    },
    row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  });
}
