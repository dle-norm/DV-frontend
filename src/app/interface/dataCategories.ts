export interface ancestors {
    id: number;
    name: string;
}

export interface dataCategory {
    id: number;
    name: string;
    nbKeywords: number;
    depth: number;
    ancestors: ancestors[];
}

export interface category {
    value: number;
    viewValue: string;
}
