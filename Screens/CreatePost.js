import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import * as Font from "expo-font";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BarlowCondensed-Medium.ttf"),
};

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "image_1",
      dropdownHeight: 40,
      
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  async addPost ( ) {
    if (
      this.state.caption
    ) {
        let postData={
          preview_image : this.state.previewImage ,
          caption : this.state.caption ,
          author : firebase.auth ( ) . currentUser.displayName ,
          created_on : new Date ( ) ,
          author_uid : firebase.auth ( ) . currentUser.uid ,
          profile_image : this.state.profile_image ,
          likes : 0
        };
    
        
        await firebase
             .database ( )
             .ref (
                 " / posts / " +
                 Math.random ( )
                     .toString ( 36 )
                     .slice ( 2 )
             )
             .set ( postData )
             .then ( function ( snapshot ) { } ) ;
        this.props.setUpdateToTrue ( ) ;
        this.props.navigation.navigate ( " Feed " ) ;
             }else{
        Alert.alert (
            " Error " ,
            " All fields are required ! " ,
            [ { text : " OK " , onPress : ( ) => console.log ( " OK Pressed " ) } ] ,
            { cancelable : false }
        ) ;
             }
            }

  render() {
    if (!this.state.fontsLoaded) {
      return <Text>Cargando...</Text>;
    } else {
      let preview_images = {
        image_1: require("../assets/image_1.jpg"),
        image_2: require("../assets/image_2.jpg"),
        image_3: require("../assets/image_3.jpg"),
        image_4: require("../assets/image_4.jpg"),
        image_5: require("../assets/image_5.jpg"),
      };

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/instagram.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Nueva Publicación</Text>
            </View>
          </View>

          <View style={styles.fieldsContainer}>
            <ScrollView>
              <Image
                source={preview_images[this.state.previewImage]}
                style={styles.previewImage}
              ></Image>
              <View
                style={{
                  height: RFValue(this.state.dropdownHeight),
                  minHeight: 40,
                }}
              >
                <DropDownPicker
                  items={[
                    { label: "Image 1", value: "image_1" },
                    { label: "Image 2", value: "image_2" },
                    { label: "Image 3", value: "image_3" },
                    { label: "Image 4", value: "image_4" },
                    { label: "Image 5", value: "image_5" },
                  ]}
                  defaultValue={this.state.previewImage}
                  placeholder="Image"
                  containerStyle={{
                    height: 40,
                    marginBottom: 10,
                    
                  }}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 170 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 40 });
                    
                  }}
                  style={{
                    backgroundColor: "transparent",
                  }}
                  textStyle={{
                    color: "#fff",
                    fontFamily: "Bubblegum-Sans",
                    textAlignVertical: "top",
                    padding: RFValue(5),
                  }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  dropDownStyle={{ backgroundColor: "#2f345d" }}
                  labelStyle={{
                    color: "#fff",
                    fontFamily: "Bubblegum-Sans",
                  }}
                  arrowStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans",
                  }}
                  onChangeItem={(item) =>
                    this.setState({
                      previewImage: item.value,
                    })
                  }
                />
              </View>

              <View>
                <TextInput
                  style={[
                    styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig,
                  ]}
                  onChangeText={(title) => this.setState({ caption })}
                  placeholder={"Título"}
                  placeholderTextColor="#fff"
                  multiline={true}
                  numberOfLines={2}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2f4f4f",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "#fff",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: "93%",
    height: RFValue(190),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },

  inputFont: {
    borderColor: "#fff",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "#fff",
    fontFamily: "Bubblegum-Sans",
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5),
  },
});
