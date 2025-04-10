export class Movie {
    constructor(
        public readonly year: number,
        public readonly title: string,
        public readonly studios: string,
        public readonly producers: string[],
        public readonly winner: boolean,
    ) { }
}
