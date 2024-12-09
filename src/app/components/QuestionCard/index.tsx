"use client";

import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";
import React from "react";
import { Card } from "antd";
import Title from "antd/es/typography/Title";
import TagList from "@/app/components/TagList";
import MdViewer from "@/app/components/MdViewer";

interface Props {
  question: API.QuestionVO;
}

/**
 * 题目卡片
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {
  const { question } = props;

  return (
    <div className="question-card">
      <Card>
        <Title level={1} style={{ fontSize: 24 }}>
          {question.title}
        </Title>
        <TagList tagList={question.tagList} />
        <div style={{ marginBottom: 16 }} />
        <MdViewer value={question.content} />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <Card title="推荐答案">
        <MdViewer value={question.answer} />
      </Card>
    </div>
  );
};

export default QuestionCard;
