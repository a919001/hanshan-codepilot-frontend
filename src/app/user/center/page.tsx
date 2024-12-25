"use client";

import React from "react";
import { Avatar, Card, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import Paragraph from "antd/es/typography/Paragraph";
import CalendarChart from "@/app/user/center/components/CalendarChart";

/**
 * 用户中心页面
 * @constructor
 */
export default function UserCenterPage() {
  // 获取登录用户信息
  const loginUser = useSelector((state: RootState) => state.loginUser);
  // 新起一个变量，便于复用
  const user = loginUser;
  // 控制菜单栏 Tab
  const [activeTabKey, setActiveTabKey] = React.useState<string>("record");

  return (
    <div id="user-center-page" className="max-width-content">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card style={{ textAlign: "center" }}>
            <Avatar src={user.userAvatar} size={72} />
            <div style={{ marginBottom: 16 }} />
            <Card.Meta
              title={<Title level={4}>{user.userName}</Title>}
              description={
                <Paragraph type="secondary">{user.userProfile}</Paragraph>
              }
            />
          </Card>
        </Col>
        <Col xs={24} md={18}>
          <Card
            tabList={[
              {
                key: "record",
                label: "刷题记录",
              },
              {
                key: "others",
                label: "其他",
              },
            ]}
            activeTabKey={activeTabKey}
            onTabChange={(key: string) => {
              setActiveTabKey(key);
            }}
          >
            {activeTabKey === "record" && (
              <>
                <CalendarChart />
              </>
            )}
            {activeTabKey === "others" && <>bbb</>}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
