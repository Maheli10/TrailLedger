// Local storage helpers (works offline, data stays on the phone)
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function load(key, fallback) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (e) {
    return fallback;
  }
}

export async function save(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

// Storage keys used across the app
export const KEYS = {
  plans: 'tl_plans',          // [{id, name, routeId, date, notes}]
  logs: 'tl_logs',            // [{id, name, routeId, date, hours, rating, notes}]
  packed: 'tl_plan_packed',   // { planId: [itemName, ...] }
  theme: 'tl_theme',          // 'light' or 'dark'
};
