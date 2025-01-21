import { Text, View } from "@tarojs/components";
import React, { useCallback, useState } from "react";
import { Button, Form, Input } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import { register } from "../../../api/user";

export default function RegisrerPage() {
  const [userInfo, setUserInfo] = useState({
    account: "",
    password: "",
    username: "",
  }); // 注册信息
  const submit = useCallback(async () => {
    const { account, password, username } = userInfo;
    if (!account || !password || !username) {
      Taro.showToast({
        title: "请输入完整信息",
        icon: "none",
      });
      return;
    }
    const res = await register(userInfo);
    if (res.code === 200) {
      Taro.showToast({
        title: "注册成功",
        icon: "success",
      });
      Taro.navigateTo({
        url: "/pages/login/index",
      });
    }
  }, [userInfo]);
  return (
    <View>
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
              立即注册
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
        <Form.Item name="username">
          <Input
            placeholder="请输入您的用户名"
            type="text"
            value={userInfo.password}
            onChange={(value) => {
              setUserInfo((prev) => ({ ...prev, password: value }));
            }}
          />
        </Form.Item>
      </Form>
    </View>
  );
}
