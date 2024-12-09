"use server";

import "./index.css";
import Title from "antd/es/typography/Title";
import { Flex, message } from "antd";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import QuestionBankList from "@/app/components/QuestionBankList";

/**
 * 题库列表页
 * @constructor
 */
export default async function BanksPage() {
  let questionBankList = [];
  // 题库数量不多，直接全量获取
  const pageSize = 100;
  try {
    const questionBankRes = await listQuestionBankVoByPageUsingPost({
      pageSize: pageSize,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionBankList = questionBankRes.data.records ?? [];
  } catch (e) {
    message.error("获取题库列表失败，" + e.message);
  }

  return (
    <div id="banks-page" className="max-width-content">
      <Flex justify="space-between" align="center">
        <Title level={3}>题库大全</Title>
      </Flex>
      <div>
        <QuestionBankList questionBankList={questionBankList} />
      </div>
    </div>
  );
}
