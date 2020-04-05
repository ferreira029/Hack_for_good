import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Image } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from './../../service/api';
import imgLogo from './../../assets/logo_purple.png';
import style from './styles';

const Search = () => {

  const navigation = useNavigation();

  const [textValidate, setTextValidate] = useState('');
  const [data, setData] = useState({});
  const [modalHelp, setModalHelp] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);
  const [modalValidate, setModalValidate] = useState(false);

  function goBack() {
    navigation.goBack();
  }

  function handleLogout() {
    navigation.navigate('Home');
  }

  async function handleSearch(search) {
    try {
      console.log('caiu no Try');
      const response = await api.post('search', { data: search });
      await setData(response.data);
      setModalValidate(true);
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <View style={style.container}>
      <View style={style.header}>
        <Text onPress={goBack}><MaterialIcons name="arrow-back" size={20} /></Text>
        <Image source={imgLogo} style={style.logo} />
        <Text onPress={() => {setModalHelp(true)}}><MaterialIcons name="help" size={20} /></Text>
        <Text onPress={() => {setModalLogout(true)}}><MaterialIcons name="close" size={20} /></Text>
      </View>
      <View style={style.body}>
        <View style={style.containerInputs}>
          <Text style={style.title}>Olá, Mariana</Text>
          <Text style={style.textInput}>Valide seu texto/link</Text>
          <TextInput
            multiline={true}
            numberOfLines={6}
            style={style.input}
            value={textValidate}
            onChangeText={value => setTextValidate(value)}
          />
        </View>
        <TouchableOpacity onPress={() => {handleSearch(textValidate)}} style={style.buttonValidate}>
          <Text style={style.textButton}>VALIDAR</Text>
        </TouchableOpacity>
      </View>

      <View style={style.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalHelp}
          onRequestClose={() => {}}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <View style={style.headerModal}>
                <MaterialIcons name="help" size={20} />
                <Text style={style.textModal}>Ajuda</Text>
                <Text onPress={() => {setModalHelp(!modalHelp)}}><MaterialIcons name="close" size={20} /></Text>
              </View>
              <View>
                <Text style={style.titleModal}>Instrução:</Text>
                <Text style={style.textInput}>1- Insira seu link ou texto no campo abaixo;</Text>
                <Text style={style.textInput}>2- Clique no botão Validar;</Text>
                <Text style={style.textInput}>OBS.: O campo vai ser validado automáticamente pelo nosso robozinho de pesquisa, agora é só esperar e seu texto será validado.</Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      { data.Error ? /* Modal Error */
      <View style={style.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalValidate}
        onRequestClose={() => {}}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <View style={style.headerModal}>
              <MaterialIcons style={{color: "#F84949"}} name="cancel" size={32} />
              <Text style={style.titleModal}>A notícia é <Text style={style.textBold}>falsa</Text>.</Text>
            </View>
            <View style={style.bodyModal}>
              <Text style={style.textModal}><Text style={style.textBold}>Compartilhe o app Verify para ajudar a acabar com as Fake News!</Text> #CompartilheaVerdade #VerifyApp</Text>
            </View>
            <View style={style.viewFont}>
              <MaterialIcons name="remove-red-eye" size={20} />
              <Text style={style.textLinks}>Ver fontes consultadas</Text>
            </View>
            <View style={style.viewLinks}>
              <Text style={style.textLinks}> https://g1.globo.com/ | https://uol.com.br/ | https://saude.gov.br </Text>
            </View>
            <View style={style.viewFont}>
              <MaterialIcons name="share" size={20} />
              <Text style={style.textLinks}>Compartilhar</Text>
            </View>
            <View style={style.viewIcons}>
              <View style={{justifyContent: "center", alignItems: "center", width: 90}}>
                <Feather style={{color: "#525252", marginLeft: 30}} name="message-circle" size={32} />
                <Text style={style.textIcons}>Whatsapp</Text>
              </View>
              <View style={{justifyContent: "center", alignItems: "center", width: 90}}>
                <Feather style={{color: "#525252", marginLeft: 30}} name="send" size={32} />
                <Text style={style.textIcons}>Telegram</Text>
              </View>
              <View style={{justifyContent: "center", alignItems: "center", width: 90}}>
                <Feather style={{color: "#525252", marginLeft: 30}} name="mail" size={32} />
                <Text style={style.textIcons}>E-mail</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => {setModalValidate(!modalValidate)}} style={style.buttonModalConfirm}>
              <Text style={style.textButton}>NOVA PESQUISA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
      :/* Modal Approve */
      <View style={style.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalValidate}
          onRequestClose={() => {}}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <View style={style.headerModal}>
                <MaterialIcons style={style.textIcon} name="check-circle" size={32} />
                <Text style={style.titleModal}>A notícia é <Text style={style.textBold}>verdadeira</Text>.</Text>
              </View>
              <View style={style.bodyModal}>
                <Text style={style.textModal}><Text style={style.textBold}>Lavar as mãos por 20 segundos previne Coronavírus.</Text> #CompartilheaVerdade #VerifyApp</Text>
              </View>
              <View style={style.viewFont}>
                <MaterialIcons name="remove-red-eye" size={20} />
                <Text style={style.textLinks}>Ver fontes consultadas</Text>
              </View>
              <View style={style.viewLinks}>
                <Text style={style.textLinks}> {data.Site} </Text>
              </View>
              <View style={style.viewFont}>
                <MaterialIcons name="share" size={20} />
                <Text style={style.textLinks}>Compartilhar</Text>
              </View>
              <View style={style.viewIcons}>
                <View style={{justifyContent: "center", alignItems: "center", width: 90}}>
                  <Feather style={{color: "#525252", marginLeft: 30}} name="message-circle" size={32} />
                  <Text style={style.textIcons}>Whatsapp</Text>
                </View>
                <View style={{justifyContent: "center", alignItems: "center", width: 90}}>
                  <Feather style={{color: "#525252", marginLeft: 30}} name="send" size={32} />
                  <Text style={style.textIcons}>Telegram</Text>
                </View>
                <View style={{justifyContent: "center", alignItems: "center", width: 90}}>
                  <Feather style={{color: "#525252", marginLeft: 30}} name="mail" size={32} />
                  <Text style={style.textIcons}>E-mail</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => {setModalValidate(!modalValidate)}} style={style.buttonModalConfirm}>
                <Text style={style.textButton}>NOVA PESQUISA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      }

      {/* <View style={style.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalValidate}
          onRequestClose={() => {}}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <View style={style.headerModal}>
                <MaterialIcons name="help" size={20} />
                <Text style={style.textModal}>Ajuda</Text>
                <Text onPress={() => {setModalValidate(!modalValidate)}}><MaterialIcons name="close" size={20} /></Text>
              </View>
                <Text style={style.titleModal}>Deseja mesmo sair?</Text>
                <TouchableOpacity onPress={handleSearch} style={style.buttonModalConfirm}>
                  <Text style={style.textButton}>SIM</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalValidate(!modalValidate)}} style={style.buttonModalCancel}>
                  <Text style={style.textButton}>NÃO</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View> */}
      
    </View>
  );
}

export default Search;