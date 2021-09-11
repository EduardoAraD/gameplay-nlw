import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'flex-end',
  },
  container: {
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: getBottomSpace() + 0,
  },
  content: {
    flexDirection: 'row',
    marginBottom: 27,
  },
  title: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 20,
  },
  contentButton: {
    flexDirection: 'row'
  },
  notButton: {
    height: 56,
    width: 160,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.secondary30,
  },
  yesButton: {
    height: 56,
    width: 160,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    marginLeft: 8,
  },
  textButton: {
    fontSize: 15,
    fontFamily: theme.fonts.text500,
    color: theme.colors.heading,
  },
});