export interface IFilter {
    operator: string;
    filters: [{
        op: string;
        values: [string];
        field: string;
    }]
}
