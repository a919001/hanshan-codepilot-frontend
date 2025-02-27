import { Button, Form, message, Modal, Select } from "antd";
import React, { useEffect } from "react";
import { batchRemoveQuestionsFromQuestionBankUsingPost } from "@/api/questionBankQuestionController";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";

interface Props {
  questionIdList?: number[];
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 批量从题库移除题目弹窗
 *
 * @param props
 * @constructor
 */
const BatchRemoveQuestionsFromBankModel: React.FC<Props> = (props) => {
  const { questionIdList, visible, onSubmit, onCancel } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = React.useState<
    API.QuestionBankVO[]
  >([]);

  // 获取题库列表
  const getQuestionBankList = async () => {
    // 题库数量不多，直接全量获取
    const pageSize = 100;
    try {
      const res = await listQuestionBankVoByPageUsingPost({
        pageSize,
        sortField: "createTime",
        sortOrder: "descend",
      });
      // @ts-ignore
      setQuestionBankList(res.data.records ?? []);
    } catch (e: any) {
      console.error("获取题库列表失败，" + e.message);
    }
  };

  useEffect(() => {
    getQuestionBankList();
  }, []);

  /**
   * 提交
   *
   * @param fields
   */
  const doSubmit = async (fields: API.QuestionBankQuestionBatchRemoveRequest) => {
    const hide = message.loading("正在操作");
    const questionBankId = fields.questionBankId;
    try {
      await batchRemoveQuestionsFromQuestionBankUsingPost({
        questionIdList,
        questionBankId,
      });
      hide();
      message.success("操作成功");
      onSubmit?.();
    } catch (error: any) {
      hide();
      message.error("操作失败" + error.message);
    }
  };

  return (
    <Modal
      destroyOnClose
      title={"批量从题库移除题目"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form form={form} style={{ marginTop: 24 }} onFinish={doSubmit}>
        <Form.Item label="选择" name="questionBankId">
          <Select
            style={{ width: "100%" }}
            options={questionBankList.map((questionBank) => {
              return {
                label: questionBank.title,
                value: questionBank.id,
              };
            })}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default BatchRemoveQuestionsFromBankModel;
