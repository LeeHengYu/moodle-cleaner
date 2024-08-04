export class SortingKey {
    key: string; // 'alphabetical', 'time', 'user-defined'
    userSignificance?: string = '';
    reverse: boolean = false; 

    constructor(key?: string) {
        if (!key) {
            this.key = 'alphabetical';
        } else {
            this.key = key;
        }
    }

    setKey(key: string): void {
        this.key = key;
    }

    setUserSignificance(userSignificance: string): void {
        this.userSignificance = userSignificance;
    }

    reverseOrder(): void {
        this.reverse = !this.reverse;
    }
}

export class FilterParam {
    year?: number;
    sem?: number;
    prefixes?: String[]; 

    constructor(year?: number, sem?: number, prefixes?: String[]) {
        this.year = year;
        this.sem = sem;
        this.prefixes = prefixes;
    }

    setYear(year: number): void {
        this.year = year;
    }

    setSem(sem: number): void {
        this.sem = sem;
    }   

    setPrefixes(prefixes: String[]): void {
        this.prefixes = prefixes;
    }   
}


export class UserConfiguration {
    sortingKey: SortingKey;
    filter?: FilterParam;
    buttonColor?: string; // to be adjusted according to color picker return type

    constructor(sortingKey?: SortingKey, filter?: FilterParam) {
        if (sortingKey) {
            this.sortingKey = sortingKey;
        } else {
            this.sortingKey = new SortingKey();
        }

        if (!filter){    
            filter = new FilterParam();
        } else {
            filter = filter;
        }
    }
}
