export function formatDateByTime(dataISO: string): string {
    const data: Date = new Date(dataISO);
    const now: Date = new Date();
    const diffMs: number = now.getTime() - data.getTime();
    const diffSec: number = Math.floor(diffMs / 1000);
    const diffMin: number = Math.floor(diffSec / 60);
    const diffHour: number = Math.floor(diffMin / 60);
    const diffDays: number = Math.floor(diffHour / 24);
    const diffWeeks: number = Math.floor(diffDays / 7);
    const diffMonths: number = now.getMonth() - data.getMonth() + (12 * (now.getFullYear() - data.getFullYear()));

    if (diffMin < 1) {
        return `Há ${diffSec} segundos`;
    } else if (diffHour < 1) {
        return `Há ${diffMin} minutos`;
    } else if (diffDays < 1) {
        return `Há ${diffHour} horas`;
    } else if (diffDays < 7) {
        return `Há ${diffDays} dias`;
    } else if (diffWeeks < 4) {
        return `Há ${diffWeeks} semanas`;
    } else if (diffMonths < 12) {
        const optionsMonthYear: Intl.DateTimeFormatOptions  = { month: 'long', year: 'numeric' };
        return `Em ${data.toLocaleDateString('pt-BR', optionsMonthYear)}`;
    } else {
        const optionsMonthYear: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
        return `Em ${data.toLocaleDateString('pt-BR', optionsMonthYear)}`;
    }
}

export function formatTimeByMs(milliseconds: number): string {
    const minutes: number = Math.floor(milliseconds / 60000);
    const hours: number = Math.floor(minutes / 60);

    if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''}`;
    else return `${minutes} minuto${minutes > 1 ? 's' : ''}`;

}
