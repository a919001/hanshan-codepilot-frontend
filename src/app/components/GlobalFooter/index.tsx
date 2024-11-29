import "./index.css";

/**
 * 全局底部栏组件
 * @constructor
 */
export default function GlobalFooter() {
  const fullYear = new Date().getFullYear();
  return (
    <div className="global-footer">
      <div>© {fullYear} 面试刷题平台</div>
      <div>
        <a href="https://github.com/a919001" target="_blank">
          作者：寒山
        </a>
      </div>
    </div>
  );
}
