
export class VocabQuery {
    prefixedName: Array<string>;
    vocabulary: {'prefix': Array<string>};
    uri: Array<string>;
    metrics: {'ocurrencesInDatasets': Array<string>,
                'reusedByDatasets': Array<string>};
    type: string;
    score: number;
    highlight: any;
}