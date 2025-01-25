import { Text, View } from "@tarojs/components";
import React, { useCallback, useState } from "react";
import { Button, Form, Input } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import { login } from "../../../api/user";

export default function Login() {
  const [userInfo, setUserInfo] = useState({ account: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);
  const submit = useCallback(async () => {
    const { account, password } = userInfo;
    if (!account || !password) {
      return Taro.showToast({
        title: "请输入账号和密码",
        icon: "none",
      });
    }
    const res = await login({ account, password });
    if (res.code === 200) {
      Taro.setStorageSync("token", res.data.token);
      Taro.setStorageSync("userInfo", res.data.userInfo);
      Taro.switchTab({ url: "/pages/profile/index" });
    }
  }, [userInfo.account, userInfo.password]);

  const toRegister = () => {};
  return (
    <View className="h-screen px-10 flex flex-col gap-6">
      <View className="text-2xl font-bold mt-20 pl-4">欢迎登陆</View>
      <Form
        footer={
          <>
            <Button
              nativeType="submit"
              onClick={submit}
              className="py-5"
              block
              type="primary"
            >
              登陆
            </Button>
          </>
        }
      >
        <Form.Item align="center" name="account">
          <Input
            className="nut-input-text"
            placeholder="请输入您的账号"
            type="text"
            value={userInfo.account}
            onChange={(value) => {
              setUserInfo((prev) => ({ ...prev, account: value }));
            }}
          />
        </Form.Item>
        <Form.Item name="passwrod">
          <Input
            placeholder="请输入密码"
            type="password"
            value={userInfo.password}
            onChange={(value) => {
              setUserInfo((prev) => ({ ...prev, password: value }));
            }}
          />
        </Form.Item>
      </Form>
      <View className="flex">
        <Text onClick={toRegister}>去注册</Text>
      </View>
    </View>
  );
}
