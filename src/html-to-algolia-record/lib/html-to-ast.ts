import { Parser } from 'htmlparser2';
import { DomHandler } from 'domhandler';

/**
 * Convert an HTML string into an AST
 */
export const htmlToAST = (html: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const callback = (error, dom): void => {
      if (error) {
        reject(error);
      } else {
        resolve(dom);
      }
    };
    const handler = new DomHandler(callback);
    const parser = new Parser(handler);

    parser.write(html);
    parser.end();
  });
};

