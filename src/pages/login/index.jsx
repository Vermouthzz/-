import { View } from "@tarojs/components";
import { Form, Input, Button } from "@nutui/nutui-react-taro";
import React from "react";

export default function Login() {
  return (
    <View>
      <Form
        labelPosition="right"
        footer={
          <>
            <Button nativeType="submit" block type="primary">
              提交
            </Button>
          </>
        }
      >
        <Form.Item
          align="center"
          required
          label="用户名"
          name="username"
          rules={[
            { max: 5, message: "字段A不能超过5个字" },
            { required: true, message: "请输入字段A" },
            {
              validator: () => {
                return value.length > 5;
              },
            },
          ]}
        >
          <Input
            className="nut-input-text"
            placeholder="请输入字段A"
            type="text"
          />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            { max: 15, message: "字段D不能超过15个字" },
            { required: true, message: "请输入字段D" },
          ]}
        >
          <Input
            className="nut-input-text"
            placeholder="请输入字段A"
            type="text"
          />
        </Form.Item>
      </Form>

      <Button nativeType="submit" block type="primary">
        提交
      </Button>
    </View>
  );
}
