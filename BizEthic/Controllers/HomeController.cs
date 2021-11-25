using BizEthic.BusinessLogic;
using BizEthic.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace BizEthic.Controllers
{
    public class HomeController : Controller
    {
        DataAccess globalDA = new DataAccess();
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        [System.Web.Http.HttpGet]
        [Route("GetOverAllScore")]
        [ResponseType(typeof(ResponseObject))]
        public IHttpActionResult GetOverAllScore(string company_id)
        {
            ResponseObject res = new ResponseObject();
            company_id = "0013b00001nDrfVAAS";
            HttpResponseMessage response=null;
            res = globalDA.getFinalScore(company_id);

            return (IHttpActionResult)response;
        }

        
    }
}
