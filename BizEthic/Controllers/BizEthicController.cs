using BizEthic.BusinessLogic;
using BizEthic.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;

namespace BizEthic.Controllers
{
    public class BizEthicController : Controller
    {
        DataAccess globalDA;
        public BizEthicController()
        {
            globalDA = new DataAccess();
        }
        // GET: BizEthic
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("GetOverAllScore")]
        [ResponseType(typeof(ResponseObject))]
        public string GetOverAllScore(string website)
        {
            ResponseObject res = new ResponseObject();
          //  company_id = "0013b00001nDrfVAAS";
            HttpResponseMessage response = null;
            res = globalDA.getFinalScore(website);

            return res.result;
        }

        ////public ActionResult Index()
        ////{
        ////    return View();
        ////}
    }
}