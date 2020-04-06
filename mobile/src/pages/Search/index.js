import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Image, Linking } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import api from './../../service/api';
import imgLogo from './../../assets/logo_purple.png';
import style from './../../globalStyle';

const Search = () => {

  const navigation = useNavigation();
  const route = useRoute();

  const userData = route.params.userData;

  const [textValidate, setTextValidate] = useState('');
  const [data, setData] = useState({});
  const [modalHelp, setModalHelp] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);
  const [modalValidate, setModalValidate] = useState(false);

  function handleLogout() {
    navigation.navigate('Home');
  }

  const sendMail = (message) => {
    MailComposer.composeAsync({
        subject: `Verify -  #CompartilheaVerdade #VerifyApp`,
        recipients: [`contato@verify.com.br`],
        body: message
    })
  }

  function sendWhatsApp(message) {
    Linking.openURL(`whatsapp://send?phone=+55${userData.whatsapp}&text=${message}`);
  }

  function sendTelegram(message) {
    Linking.openURL(`telegram://send?phone=+55${userData.whatsapp}&text=${message}`);
  }

  async function handleSearch(search) {
    try {
      const response = await api.post('search', { data: search });
      setData(response.data);
      setModalValidate(true);
    } catch (error) {
      setData('\nDesculpe a conexão falhou :(\n Tente novamente mais tarde!\n');
      setModalHelp(true);
    }
  }

  return(
    <View style={style.container}>
      <View style={style.header}>
        <Image source={imgLogo} style={style.logo} />
        <Text onPress={() => {setData(''); setModalHelp(true)}}><MaterialIcons name="help" size={20} /></Text>
        <Text onPress={() => {setModalLogout(true)}}><MaterialIcons name="close" size={20} /></Text>
      </View>
      <View style={style.body}>
        <View style={style.containerInputs}>
          <Text style={style.title}>Olá, {userData.name}</Text>
          <Text style={style.textInput}>Valide seu texto ou link</Text>
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

      { data.empty
      ? /* Modal Empty */
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
                <MaterialIcons style={{color: "#FAA90D", marginBottom: 20}} name="error" size={32} />
                <Text style={style.titleModal}>Campo de texto vazio</Text>
              </View>
              <View style={style.bodyModal}>
                <Text style={style.textModal}><Text style={style.textBold}>Compartilhe o app Verify para ajudar a acabar com as Fake News!</Text> #CompartilheaVerdade #VerifyApp</Text>
              </View>
              <TouchableOpacity onPress={() => {setModalValidate(!modalValidate)}} style={style.buttonValidate}>
                <Text style={style.textButton}>NOVA PESQUISA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      : data.fake
      ? /* Modal Fake */
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
                  <TouchableOpacity onPress={() => {sendWhatsApp(`Sua mensagem foi validada com sucesso, infelizmente é uma FakeNews!`)}}>
                    <Feather style={{color: "#525252", marginLeft: 30}} name="message-circle" size={32} />
                    <Text style={style.textIcons}>Whatsapp</Text>
                  </TouchableOpacity>
                </View>
                <View style={{justifyContent: "center", alignItems: "center", width: 90}}>
                  <TouchableOpacity onPress={() => {sendTelegram(`Sua mensagem foi validada com sucesso, infelizmente é uma FakeNews!`)}}>
                    <Feather style={{color: "#525252", marginLeft: 30}} name="send" size={32} />
                    <Text style={style.textIcons}>Telegram</Text>
                  </TouchableOpacity>
                </View>
                <View style={{justifyContent: "center", alignItems: "center", width: 90}}>
                  <TouchableOpacity onPress={() => sendMail('Sua mensagem foi validada com sucesso, infelizmente é uma FakeNews!')}>
                    <Feather style={{color: "#525252", marginLeft: 30}} name="mail" size={32} />
                    <Text style={style.textIcons}>E-mail</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => {setModalValidate(!modalValidate)}} style={style.buttonValidate}>
                <Text style={style.textButton}>NOVA PESQUISA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View> 
      : data.error /* Modal Error */
      ? /* Modal Error */
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
                <MaterialIcons style={{color: "#FAA90D", marginBottom: 20}} name="error" size={32} />
                <Text style={style.titleModal}>Não encontramos sua resposta.</Text>
              </View>
              <View style={style.bodyModal}>
                <Text style={style.textModal}><Text style={style.textBold}>Compartilhe o app Verify para ajudar a acabar com as Fake News!</Text> #CompartilheaVerdade #VerifyApp</Text>
              </View>
              <TouchableOpacity onPress={() => {setModalValidate(!modalValidate)}} style={style.buttonValidate}>
                <Text style={style.textButton}>NOVA PESQUISA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      : data.failed 
      ? /* Modal Failed */
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
                <MaterialIcons style={{color: "#FAA90D", marginBottom: 20}} name="error" size={32} />
                <Text style={style.titleModal}>Não encontramos sua resposta.</Text>
              </View>
              <View style={style.bodyModal}>
                <Text style={style.textModal}><Text style={style.textBold}>Compartilhe o app Verify para ajudar a acabar com as Fake News!</Text> #CompartilheaVerdade #VerifyApp</Text>
              </View>
              <TouchableOpacity onPress={() => {setModalValidate(!modalValidate)}} style={style.buttonValidate}>
                <Text style={style.textButton}>NOVA PESQUISA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      : data.site 
      ? /* Modal Accept */
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
                <Text style={style.textLinks}> {data.site} </Text>
              </View>
              <View style={style.viewFont}>
                <MaterialIcons name="share" size={20} />
                <Text style={style.textLinks}>Compartilhar</Text>
              </View>
              <View style={style.viewIcons}>
                <View style={{justifyContent: "center", alignItems: "center", width: 90}}>
                  <TouchableOpacity onPress={() => {sendWhatsApp(`Sua mensagem foi validada com sucesso, pode ficar despreocupado, não é uma FakeNews!\n ${data.conteudo}`)}}>
                    <Feather style={{color: "#525252", marginLeft: 30}} name="message-circle" size={32} />
                    <Text style={style.textIcons}>Whatsapp</Text>
                  </TouchableOpacity>
                </View>
                <View style={{justifyContent: "center", alignItems: "center", width: 90}}>
                  <TouchableOpacity onPress={() => {sendTelegram(`Sua mensagem foi validada com sucesso, pode ficar despreocupado, não é uma FakeNews!\n ${data.Conteudo}`)}}>
                    <Feather style={{color: "#525252", marginLeft: 30}} name="send" size={32} />
                    <Text style={style.textIcons}>Telegram</Text>
                  </TouchableOpacity>
                </View>
                <View style={{justifyContent: "center", alignItems: "center", width: 90}}>
                  <TouchableOpacity onPress={() => {}}>
                    <Feather style={{color: "#525252", marginLeft: 30}} name="mail" size={32} />
                    <Text style={style.textIcons}>E-mail</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => {setModalValidate(!modalValidate)}} style={style.buttonValidate}>
                <Text style={style.textButton}>NOVA PESQUISA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View> 
      : /* Modal Inconclusive */
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
                <MaterialIcons style={{color: "#525252", marginBottom: 20}} name="error" size={32} />
                <Text style={style.titleModal}>Resultado inconclusivo.</Text>
              </View>
              <View style={style.bodyModal}>
                <Text style={style.textModal}><Text style={style.textBold}>Compartilhe o app Verify para ajudar a acabar com as Fake News!</Text> #CompartilheaVerdade #VerifyApp</Text>
              </View>
              <TouchableOpacity onPress={() => {setModalValidate(!modalValidate)}} style={style.buttonValidate}>
                <Text style={style.textButton}>NOVA PESQUISA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    }
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
                <Text style={style.title}>Deseja mesmo sair?</Text>
              </View>
              <View style={style.bodyModal}>
                <Text style={style.textModal}><Text style={style.textBold}>Compartilhe o app Verify para ajudar a acabar com as Fake News!</Text> #CompartilheaVerdade #VerifyApp</Text>
              </View>
              <View style={style.viewButton}>
                <TouchableOpacity onPress={handleLogout} style={style.buttonValidate}>
                  <Text style={style.textButton}>SIM</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setModalLogout(!modalLogout)}} style={style.buttonCancel}>
                  <Text style={style.textButton}>NÃO</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
                <MaterialIcons style={{color: "#525252", marginBottom: 18}} name="help" size={32} />
                <Text style={style.titleModal}>Precisa de ajuda?</Text>
              </View>
              <View style={style.bodyModal}>
                <Text style={style.textModal}><Text style={style.textBold}>Compartilhe o app Verify para ajudar a acabar com as Fake News!</Text> #CompartilheaVerdade #VerifyApp</Text>
              </View>
              <View style={style.content}>
              <Text style={style.text}> { data ? data : ''} </Text>
                <Text style={style.text}>1- Coloque seu Nome e Número de Whatsapp;</Text>
                <Text style={style.text}>2- Clique no botão cadastrar;</Text>
                <Text style={style.text}>OBS.: Seus dados vão ser salvos, para que possamos te avisar e encaminhar a mensagem para seu whatsapp para ficar mais dinâmico.</Text>
              </View>
              <TouchableOpacity onPress={() => setModalHelp(!modalHelp)} style={style.buttonValidate}>
                <Text style={style.textButton}>VOLTAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default Search;