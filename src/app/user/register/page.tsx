"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { userRegisterUsingPost } from "@/api/userController";
import { message } from "antd";
import { useRouter } from "next/navigation";

/**
 * 用户注册页面
 * @constructor
 */
const UserRegisterPage: React.FC = () => {
  const router = useRouter();
  const [form] = ProForm.useForm();

  /**
   * 提交
   * @param values
   */
  const doSubmit = async (values: API.UserRegisterRequest) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("注册成功，请登录");
      }

      router.push("/user/login");
      form.resetFields();
    } catch (e: any) {
      message.error("注册失败，" + e.message);
    }
  };

  return (
    <div id="user-register-page">
      <LoginForm<API.UserRegisterRequest>
        form={form}
        logo={
          <Image
            src="/assets/logo.png"
            alt="CodePilot"
            width={44}
            height={44}
          />
        }
        title="CodePilot - 用户注册"
        subTitle="程序员面试刷题网站"
        onFinish={doSubmit}
      >
        <>
          <ProFormText
            name="userAccount"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined />,
            }}
            placeholder={"请输入账号"}
            rules={[
              {
                required: true,
                message: "请输入账号!",
              },
            ]}
          />
          <ProFormText.Password
            name="userPassword"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
            }}
            placeholder={"请输入密码"}
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
          />
          <ProFormText.Password
            name="checkPassword"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
            }}
            placeholder={"请确认密码"}
            rules={[
              {
                required: true,
                message: "请再次输入密码！",
              },
            ]}
          />
        </>

        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "right",
          }}
        >
          已有账号？
          <Link href={"/user/login"}>登录</Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserRegisterPage;
