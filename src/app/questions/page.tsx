"use server";

import { searchQuestionVoByPageUsingPost } from "@/api/questionController";
import React from "react";
import { Flex, message } from "antd";
import Title from "antd/es/typography/Title";
import QuestionTable from "@/app/components/QuestionTable";
import "./index.css";

/**
 * 题目列表页面
 * @constructor
 */
export default async function QuestionsPage({ searchParams }) {
  // 获取 url 查询参数
  const { q: searchText } = searchParams;
  // 题目列表
  let questionList = [];
  // 题目总数
  let total = 0;

  try {
    const res = await searchQuestionVoByPageUsingPost({
      searchText,
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionList = res.data.records ?? [];
    total = res.data.total;
  } catch (e) {
    console.error("获取题目列表失败，" + e.message);
  }

  return (
    <div id="questions-page" className="max-width-content">
      <Flex justify="space-between" align="center">
        <Title level={3}>题目大全</Title>
      </Flex>
      <div>
        <QuestionTable
          defaultQuestionList={questionList}
          defaultTotal={total}
          defaultSearchParams={{
            title: searchText,
          }}
        />
      </div>
    </div>
  );
}
