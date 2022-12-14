import { tempData } from './tempData';

export const tempLookup = (host: string) => {
    console.log('host: ', host);
    console.log('temp data: ', tempData[host]);
    const score = tempData[host];
    console.log('score: ', score);
    return score ?? null;
};