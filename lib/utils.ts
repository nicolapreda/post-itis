
export interface Newspaper {
    id: number;
    title: string;
    year: string;
    [key: string]: any;
}

export function groupNewspapersByYear<T extends Newspaper>(newspapers: T[]): Record<string, T[]> {
    return newspapers.reduce((groups, paper) => {
        const year = paper.year;
        if (!groups[year]) {
            groups[year] = [];
        }
        groups[year].push(paper);
        return groups;
    }, {} as Record<string, T[]>);
}
