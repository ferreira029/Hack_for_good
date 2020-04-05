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
  },
  titleModal: {
    fontFamily: "Roboto",
    fontSize: 24,
    color: "#3D0C89",
    lineHeight: 28,
    marginTop: 20
  },
  textModal: {
    marginLeft: 80,
    marginRight: 80
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

