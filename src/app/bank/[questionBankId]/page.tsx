"use server";

import React from "react";
import { Avatar, Button, Card } from "antd";
import "./index.css";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import QuestionList from "@/app/components/QuestionList";

/**
 * 题库详情页面
 * @constructor
 */
// @ts-ignore
export default async function BankPage({ params }) {
  const { questionBankId } = params;
let bank:API.QuestionBankVO = {};
  // 获取题库详情
  try {
    const res = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      // TODO 分页实现
      pageSize: 100,
    });
    // @ts-ignore
    bank = res.data;
  } catch (e) {
    // @ts-ignore
    console.log("获取题库详情失败，" + e.message);
  }
  // 错误处理
  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }
  // 获取第一道题，用于刷题按钮跳转
  let firstQuestionId = undefined;
  // @ts-ignore
  if (bank.questionVOPage?.records && bank.questionVOPage.records.length > 0) {
    // @ts-ignore
    firstQuestionId = bank.questionVOPage.records[0].id;
  }

  return (
    <div id="bank-page" className="max-width-content">
      <Card>
        <Meta
          // @ts-ignore
          avatar={<Avatar src={bank.picture} size={72} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {bank.title}
            </Title>
          }

          description={
            <>
              <Paragraph type="secondary">{bank.description}</Paragraph>
              <Button
                type="primary"
                shape="round"
                disabled={!firstQuestionId}
                href={`/bank/${questionBankId}/question/${firstQuestionId}`}
                target="_blank"
              >
                开始刷题
              </Button>
            </>
          }
        />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <QuestionList
        questionList={bank.questionVOPage?.records || []}
        cardTitle={`题目列表（${bank.questionVOPage?.total || 0}）`}
        questionBankId={questionBankId}
      />
    </div>
  );
}
