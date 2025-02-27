import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";
import "github-markdown-css/github-markdown-light.css";
import dayjs from "dayjs";
import { getUserSignInRecordUsingGet } from "@/api/userController";
import { message } from "antd";

interface Props {}

/**
 * Markdown 编辑器
 * @param props
 * @constructor
 */
const CalendarChart = (props: Props) => {
  const {} = props;

  // 签到日期列表（[1, 200]，表示第 1 天和第 200 天有签到记录）
  const [dataList, setDataList] = useState<number[]>([]);
  // 当前年份
  const year: number = new Date().getFullYear();
  // 请求后端获取数据
  const fetchDataList = async () => {
    try {
      const res = await getUserSignInRecordUsingGet({
        year,
      });
      setDataList(res.data || []);
    } catch (e) {
      message.error("获取刷题记录失败，" + e.message);
    }
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  // 计算日历图所需要的数据
  const optionsData: [string, number][] = dataList.map((dayOfYear: number) => {
    // 计算日期字符串
    const dateStr: string = dayjs(`${year}-01-01`)
      .add(dayOfYear - 1, "day")
      .format("YYYY-MM-DD");
    return [dateStr, 1];
  });
  // 图表配置
  const options = {
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        // 颜色从灰色到浅绿色
        color: ["#efefef", "lightgreen"],
      },
    },
    calendar: {
      range: year,
      left: 20,
      // 单元格自动宽度，高度为 16 像素
      cellSize: ["auto", 16],
      yearLabel: {
        position: "top",
        formatter: `${year} 年刷题记录`,
      },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: optionsData,
    },
  };

  return <ReactECharts className="calendar-chart" option={options} />;
};

export default CalendarChart;
