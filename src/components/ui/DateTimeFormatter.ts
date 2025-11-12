export const toLocalizedString = (isoDtaeTime: string) => {
    const date: Date = new Date(isoDtaeTime);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}