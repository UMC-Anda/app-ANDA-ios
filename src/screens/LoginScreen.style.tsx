import {StyleSheet} from 'react-native';

const LoginStyle = StyleSheet.create({
  loginView: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loginTitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  logo: {
    // width: 100,
    height: 55,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 70,
  },
  inputText: {
    borderBottomColor: '#B3B3B3',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    // width: '80%',
    paddingBottom: 12,
    paddingTop: 12,
    fontSize: 16,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullWidth: {
    width: '80%',
    display: 'flex',
    alignItems: 'flex-start',
  },
  inputWrap: {
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#1CBBD9',
    color: '#fff',
    borderRadius: 4,
    shadowOpacity: 0,
  },
  simpleLoginButton: {
    backgroundColor: '#fff',
    borderColor: '#1CBBD9',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
  },
  CheckBox: {
    marginRight: 8,
  },
});

export default LoginStyle;
