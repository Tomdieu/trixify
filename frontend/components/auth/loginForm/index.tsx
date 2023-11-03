import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Button from "../../Button";
import { Link } from "expo-router";

const LoginForm = () => {

    const [formData,setFormData] = useState({email:"",password:""});


  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", marginVertical: 9, fontSize: 30 }}>
        Login To Trixify
      </Text>
      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="email-address"
            placeholder="Email"
            value={formData.email}
            onChangeText={(text)=>setFormData({...formData,email:text})}
          />
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="visible-password"
            secureTextEntry
            placeholder="Password"
            value={formData.password}
            onChangeText={(value)=>setFormData({...formData,password:value})}
          />
        </View>
        <View>
          <Button>Login</Button>
        </View>
        <Text style={{textAlign:"center"}}>Don't have an account ? <Link href={"/register"} style={{fontWeight:"600"}}>Register</Link></Text>
      </View>
      <View style={{ gap: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <View style={styles.line}></View>
          <Text style={{ color: "#000000eb" }}>Or Continue with</Text>
          <View style={styles.line}></View>
        </View>
        <Button>Google</Button>
        <Button>Github</Button>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    marginHorizontal: 5,
    marginVertical: 6,
  },
  form: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    display: "flex",
    gap: 10,
  },
  label: {
    fontWeight: "500",
    marginVertical: 5,
  },
  textInput: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#ddd",
  },
});
