import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from './../../service/api';
import imgLogo from './../../assets/logo_purple.png';
import style from './styles';

const Search = () => {

  const navigation = useNavigation();

  const [textValidate, setTextValidate] = useState('');
  const [modalHelp, setModalHelp] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);

  function goBack() {
    navigation.goBack();
  }

  function handleLogout() {
    navigation.navigate('Home');
  }

  async function handleSearch(search) {
    try {
      const response = await api.post('search', search);
      console.log(response);
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
        <TouchableOpacity onPress={() => {console.log('validação')}} style={style.buttonValidate}>
          <Text style={style.textButton}>VALIDAR</Text>
        </TouchableOpacity>
      </View>
      {/* Modal Help */}
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
      {/* Modal Logout */}
      <View style={style.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalLogout}
          onRequestClose={() => {}}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <View style={style.headerModal}>
                <MaterialIcons name="help" size={20} />
                <Text style={style.textModal}>Ajuda</Text>
                <Text onPress={() => {setModalLogout(!modalLogout)}}><MaterialIcons name="close" size={20} /></Text>
              </View>
                <Text style={style.titleModal}>Deseja mesmo sair?</Text>
                <TouchableOpacity onPress={handleLogout} style={style.buttonModalConfirm}>
                  <Text style={style.textButton}>SIM</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalLogout(!modalLogout)}} style={style.buttonModalCancel}>
                  <Text style={style.textButton}>NÃO</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default Search;