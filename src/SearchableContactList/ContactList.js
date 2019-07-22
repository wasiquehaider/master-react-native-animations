import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator
} from "react-native";

import { PermissionsAndroid } from "react-native";
import Contacts from "react-native-contacts";

export default class ContactList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      contacts: [],
      isMemoryContacts: []
    };
  }

  componentDidMount = () => {
    this.loadContacts();
  };

  loadContacts = () => {
    this.setState({
      isLoading: true
    });
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: "Contacts",
      message: "This app would like to view your contacts."
    }).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === "denied") {
          // error
        } else {
          console.log(contacts);
          this.setState({
            contacts: contacts,
            isMemoryContacts: contacts,
            isLoading: false
          });
        }
      });
    });
  };

  renderItem = ({ item }) => (
    <View style={{ minHeight: 70, padding: 5 }}>
      <Text style={{ color: "#bada55", fontWeight: "bold", fontSize: 26 }}>
        {item.givenName + " "}
        {item.familyName}
      </Text>
      <Text style={{ color: "white", fontWeight: "bold" }}>
        {item.phoneNumbers.map((phonenumber, index) => (
          <Text key={index}>
            {phonenumber.number}
            {"\n"}
          </Text>
        ))}
      </Text>
    </View>
  );

  searchContacts = value => {
    const filteredContacts = this.state.inMemoryContacts.filter(contact => {
      let contactLowercase = (
        contact.givenName +
        " " +
        contact.familyName
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ contacts: filteredContacts });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <SafeAreaView style={{ backgroundColor: "#2f363c" }} /> */}
        <TextInput
          placeholder="Search"
          placeholderTextColor="#dddddd"
          style={{
            backgroundColor: "#2f363c",
            height: 60,
            fontSize: 36,
            padding: 10,
            color: "white",
            borderBottomWidth: 0.5,
            borderBottomColor: "#7d90a0"
          }}
          onChangeText={value => this.searchContacts(value)}
        />
        <View style={{ flex: 1, backgroundColor: "#2f363c" }}>
          {this.state.isLoading ? (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ActivityIndicator size="large" color="#bad555" />
            </View>
          ) : null}
          <FlatList
            data={this.state.contacts}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 50
                }}
              >
                <Text style={{ color: "#bad555" }}>No Contacts Found</Text>
              </View>
            )}
          />
          {/* {this.state.contacts.map((item, index) => {
            console.log(`${item.givenName} ${item.familyName}`);
            console.log(
              item.phoneNumbers[0].number === undefined
                ? "no number"
                : item.phoneNumbers[0].number
            );
          })} */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
