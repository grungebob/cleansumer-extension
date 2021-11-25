using BizEthic.Data;
using BizEthic.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BizEthic.BusinessLogic
{
    public class DataAccess
    {
        BizEthicEntities db;
        BizEthicEntitiesAzure ADb;
        public DataAccess()
        {
           // db = new BizEthicEntities();
            ADb = new BizEthicEntitiesAzure();
        }

        public ResponseObject getFinalScore(string website)
        {
            // var result = "START";
            ResponseObject result = new ResponseObject();
             result.result = ADb.BizImpactDatas.Where(a=> a.website == website).Select(a=>a.overall_score).FirstOrDefault().ToString();
            return result;
        }

    }
}