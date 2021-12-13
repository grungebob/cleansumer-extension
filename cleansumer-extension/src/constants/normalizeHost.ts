export const normalizeHost = (host: string) => {
    if (host.indexOf('www.') !== -1 && host.indexOf('https://') !== -1) {
        return host.slice(12).replace(/ /g, '');
    }
    if (host.indexOf('www.') !== -1) {
        return host.slice(4).replace(/ /g, '');
    }
    return host.replace(/ /g, '');
}