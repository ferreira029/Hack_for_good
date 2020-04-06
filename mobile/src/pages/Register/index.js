import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from './../../service/api';

import imgLogo from './../../assets/logo_purple.png';
import style from './../../globalStyle';

const Register = (props) => {

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [data, setData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  function goBack() {
    navigation.goBack();
  }

  function handleLogin() {
    setModalSuccess(!modalSuccess)
    navigation.navigate('Login');
  }

  async function handleRegister() {
    try {
      if (!name || !whatsapp) {
        setData('\nPor favor, Preencha os campos para se tornar um Verifier :)\n');
        setModalVisible(true)
      } else {
        const response = await api.post('users', { name, whatsapp });
        setData(response.data);
        setModalSuccess(true);
      }
    } catch (error) {
      console.log(error); 
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
          <Text style={style.title}>Cadastro</Text>
          <Text style={style.textInput}>Nome</Text>
          <TextInput autoFocus={true} multiline={true} numberOfLines={2} style={style.input} value={name} onChangeText={value => setName(value)} />
          <Text style={style.textInput}>Número de WhatsApp</Text>
          <TextInput maxLength={11} keyboardType={'numeric'} multiline={true} numberOfLines={2} style={style.input} value={whatsapp} onChangeText={value => setWhatsapp(value)} />
        </View>
        <TouchableOpacity onPress={handleRegister} style={style.buttonValidate}>
          <Text style={style.textButton}>CADASTRAR</Text>
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
              <Text style={style.text}> { data ? data : '' } </Text>
                <Text style={style.text}>1- Coloque seu Nome e Número de Whatsapp;</Text>
                <Text style={style.text}>2- Clique no botão cadastrar;</Text>
                <Text style={style.text}>OBS.: Seus dados vão ser salvos, para que possamos te avisar e encaminhar a mensagem para seu whatsapp para ficar mais dinâmico.</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={style.buttonValidate}>
                <Text style={style.textButton}>VOLTAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      {/* Modal de sucesso */}
      <View style={style.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalSuccess}
          onRequestClose={() => {}}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <View style={style.headerModal}>
                <MaterialIcons style={{color: "#6EC844", marginBottom: 18}} name="check-circle" size={32} />
                <Text style={style.titleModal}>Parabéns!</Text>
              </View>
              <View style={style.bodyModal}>
                <Text style={style.textModal}><Text style={style.textBold}>Compartilhe o app Verify para ajudar a acabar com as Fake News!</Text> #CompartilheaVerdade #VerifyApp</Text>
              </View>
              <View>
                <Text style={style.text}> { data.success } </Text>
              </View>
              <TouchableOpacity onPress={handleLogin} style={style.buttonValidate}>
                <Text style={style.textButton}>FAZER LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default Register;