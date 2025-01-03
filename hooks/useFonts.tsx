import { useFonts } from 'expo-font';

export default function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    'gilroy-medium': require('../assets/fonts/Gilroy-Medium.ttf'),
    'gilroy-medium-italic': require('../assets/fonts/Gilroy-MediumItalic.ttf'),
    'gilroy-regular': require('../assets/fonts/Gilroy-Regular.ttf'),
    'gilroy-regular-italic': require('../assets/fonts/Gilroy-RegularItalic.ttf'),
    'gilroy-light': require('../assets/fonts/Gilroy-Light.otf'),
    'gilroy-bold': require('../assets/fonts/Gilroy-ExtraBold.otf')
  });

  return fontsLoaded;
}
