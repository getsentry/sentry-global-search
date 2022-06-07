import { SearchOptions } from '@algolia/client-search';
export declare const defaultQueryParams: Partial<SearchOptions>;
export declare const sites: {
    site: import("./types").Site;
    name?: string | undefined;
    indexes: import("./types").Index[];
    pathBias: boolean;
    platformBias: boolean;
    legacyBias: boolean;
}[];
