export declare type Element = {
    type: 'element';
    name: string;
    attribs: {
        [s: string]: string;
    };
    children: Node[];
};
export declare type Text = {
    type: 'text';
    text: string;
    children: Node[];
};
export declare type Node = Element | Text;
export declare type Meta = {
    title: string;
    url: string;
    platforms?: string[];
    pathSegments?: string[];
    keywords?: string[];
    legacy?: boolean;
};
