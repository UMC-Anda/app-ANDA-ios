import {
  View,
  Text,
  TouchableNativeFeedback,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CheckBox from '../../components/CheckBox';
import {RegisterAgreeStyle as style} from './Register.style';
import {useSetRecoilState} from 'recoil';
import {Appbar} from 'react-native-paper';
import {readyButton, registerTerms} from '../../state/register';

const TermsModal = function ({visible, setVisible}: any): JSX.Element {
  return (
    <Modal visible={visible}>
      {/* <SafeAreaView> */}
      <Appbar.Header style={style.header}>
        <Appbar.BackAction size={18} onPress={setVisible} />
        <Appbar.Content title="약관동의" titleStyle={style.headerTitle} />
      </Appbar.Header>
      <ScrollView style={{padding: 5}}>
        {/* <Text style={style.termsContent}> */}
        {/* {`asdfasdfadsjadskasdfjlasdjkasdklfasa s;alsjfdl;aasdf jlas;djk
          l;sjlassml asdfsaasdnlfkasnflkja alskflasjflkasjlfasl;
          asvnlkasnlkvasdlas;jva sadfljhdasest`.split} */}
        {/* </Text> */}
      </ScrollView>
      {/* </SafeAreaView> */}
    </Modal>
  );
};
const Item = function ({
  checked,
  setChecked,
  title,
  func,
  more,
  onPress,
}: any): JSX.Element {
  return (
    <View style={style.row}>
      <CheckBox
        checked={checked}
        setChecked={() => {
          if (func) {
            func();
          } else {
            setChecked(!checked);
          }
        }}
        size={20}
      />
      <Text style={style.content}>{title}</Text>
      {more && (
        <TouchableNativeFeedback onPress={onPress}>
          <Text style={style.more}>보기</Text>
        </TouchableNativeFeedback>
      )}
    </View>
  );
};
const RegisterAgree = function (): JSX.Element {
  const [all, setAll] = useState(false);
  const [over14, setOver14] = useState(false);
  const [useTerms, setUseTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [ad, setAd] = useState(false);
  const setReady = useSetRecoilState(readyButton);
  const setTerms = useSetRecoilState(registerTerms);
  const [visible, setVisible] = useState(false);
  const allBtnEvent = () => {
    if (all === false) {
      setAll(true);
      setOver14(true);
      setPrivacy(true);
      setUseTerms(true);
      setAd(true);
    } else {
      setAll(false);
      setOver14(false);
      setPrivacy(false);
      setUseTerms(false);
      setAd(false);
    }
  };

  useEffect(() => {
    setAll(over14 && useTerms && privacy && ad);
    setReady(over14 && useTerms && privacy);
    setTerms({
      isOverAge: over14,
      isTermsOfUseAgree: useTerms,
      isPrivacyPolicyAgree: privacy,
      isMarketingInfoAgree: ad,
    });
  }, [over14, useTerms, privacy, ad, setReady, setTerms]);

  return (
    <View style={style.container}>
      <TermsModal
        visible={visible}
        setVisible={() => {
          setVisible(false);
        }}
      />
      <View style={style.wrap}>
        <Text style={style.title}>
          안다 서비스{'\n'}이용약관에 동의해주세요.
        </Text>
        <Item
          title="모두 동의(선택 정보 포함)"
          checked={all}
          func={allBtnEvent}
          setChecked={setAll}
        />
        <View style={style.hr} />

        <Item
          title="[필수] 만 14세 이상"
          checked={over14}
          setChecked={setOver14}
        />
        <Item
          title="[필수] 이용약관 동의"
          checked={useTerms}
          setChecked={setUseTerms}
          more={true}
          onPress={() => {
            setVisible(true);
          }}
        />
        <Item
          title="[필수] 개인정보 처리방침 동의"
          checked={privacy}
          setChecked={setPrivacy}
          more={true}
          onPress={() => {
            setVisible(true);
          }}
        />
        <Item
          title="[선택] 광고성 정보 수신 및 마케팅 활용 동의"
          checked={ad}
          setChecked={setAd}
          more={true}
          onPress={() => {
            setVisible(true);
            console.log(visible);
          }}
        />
      </View>
    </View>
  );
};

export default RegisterAgree;
