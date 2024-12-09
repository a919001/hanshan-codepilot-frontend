"use server";

import React from "react";
import "./index.css";
import {getQuestionVoByIdUsingGet} from "@/api/questionController";
import QuestionCard from "@/app/components/QuestionCard";

/**
 * 题目详情页面
 * @constructor
 */
export default async function QuestionPage({ params }) {
  const { questionId } = params;

  // 获取题目详情
  let question = undefined;
  try {
    const res = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = res.data;
  } catch (e) {
    console.log("获取题库详情失败，" + e.message);
  }
  // 错误处理
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }

  return (
    <div id="question-page">
      <QuestionCard question={question} />
    </div>
  );
}
