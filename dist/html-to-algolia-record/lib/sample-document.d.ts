declare type Result = {
    html: string;
    title: string;
    url: string;
};
declare const sampleDocument: () => Promise<Result>;
export default sampleDocument;
