import { Form, Input, Label, View } from "@tarojs/components";
import React from "react";

export default function Login() {
  return (
    <View className="h-screen">
      <Form className="mx-auto">
        <View className="flex">
          <Label>账号</Label>
          <Input></Input>
        </View>
        <View className="flex">
          <Label>密码</Label>
          <Input></Input>
        </View>
        <View className="py-4 text-center text-white">提交</View>
        <View className="flex mt-2">
          <Text className="ml-auto mr-3">注册</Text>
        </View>
      </Form>
    </View>
  );
}
