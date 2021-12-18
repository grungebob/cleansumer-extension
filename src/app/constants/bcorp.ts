import axios from 'axios';

export const bcorp = async (host: string) => {
    try {
        const res = await axios.get(`https://bizdataapi.azurewebsites.net/BizEthic/GetOverAllScore?website=${host}`);
        console.log('res: ', res);
        console.log('res: ', res.data);

        return res.data;
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