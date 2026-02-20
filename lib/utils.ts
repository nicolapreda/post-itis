
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
// Returns "YYYY-YYYY" string for current school year (Sept-Aug cycle)
export function getCurrentSchoolYear(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-11, 8 is September

    // If we are in or after September, the school year is Current-Next
    if (month >= 8) {
        return `${year}-${year + 1}`;
    } else {
        // Before September, school year is Previous-Current
        return `${year - 1}-${year}`;
    }
}

export function getRecentSchoolYears(count: number = 10): string[] {
    const current = getCurrentSchoolYear();
    const [startYear] = current.split('-').map(Number);

    const years = [];
    // Show next year too, just in case (e.g. preparing for next year in August)
    // Actually, stick to logic: if it's Aug, we default to old year. If user wants new, they can pick from list if we include "next"? 
    // Usually admin uploads for current or past. 
    // Let's just show current down to past.
    for (let i = 0; i < count; i++) {
        years.push(`${startYear - i}-${startYear - i + 1}`);
    }
    return years;
}
