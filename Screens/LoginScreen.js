import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";

export default class LoginScreen extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // No necesitamos reautorizar la conexión con Firebase. 
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = googleUser => {
    // Necesitamos registrar un observador en la autorización de Firebase para asegurar que se inició la autorización.
    var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
      unsubscribe();
      //Revisar si ya se hizo sesión en Firebase con el usuario correcto.  
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        //Construir credenciales de Firebas con el token de Google ID.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        //Iniciar sesión con la credencia de usuario de Google.  
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function(result) {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref("/users/" + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  current_theme: "dark"
                })
                .then(function(snapshot) {});
            }
          })
          .catch(error => {
            //Lidiar con errores aquí.
            var errorCode = error.code;
            var errorMessage = error.message;
            // El email de la cuenta del usuario usado.
            var email = error.email;
            // El tipo de firebase.auth.AuthCredential que fue usado.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log("El usuario ya hizo sesión en Firebase.");
      }
    });
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: "web",
        androidClientId:
          "1037657686156-cr9sm0468427cjrnvj953j6j9ef9u8fg.apps.googleusercontent.com",
        iosClientId:
          "1037657686156-922c8s832lgs6nnnh6et9ha6jrmiks10.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.message);
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Iniciar sesión con Google"
          onPress={() => this.signInWithGoogleAsync()}
        ></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});