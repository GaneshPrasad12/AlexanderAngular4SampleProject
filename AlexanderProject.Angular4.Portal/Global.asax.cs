using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Http;

namespace AlexanderProject.Angular4.Portal
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
           
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

        }

        protected void Application_BeginRequest()
        {


            var currentRequest = HttpContext.Current.Request;
            var currentResponse = HttpContext.Current.Response;

            string currentOriginValue = string.Empty;
            string currentHostValue = string.Empty;

            var currentRequestOrigin = currentRequest.Headers["Origin"];
            var currentRequestHost = currentRequest.Headers["Host"];
            var currentRequestHeaders = currentRequest.Headers["Access-Control-Request-Headers"];
            var currentRequestMethod = currentRequest.Headers["Access-Control-Request-Method"];

            if (currentRequestOrigin != null)
            {
                currentOriginValue = currentRequestOrigin;
            }

            currentResponse.AppendHeader("Access-Control-Allow-Origin", currentOriginValue);

            foreach (var key in Request.Headers.AllKeys)
            {
                if (key == "Origin" && Request.HttpMethod == "OPTIONS")
                {

                    currentResponse.AppendHeader("Access-Control-Allow-Credentials", "true");
                    currentResponse.AppendHeader("Access-Control-Allow-Headers", currentRequestHeaders);
                    currentResponse.AppendHeader("Access-Control-Allow-Methods", currentRequestMethod);
                    currentResponse.StatusCode = 200;
                    currentResponse.End();
                }
            }

        }

    }
}
