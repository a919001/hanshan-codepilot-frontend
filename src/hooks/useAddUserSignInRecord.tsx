import { useEffect, useState } from "react";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "github-markdown-css/github-markdown-light.css";
import { addUserSignInUsingPost } from "@/api/userController";
import { message } from "antd";

/**
 * 添加用户签到记录钩子
 * @constructor
 */
const useAddUserSignInRecord = () => {
  // 签到状态
  const [loading, setLoading] = useState<boolean>(true);

  // 请求后端获取数据
  const doFetch = async () => {
    try {
      await addUserSignInUsingPost();
      setLoading(false);
    } catch (e) {
      message.error("获取刷题记录失败，" + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    doFetch();
  }, []);

  return { loading };
};

export default useAddUserSignInRecord;
