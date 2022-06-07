import { SearchClient } from 'algoliasearch/lite';
import { Config, Result } from './lib/types';
declare type QueryArgs = {
    path?: string;
    platforms?: string[];
    searchAllIndexes?: boolean;
};
declare type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
declare type ConstructorConfig = string | Optional<Config, 'indexes'>;
declare class SentryGlobalSearch {
    configs: Config[];
    client: SearchClient;
    constructor(configs?: ConstructorConfig[]);
    query(query: string, args?: QueryArgs): Promise<Result[]>;
}
export default SentryGlobalSearch;
