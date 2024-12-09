"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { userLoginUsingPost } from "@/api/userController";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { setLoginUser } from "@/stores/loginUser";
import { useRouter } from "next/navigation";

/**
 * 用户登录页面
 * @constructor
 */
const UserLoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [form] = ProForm.useForm();

  /**
   * 提交
   * @param values
   */
  const doSubmit = async (values: API.UserLoginRequest) => {
    try {
      const res = await userLoginUsingPost(values);
      if (res.data) {
        message.success("登陆成功！");
      }
      // 保存用户登录态
      dispatch(setLoginUser(res.data));
      router.replace("/");
      form.resetFields();
    } catch (e: any) {
      message.error("登陆失败，" + e.message);
    }
  };

  return (
    <div id="user-login-page">
      <LoginForm<API.UserLoginRequest>
        form={form}
        logo={
          <Image
            src="/assets/logo.png"
            alt="CodePilot"
            width={44}
            height={44}
          />
        }
        title="CodePilot - 用户登录"
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
        </>

        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "right",
          }}
        >
          没有账号？
          <Link href={"/user/register"}>注册</Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserLoginPage;
