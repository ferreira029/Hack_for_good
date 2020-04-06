import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  containerInputs: {
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "80%"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 24,
    color: "#3D0C89",
    lineHeight: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  titleModal: {
    fontFamily: "Roboto",
    fontStyle: 'normal',
    fontSize: 24,
    color: "#525252",
    lineHeight: 28,
    width: 150,
    marginLeft: 30,
    marginBottom: 30,
  },
  textLinks: {
    color: "#525252",
    fontSize: 12,
    lineHeight: 14,
    fontFamily: "Roboto",
    marginLeft: 5,
  },
  textIcons: {
    color: "#525252",
    fontSize: 12,
    lineHeight: 14,
    fontFamily: "Roboto",
    marginLeft: 20,
    marginTop: 5,
  },
  textModal: {
    marginTop: 20,
    marginBottom: 20,
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 24,
  },
  textBold: {
    fontWeight: "bold"
  },
  textButton: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 5,
    fontFamily: "Roboto",
  },
  textIcon: {
    color: "#6EC844",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#FBFAF9",
    borderRadius: 5,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    width: "100%",
    marginTop: 5,
  },
  buttonValidate: {
    backgroundColor: "#00BC00",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewIcons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  viewFont: {
    flexDirection: "row",
    width: 240,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  viewLinks: {
    backgroundColor: "rgba(229, 229, 229, 0.5)",
    borderRadius: 5,
    width: "100%",
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  headerModal: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: '100%',
  },
  bodyModal: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderTopColor: 'rgba(0, 0, 0, 0.5)',
    borderTopWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomWidth: 1,
  },
  buttonModalConfirm: {
    width: 200,
    padding: 20,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 53,
    backgroundColor: "#00BC00",
    borderRadius: 8,
  },
  buttonModalCancel: {
    width: 200,
    padding: 20,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 53,
    backgroundColor: "#C4C4C4",
    borderRadius: 8,
  },
});

