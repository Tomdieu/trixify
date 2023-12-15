import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  TextInput,
  Button,
  HStack,
  Snackbar,
} from "@react-native-material/core";
import { MaterialIcons } from "@expo/vector-icons";

import { useForm, Controller } from "react-hook-form";

import { loginSchema, loginSchemaType } from "@/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// import ApiService from "@/utils/ApiService";
// import { api } from "@/utils/lib/api";

import {useAuth} from "@/hooks/userAuth";


const LoginForm = () => {

  const {setToken,setUser} = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<loginSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = (data: loginSchemaType) => {
    console.log("Data : ", data);
    fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/accounts/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((body) => {
        const {data} = body
        console.log("Data : ", data);
        console.log("Login Successfull")
        if(data.token){
          setUser(data.user)
          setToken(data.token)

          router.push("chats/")
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        console.log("Message : ", err.message);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 justify-center">
        <View style={{ ...styles.form, justifyContent: "center" }}>
          <Text
            className="font-bold"
            style={{ textAlign: "center", marginVertical: 9, fontSize: 30 }}
          >
            Login To Trixify
          </Text>
          <View>
            <Text style={styles.label}>Email</Text>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  variant="outlined"
                  placeholder="Enter your email here"
                  inputMode="email"
                  color="#000"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Field is required!",
                },
              }}
            />
            {errors.email && (
              <Text style={{ color: "red" }}>{errors.email.message}</Text>
            )}
          </View>
          <View>
            <Text style={styles.label}>Password</Text>

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  variant="outlined"
                  placeholder="Enter your password here"
                  value={value}
                  color="#000"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Field is required!",
                },
              }}
            />
            {errors.password && (
              <Text style={{ color: "red" }}>{errors.password.message}</Text>
            )}
          </View>

          <Button
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}
            style={{ paddingVertical: 5 }}
            color="#000"
            trailing={<MaterialIcons name="login" color={"#fff"} size={20} />}
            title={"Login"}
          />

          <HStack justify="center">
            <Text style={{ textAlign: "center" }}>
              Don't have an account ?{" "}
            </Text>
            <Link href={"/register"} style={{ fontWeight: "600" }} asChild>
              <Text>Register</Text>
            </Link>
          </HStack>
        </View>
      </View>
    </SafeAreaView>
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
    marginVertical: 4,
  },
  textInput: {
    paddingVertical: 3,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#ddd",
  },
});
