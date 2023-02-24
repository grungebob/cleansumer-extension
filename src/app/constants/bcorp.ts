import axios from 'axios';

export const bcorpOverall = async (host: string) => {
    try {
        const res = await axios.get(`https://bizdataapi.azurewebsites.net/Biz/GetOverAllScore?website=${host}`);
        console.log(' bcorpOverall res: ', res);
        return res;
    } catch (e) {
        console.error('ERROR: ', e);
    }
}

export const bcorpProfile = async (host: string) => {
    try {
        const res = await axios.get(`https://bizdataapi.azurewebsites.net/Biz/GetBcorpProfile?website=${host}`);
        console.log(' bcorpProfile res: ', res);
        return res;
    } catch (e) {
        console.error('ERROR: ', e);
    }
}

// axios.get(`https://bizdataapi.azurewebsites.net/BizEthic/GetOverAllScore?website=${host}`);
//       .then(res => {
//         console.log('res', res);
//         return res;
//       }) .catch(e => {
//           console.log('error ', e);
//       })