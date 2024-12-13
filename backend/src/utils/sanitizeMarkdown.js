import {marked} from "marked";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const sanitizeMarkdown = (markdown) => {
  const html = marked(markdown);

  const window = new JSDOM("").window;
  const purify = DOMPurify(window);

  const sanitizedHtml = purify.sanitize(html);

  return sanitizedHtml;
};

export default sanitizeMarkdown;
