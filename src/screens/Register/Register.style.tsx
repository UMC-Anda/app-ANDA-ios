import {Dimensions, StyleSheet} from 'react-native';

const Width = Dimensions.get('window').width;
const RegisterStyle = StyleSheet.create({
  button: {
    backgroundColor: '#CCCCCC',
    borderRadius: 0,
  },
  nextButton: {
    color: '#ffffff',
    backgroundColor: '#1CB9D9',
    borderRadius: 0,
  },
  label: {
    fontWeight: '700',
    fontSize: 16,
    color: '#ffffff',
  },
  icon: {
    height: 32,
    position: 'absolute',
    width: 32,
    marginLeft: Width * 0.1 - 12,
  },
});

export default RegisterStyle;

export const RegisterTypeStyle = StyleSheet.create({
  header: {
    borderBottomWidth: 0,
  },
  box: {
    flex: 1,
    aspectRatio: 1,
    borderColor: '#1CB9D9',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 12,
    alignContent: 'center',
    justifyContent: 'center',
  },
  contain: {
    height: '100%',
  },
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 50,
    width: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '400',
  },
  titleWrap: {
    alignItems: 'center',
    marginBottom: 37,
  },
});
export const RegisterAgreeStyle = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  wrap: {
    width: '90%',
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
    marginTop: 53,
    marginBottom: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  content: {
    marginLeft: 8,
    fontSize: 14,
  },
  hr: {
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    marginTop: 4,
    marginBottom: 29,
  },
  more: {
    marginLeft: 16,
    textDecorationLine: 'underline',
  },
  headerTitle: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '500',
  },
  header: {
    backgroundColor: '#ffffff',
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    borderStyle: 'solid',
  },
  termsContent: {
    fontSize: 16,
    // flexWrap: 'wrap',
  },
});

export const RegisterInfoStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  wrap: {
    width: '90%',
    paddingTop: 60,
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 0,
    // backgroundColor: '#000',
  },
  button: {
    backgroundColor: '#E6E6E6',
    borderRadius: 4,
    width: 75,
    marginLeft: 16,
  },
  buttonText: {
    color: '#CCCCCC',
  },
  onButtonText: {
    color: '#ffffff',
  },
  onButton: {
    backgroundColor: '#1CB9D9',
    borderRadius: 4,
    width: 75,
    marginLeft: 16,
  },
  // itemWrap: {
  //   marginBottom: 40,
  // },
  success: {
    marginTop: 5,
    color: '#1CB9D9',
  },
  fail: {
    marginTop: 5,
    color: '#FA2F13',
  },
  hospitalList: {
    // position: 'absolute',
    // top: 40,
    width: '100%',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#CCCCCC',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopWidth: 0,
    marginBottom: 40,
    // zIndex: 100,
    // elevation: 100,
  },
  hospitalItem: {
    padding: 12,
    // zIndex: 9999,
    // backgroundColor: '',
  },
  hospitalItemText: {},
  uploadTitle: {
    fontSize: 17,
    marginBottom: 5,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: '#1CB9D9',
    marginBottom: 12,
  },
  folderWrap: {
    borderStyle: 'dashed',
    borderColor: '#1CB9D9',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#D2F3F933',
    justifyContent: 'center',
    padding: 20,
  },
  folderImage: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  fileImage: {
    width: 24,
    height: 24,
  },
  folderText: {
    color: '#1CB9D9',
    fontSize: 14,
    fontWeight: '500',
  },
  fileWrap: {
    borderColor: '#F2F2F2',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingHorizontal: 22,
    paddingVertical: 14,
    paddingRight: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 10,?
  },
  filename: {
    flex: 1,
    // marginRight: 10,
    marginLeft: 10,
  },
});

// export const RegisterInfoStyle
// export default {RegisterTypeStyle, RegisterAgreeStyle};
// export RegisterTypeStyle;
