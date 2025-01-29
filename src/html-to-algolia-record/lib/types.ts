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
  // deprecated in 0.5.9
  platforms?: string[];
  pathSegments?: string[];
  keywords?: string[];
  legacy?: boolean;

  /**
   * Rank sdks/frameworks by popularity.
   *
   * 1 = most popular, defaults to `MAX_SAFE_INTEGER` (least popular)
   */
  popularity?: number;
};
