import axios from 'axios';

const changeHostPrefix = (host: string) => {
    if (host.slice(0, 4) === 'www.') return host.slice(4);
    return `www.${host}`;
}

export const bcorpOverall = async (host: string, secondTime?: boolean) => {
    try {
        const res = await axios.get(`https://bizdataapi.azurewebsites.net/Biz/GetOverAllScore?website=${host}`);
        console.log(' bcorpOverall res: ', res);
        if(res?.data === '') {
            return bcorpOverall(changeHostPrefix(host), true);
        }
        return res;
    } catch (e) {
        console.error('bcorpOverall error: ', e);
        if(!secondTime) {
            bcorpOverall(changeHostPrefix(host), true)
        }
    }
}

export const bcorpProfile = async (host: string, secondTime?: boolean) => {
    try {
        const res = await axios.get(`https://bizdataapi.azurewebsites.net/Biz/GetBcorpProfile?website=${host}`);
        console.log(' bcorpProfile res: ', res);
        return res;
    } catch (e) {
        console.log('bcorpProfile error: ', e);
        if(!secondTime) {
            bcorpProfile(changeHostPrefix(host), true)
        }
    }
}

// axios.get(`https://bizdataapi.azurewebsites.net/BizEthic/GetOverAllScore?website=${host}`);
//       .then(res => {
//         console.log('res', res);
//         return res;
//       }) .catch(e => {
//           console.log('error ', e);
//       })