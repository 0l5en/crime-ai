const formatter = new Intl.DateTimeFormat(navigator.language, {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
});

const isoDateTimeFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?/g;

export const getCsrfToken = () => document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, '$1');
export const formatISODateTimeString = (isoDateTimeString: string) => formatter.format(new Date(isoDateTimeString));
export const replaceISODateTimeString = (text: string): string => text.replace(isoDateTimeFormat, (match) => {
    return formatISODateTimeString(match);
});