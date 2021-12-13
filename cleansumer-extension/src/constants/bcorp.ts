export const bCorp = async (host: string) => {
    console.log('bcorp host: ', host);
    try {
        const response = await fetch(`https://bizdataapi.azurewebsites.net/BizEthic/GetOverAllScore?website=${host}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
        });
        console.log('response: ', response);
        const resJson = response.json();
        console.log('resJson', resJson);
        return resJson;

    } catch (e) {
        console.log('catch: e:', e);
    }
};