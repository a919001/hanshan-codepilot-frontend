import type { FC } from "react";
import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import gfmLocale from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import highlight from "@bytemd/plugin-highlight";
import locale from "bytemd/locales/zh_Hans.json";
import "bytemd/dist/index.css";
import "./index.css";

interface Props {
    value?: string;
    onChange?: (v: string) => void;
    placeholder?: string;
}

const plugins = [
    gfm({
        locale: gfmLocale,
    }),
    highlight(),
];

/**
 * Markdown 编辑器
 */
const MdEditor: FC<Props> = (props) => {
    const { value = "", onChange, placeholder } = props;

    return (
        <div className="md-editor">
            <Editor
                value={value || ""}
                placeholder={placeholder}
                editorConfig={{
                    // 不显示行数
                    lineNumbers: false,
                    autofocus: false,
                }}
                mode="split"
                locale={locale}
                plugins={plugins}
                onChange={onChange}
            />
        </div>
    );
};

export default MdEditor;

