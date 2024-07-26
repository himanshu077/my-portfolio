import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/esm/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rangeParser from "parse-numeric-range";
import { enqueueSnackbar } from "notistack";
import { appEnvs } from "../../lib/env";
import "./readme.css";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);

const ReadMe = ({ repo, branch, fileName = "README.md", markdown = "" }) => {
  const [readme, setReadme] = useState(null);

  useEffect(() => {
    if (markdown) {
      setReadme(markdown);
    } else {
      fetch(
        `https://raw.githubusercontent.com/${appEnvs.REACT_APP_GITHUB_USERNAME}/${repo}/${branch}/${fileName}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then((text) => setReadme(text))
        .catch(() => setReadme(null));
    }
  }, [repo, branch, fileName, markdown]);

  const syntaxTheme = coldarkDark;

  const getImageUrl = (src) => {
    return `https://raw.githubusercontent.com/${appEnvs.REACT_APP_GITHUB_USERNAME}/${repo}/${branch}/${src}`;
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    enqueueSnackbar("Code copied to clipboard", { variant: "success" });
  };

  const MarkdownComponents = {
    img({ node, ...props }) {
      const newSrc = getImageUrl(props.src);
      return markdown ? (
        <img {...props} alt={props.alt} />
      ) : (
        <img {...props} src={newSrc} alt={props.alt} />
      );
    },
    code({ node, inline, className, children, ...props }) {
      const hasLang = /language-(\w+)/.exec(className || "");
      const hasMeta = node?.data?.meta;

      if (inline) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }

      const applyHighlights = (applyHighlights) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node.data.meta?.replace(/\s/g, "");
          const strlineNumbers = RE?.test(metadata)
            ? RE?.exec(metadata)[1]
            : "0";
          const highlightLines = rangeParser(strlineNumbers);
          const highlight = highlightLines;
          const data = highlight.includes(applyHighlights) ? "highlight" : null;
          return { data };
        } else {
          return {};
        }
      };

      return hasLang ? (
        <div className="syntaxHighlightContainer">
          <button
            className="copyButton"
            onClick={() => copyToClipboard(children)}
          >
            Copy
          </button>
          <SyntaxHighlighter
            style={syntaxTheme}
            language={hasLang[1]}
            PreTag="div"
            className="codeStyle"
            showLineNumbers={false}
            wrapLines={hasMeta}
            useInlineStyles={true}
            lineProps={applyHighlights}
          >
            {children}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="markdown-container">
      {readme ? (
        <Markdown
          className="prose !max-w-full"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={MarkdownComponents}
        >
          {readme}
        </Markdown>
      ) : (
        <div className="flex">
          <p className="text-neutrals-400 font-semibold">No details available for this project!</p>
        </div>
      )}
    </div>
  );
};

export default ReadMe;
