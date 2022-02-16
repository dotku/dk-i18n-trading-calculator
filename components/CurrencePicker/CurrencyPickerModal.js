const CurrencyCodePickerModal = ({ modalVisible, setModalVisible }) => {
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      color: "black",
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => {
        console.log("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableOpacity onPressOut={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Hello</Text>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
