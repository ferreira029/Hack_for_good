import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Linking } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clickButton } from './../../redux/action';
import style from './../../globalStyle';

const ModalComponent = (props) => {

  const { clickButton, visibleHelp } = props;
  const [modalVisible, setModalVisible] = useState(false);

  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=+55${props.whatsapp}&text=${props.message}`);
  }

  function sendTelegram() {
    Linking.openURL(`telegram://send?phone=+55${props.whatsapp}&text=${props.message}`);
  }

  return(
    <View style={style.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visibleHelp}
        onRequestClose={() => {}}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <View style={style.headerModal}>
              <MaterialIcons style={{color: `${props.colorIcon}`, marginBottom: 18}} name={`${props.nameIcon}`} size={32} />
              <Text style={style.titleModal}>{ props.title }</Text>
            </View>
            <View style={style.bodyModal}>
              <Text style={style.textModal}><Text style={style.textBold}>Compartilhe o app Verify para ajudar a acabar com as Fake News!</Text> #CompartilheaVerdade #VerifyApp</Text>
            </View>
            <View>
              { props.children }
            </View>
            <View style={style.viewFont}>
              <MaterialIcons name="remove-red-eye" size={20} />
              <Text style={style.textLinks}>Fontes</Text>
            </View>
            <View style={style.viewLinks}>
              <Text style={style.textLinks}> https://g1.globo.com/ | https://uol.com.br/ | https://saude.gov.br </Text>
            </View>
            { props.share ?
              <>
                <View style={style.viewFont}>
                  <MaterialIcons name="share" size={20} />
                  <Text style={style.textLinks}>Compartilhar</Text>
                </View>
                <View style={style.viewIcons}>
                  <View style={{justifyContent: "center", alignItems: "center", width: 90}}>
                    <TouchableOpacity onPress={sendWhatsApp}>
                      <Feather style={{color: "#525252", marginLeft: 30}} name="message-circle" size={32} />
                      <Text style={style.textIcons}>Whatsapp</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{justifyContent: "center", alignItems: "center", width: 90}}>
                    <TouchableOpacity onPress={sendTelegram}>
                      <Feather style={{color: "#525252", marginLeft: 30}} name="send" size={32} />
                      <Text style={style.textIcons}>Telegram</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{justifyContent: "center", alignItems: "center", width: 90}}>
                    <Feather style={{color: "#525252", marginLeft: 30}} name="mail" size={32} />
                    <Text style={style.textIcons}>E-mail</Text>
                  </View>
                </View>
              </>
            :
              <React.Fragment />
            }

            <TouchableOpacity onPress={() => clickButton(!visibleHelp)} style={style.buttonValidate}>
              <Text style={style.textButton}>VOLTAR À PESQUISAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ModalComponent;