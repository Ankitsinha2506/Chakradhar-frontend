import { useWindowDimensions } from 'react-native';

export const colors = {
  background: '#FAF7F2', surface: '#FFFFFF', ink: '#30251F', muted: '#7A6B60',
  primary: '#A44826', gold: '#D4A65A', border: '#E9E0D5', soft: '#F3E9DA',
};
export function useLayout() {
  const { width } = useWindowDimensions();
  const padding = width < 600 ? 20 : 36;
  const contentWidth = Math.min(width, 1200) - padding * 2;
  const columns = width < 380 ? 1 : width < 700 ? 2 : width < 1050 ? 3 : 4;
  return { width, wide: width >= 800, padding, contentWidth, columns,
    cardWidth: (contentWidth - (columns - 1) * 16) / columns };
}
