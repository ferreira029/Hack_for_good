import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from './../../service/api';
import imgLogo from './../../assets/logo_purple.png';
import style from './../../globalStyle';

const Register = () => {

  const navigation = useNavigation();
  const [whatsapp, setWhatsapp] = useState('');
  const [data, setData] = useState('');
  const [modalVisible, setModalVisible] = useState('');

  function goBack() {
    navigation.goBack();
  }

  function navigateToSearch(userData) {
    if (!userData) {
      setData('Variável está undefined');
      setModalVisible(true);
    }
    navigation.navigate('Search', { userData });
  }

  async function handleSearch(whats) {
    try {
      if (!whats) {
        setData('\nPor favor, Preencha o campo de texto\n');
        setModalVisible(true);
      } else {
        const response = await api.post('login', { whatsapp: whats });
        if (!response) {
          setData('Desculpe mas não foi encontrado o seu número do whatsapp no nosso sistema :(\nRecomendamos que você volte para a tela de cadastro e se torne um Verifier :)');
          setModalVisible(true);
        } else {
          navigateToSearch(response.data);
        }
      }
    } catch (error) {
      setData('\nDesculpe, mas seu cadastro não foi encontrado :(\n\nVolte a tela de cadastro para se tornar um Verifier :)\n');
      setModalVisible(true);
    }
  }

  return(
    <View style={style.container}>
      <View style={style.header}>
        <Text onPress={goBack}><MaterialIcons name="arrow-back" size={20} /></Text>
        <Image source={imgLogo} style={style.logo} />
        <Text onPress={() => {setData(''); setModalVisible(true)}}><MaterialIcons name="help" size={20} /></Text>
      </View>
      <View style={style.body}>
        <View style={style.containerInputs}>
          <Text style={style.title}>Login</Text>
          <Text style={style.text}>Número de WhatsApp</Text>
          <TextInput maxLength={11} autoFocus={true} keyboardType={'numeric'} multiline={true} numberOfLines={2} style={style.input} value={whatsapp} onChangeText={value => {setWhatsapp(value)}} />
        </View>
        <TouchableOpacity onPress={() => handleSearch(whatsapp)} style={style.buttonValidate}>
          <Text style={style.textButton}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
      {/* Modal de ajuda */}
      <View style={style.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {}}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <View style={style.headerModal}>
                <MaterialIcons style={{color: "#525252", marginBottom: 18}} name="help" size={32} />
                <Text style={style.titleModal}>Precisa de ajuda?</Text>
              </View>
              <View style={style.bodyModal}>
                <Text style={style.textModal}><Text style={style.textBold}>Compartilhe o app Verify para ajudar a acabar com as Fake News!</Text> #CompartilheaVerdade #VerifyApp</Text>
              </View>
              <View style={style.content}>
                <Text> { data ? data : '' } </Text>
                <Text style={style.text}>1- Insira o Número de Whatsapp;</Text>
                <Text style={style.text}>2- Clique no botão entrar;</Text>
                <Text style={style.text}>OBS.: Faremos a validação dos dados caso não dê certo um aviso aparecerá para você.</Text>
              </View>
              <View style={style.viewButton}>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={style.buttonValidate}>
                  <Text style={style.textButton}>VOLTAR</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible);  navigation.navigate('Register')}} style={style.buttonRegister}>
                  <Text style={style.textButton}>CADASTRAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default Register;