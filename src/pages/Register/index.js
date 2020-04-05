import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import imgLogo from './../../assets/logo_purple.png';
import style from './styles';

const Register = () => {

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [modalVisible, setModalVisible] = useState('');

  function goBack() {
    navigation.goBack();
  }

  return(
    <View style={style.container}>
      <View style={style.header}>
        <Text onPress={goBack}><MaterialIcons name="arrow-back" size={20} /></Text>
        <Image source={imgLogo} style={style.logo} />
        <Text onPress={() => {setModalVisible(true)}}><MaterialIcons name="help" size={20} /></Text>
      </View>
      <View style={style.body}>
        <View style={style.containerInputs}>
          <Text style={style.title}>Cadastro</Text>
          <Text style={style.text}>Nome</Text>
          <TextInput style={style.input} value={name} onChangeText={value => setName(value)} />
          <Text style={style.text}>Número de WhatsApp</Text>
          <TextInput style={style.input} value={whatsapp} onChangeText={value => setWhatsapp(value)} />
        </View>
        <TouchableOpacity onPress={()=> {console.log("teste")}} style={style.buttonRegister}>
          <Text style={style.textButton}>CADASTRAR</Text>
        </TouchableOpacity>
      </View>
      <View style={style.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <View style={style.headerModal}>
                <MaterialIcons name="help" size={20} />
                <Text style={style.textStyle}>Ajuda</Text>
                <Text onPress={() => {setModalVisible(!modalVisible)}}><MaterialIcons name="close" size={20} /></Text>
              </View>
              <View>
                <Text style={style.titleModal}>Instrução:</Text>
                <Text style={style.text}>1- Coloque seu Nome e Número de Whatsapp;</Text>
                <Text style={style.text}>2- Clique no botão cadastrar;</Text>
                <Text style={style.text}>OBS.: Seus dados vão ser salvos, para que possamos te avisar e encaminhar a mensagem para seu whatsapp para ficar mais dinâmico.</Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default Register;