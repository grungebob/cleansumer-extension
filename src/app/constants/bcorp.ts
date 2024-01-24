const changeHostPrefix = (host: string) => {
    if (host.slice(0, 4) === 'www.') return host.slice(4);
    return `www.${host}`;
}

export const bcorpOverall = async (host: string, secondTime?: boolean) => {
    try {
        const res = await fetch(`https://bizdataapi.azurewebsites.net/Biz/GetOverAllScore?website=${host}`);
        // debugger
        const response = await res?.json()
        // debugger
        console.log('bcorpOverall response: ', response);
        console.log('bcorpOverall response: ', typeof response);

        if(!response && !secondTime) {
            console.log('running bcorp overall second time')
            return bcorpOverall(changeHostPrefix(host), true);
        }
        return response;
    } catch (e) {
        console.error('bcorpOverall error: ', e);
        if(!secondTime) {
            bcorpOverall(changeHostPrefix(host), true)
        }
    }
}

export const bcorpProfile = async (host: string, secondTime?: boolean) => {
    try {
        const res = await fetch (`https://bizdataapi.azurewebsites.net/Biz/GetBcorpProfile?website=${host}`);
        console.log('bcorp profile res: ', res);
        const response = await res?.text();
        console.log('bcorpProfile response: ', response);
        if(!response && !secondTime) {
            return bcorpProfile(changeHostPrefix(host), true);
        }
        return response;
    } catch (e) {
        console.log('bcorpProfile error: ', e);
        if(!secondTime) {
            bcorpProfile(changeHostPrefix(host), true)
        }
    }
}
