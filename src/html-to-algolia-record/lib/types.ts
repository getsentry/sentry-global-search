export type Element = {
  type: 'element';
  name: string;

  attribs: {
    [s: string]: string;
  };
  children: Node[];
};

export type Text = {
  type: 'text';
  text: string;
  children: Node[];
};

export type Node = Element | Text;

export type Meta = {
  title: string;
  url: string;
  sdk?: string;
  framework?: string;
  pathSegments?: string[];
  keywords?: string[];
  legacy?: boolean;
};
