import React, { useRef, useEffect } from "react";
import hljs from "highlight.js";

interface ICodeBlock {
  language: string;
  value: string;
}

const CodeBlock: React.FC<ICodeBlock> = ({ language, value }) => {
  const elementRef = useRef();

  useEffect(() => {
    highlightCode();
  });

  const highlightCode = () => {
    hljs.highlightBlock(elementRef.current);
  };

  return (
    <pre>
      <code ref={elementRef} className={`language-${language}`}>
        {value}
      </code>
    </pre>
  );
};

export default CodeBlock;
