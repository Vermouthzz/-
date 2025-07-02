import { Text, View } from "@tarojs/components";
import React, { useCallback, useState } from "react";
import { Button, Form, Input } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import { register } from "../../../api/user";

export default function RegisterPage() {
  const [userInfo, setUserInfo] = useState({
    account: "",
    password: "",
    username: "",
  }); // 注册信息
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false); // 防止重复提交

  // 提交表单
  const submit = useCallback(async () => {
    if (isSubmitDisabled) return;
    setIsSubmitDisabled(true);

    const { account, password, username } = userInfo;

    // 简单验证（实际应使用表单验证库）
    if (!account || !password || !username) {
      Taro.showToast({
        title: "请输入完整信息",
        icon: "none",
      });
      setIsSubmitDisabled(false);
      return;
    }

    try {
      const res = await register(userInfo);
      if (res.code === 200) {
        // 保存用户信息
        Taro.setStorageSync("token", res.data.token);
        Taro.setStorageSync("userInfo", res.data.userinfo);
        Taro.setStorageSync("refreshToken", res.data.refreshToken);

        // 提示并跳转
        Taro.showToast({
          title: "注册成功",
          icon: "success",
        });
        setTimeout(() => {
          Taro.navigateBack();
        }, 500);
      } else {
        Taro.showToast({
          title: res.message || "注册失败",
          icon: "none",
        });
      }
    } catch (error) {
      console.error("注册失败:", error);
      Taro.showToast({
        title: "注册失败，请重试",
        icon: "none",
      });
    } finally {
      setIsSubmitDisabled(false);
    }
  }, [userInfo, isSubmitDisabled]);

  return (
    <View className="h-screen px-10 flex flex-col gap-6 bg-white">
      <View className="text-2xl font-bold mt-12 pl-4 text-gray-800">
        欢迎注册
      </View>

      <Form
        className="w-full max-w-sm"
        footer={
          <Button
            nativeType="submit"
            onClick={submit}
            className="py-4 mt-5 bg-blue-500 text-white rounded-lg"
            block
            type="primary"
            disabled={isSubmitDisabled}
          >
            {isSubmitDisabled ? "请稍候..." : "立即注册"}
          </Button>
        }
      >
        <Form.Item
          label={<Text className="text-gray-600">账号</Text>}
          name="account"
          className="w-full"
          required
        >
          <Input
            className="w-full h-12 border-b-2 border-gray-200 outline-none focus:border-blue-500"
            placeholder="请输入您的账号(4-10位字符)"
            type="text"
            value={userInfo.account}
            onChange={(value) => {
              setUserInfo((prev) => ({ ...prev, account: value }));
            }}
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, ""))
            }
          />
        </Form.Item>

        <Form.Item
          label={<Text className="text-gray-600">密码</Text>}
          name="password"
          className="w-full"
          required
        >
          <Input
            className="w-full h-12 border-b-2 border-gray-200 outline-none focus:border-blue-500"
            placeholder="请输入密码(6-18位字符)"
            type="password"
            value={userInfo.password}
            onChange={(value) => {
              setUserInfo((prev) => ({ ...prev, password: value }));
            }}
          />
        </Form.Item>

        <Form.Item
          label={<Text className="text-gray-600">用户名</Text>}
          name="username"
          className="w-full"
          required
        >
          <Input
            className="w-full h-12 border-b-2 border-gray-200 outline-none focus:border-blue-500"
            placeholder="请输入您的用户名(2-10位字符)"
            type="text"
            value={userInfo.username}
            onChange={(value) => {
              setUserInfo((prev) => ({ ...prev, username: value }));
            }}
          />
        </Form.Item>
      </Form>

      {/* <View className="mt-5 text-center text-blue-500 text-sm">
        已有账号？
        <Text
          className="underline cursor-pointer"
          onClick={() => Taro.navigateBack()}
        >
          去登录
        </Text>
      </View> */}
    </View>
  );
}
