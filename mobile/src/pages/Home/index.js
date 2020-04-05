import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import imgLogo from './../../assets/logo.png';
import style from './styles';

const Home = () => {

  const navigation = useNavigation();

  function handleLogin() {
    navigation.navigate('Login');
  }

  function handleRegister() {
    navigation.navigate('Register');
  }

  return (
  <View style={style.container}>
    <Image source={imgLogo} />
    <Text style={style.textSlogan}> <MaterialIcons name="cancel" size={20} /> Livre-se da fake news</Text>
    <TouchableOpacity onPress={handleLogin} style={style.buttonLogin}>
      <Text style={style.textButton}>ENTRAR</Text>
    </TouchableOpacity>
    <Text style={style.textRegister}>Não tem uma conta?<Text onPress={handleRegister} style={style.textBold}> Cadastre-se</Text>.</Text>
  </View>
  );
}

export default Home;