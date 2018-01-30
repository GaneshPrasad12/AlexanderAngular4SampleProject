using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AlexanderProject.Angular4.Business.Entities;
using AlexanderProject.Angular4.Interfaces;
using AlexanderProject.Angular4.Portal.TokenManagement;
using AlexanderProject.Angular4.Business;
using AlexanderProject.Angular4.Business.Common;
using System.Security.Claims;
using Ninject;

namespace AlexanderProject.Angular4.Portal.WebApiControllers
{
    [RoutePrefix("api/customers")]
    public class CustomersController : ApiController
    {

        [Inject]
        public ICustomerDataService _customerDataService { get; set; }

        /// <summary>
        /// Import Customer
        /// </summary>
        /// <param name="request"></param>
        /// <param name="userInformation"></param>
        /// <returns></returns>
        [Route("ImportCustomers")]
        [HttpPost]
        public HttpResponseMessage ImportCustomers(HttpRequestMessage request, [FromBody] CustomerInformation customerInformation)
        {

            TransactionalInformation transaction = new TransactionalInformation();

            CustomerBusinessService customerBusinessService = new CustomerBusinessService(_customerDataService);
            customerBusinessService.ImportCustomers(out transaction);
            if (transaction.ReturnStatus == false)
            {
                var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.BadRequest, transaction);
                return badResponse;
            }

            customerInformation = new CustomerInformation();
            customerInformation.ReturnMessage = transaction.ReturnMessage;
            customerInformation.ReturnStatus = transaction.ReturnStatus;

            var response = Request.CreateResponse<CustomerInformation>(HttpStatusCode.OK, customerInformation);          
            return response;

        }

        /// <summary>
        /// Get Customers
        /// </summary>
        /// <param name="request"></param>
        /// <param name="userInformation"></param>
        /// <returns></returns>
        [Route("GetCustomers")]
        [HttpPost]
        public HttpResponseMessage GetCustomers(HttpRequestMessage request, [FromBody] CustomerInformation customerInformation)
        {

            TransactionalInformation transaction = new TransactionalInformation();

            string customerCode = customerInformation.CustomerCode;
            string companyName = customerInformation.CompanyName;
            int currentPageNumber = customerInformation.CurrentPageNumber;
            int pageSize = customerInformation.PageSize;
            string sortExpression = customerInformation.SortExpression;
            string sortDirection = customerInformation.SortDirection;

            int totalRows = 0;

            CustomerBusinessService customerBusinessService = new CustomerBusinessService(_customerDataService);
            List<Customer> customers = customerBusinessService.GetCustomers(customerCode, companyName, currentPageNumber, pageSize, sortDirection, sortExpression, out totalRows, out transaction);      
            if (transaction.ReturnStatus == false)
            {
                var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.BadRequest, transaction);
                return badResponse;
            }

            customerInformation = new CustomerInformation();        
            customerInformation.ReturnStatus = transaction.ReturnStatus;
            customerInformation.TotalRows = totalRows;
            customerInformation.TotalPages = Utilities.CalculateTotalPages(totalRows, pageSize);
            customerInformation.ReturnMessage.Add("page " + currentPageNumber + " of " + customerInformation.TotalPages + " returned at " + DateTime.Now.ToString());
            customerInformation.Customers = customers;

            var response = Request.CreateResponse<CustomerInformation>(HttpStatusCode.OK, customerInformation);
            return response;

        }

        /// <summary>
        /// Get Customer
        /// </summary>
        /// <param name="request"></param>
        /// <param name="customerInformation"></param>
        /// <returns></returns>
        [Route("GetCustomer")]
        [HttpPost]
        public HttpResponseMessage GetCustomer(HttpRequestMessage request, [FromBody] CustomerInformation customerInformation)
        {

            TransactionalInformation transaction = new TransactionalInformation();

            int customerID = customerInformation.CustomerID;          

            CustomerBusinessService customerBusinessService = new CustomerBusinessService(_customerDataService);
            customerInformation = customerBusinessService.GetCustomer(customerID, out transaction);
            if (transaction.ReturnStatus == false)
            {
                var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.BadRequest, transaction);
                return badResponse;
            }
         
            customerInformation.ReturnStatus = transaction.ReturnStatus;           

            var response = Request.CreateResponse<CustomerInformation>(HttpStatusCode.OK, customerInformation);
            return response;

        }


        /// <summary>
        /// Update Profile
        /// </summary>
        /// <param name="request"></param>
        /// <param name="customerInformation"></param>
        /// <returns></returns>
        [Route("UpdateCustomer")]
        [HttpPost]
        public HttpResponseMessage UpdateCustomer(HttpRequestMessage request, [FromBody] CustomerInformation customerInformation)
        {

            TransactionalInformation transaction = new TransactionalInformation();

            if (request.Headers.Authorization == null)
            {
                transaction.ReturnMessage.Add("Your session is invalid.");
                transaction.ReturnStatus = false;
                var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.Unauthorized, transaction);
                return badResponse;
            }

            string tokenString = request.Headers.Authorization.ToString();

            bool principal = TokenManager.ValidateToken(tokenString);

            if (!principal)
            {

                transaction.ReturnMessage.Add("Your session is invalid.");
                transaction.ReturnStatus = false;
                var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.Unauthorized, transaction);
                return badResponse;
            }
                   
            CustomerBusinessService customerBusinessService = new CustomerBusinessService(_customerDataService);
            customerBusinessService.UpdateCustomer(customerInformation, out transaction);
            if (transaction.ReturnStatus == false)
            {
                var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.BadRequest, transaction);
                return badResponse;
            }

            customerInformation.ReturnStatus = true;
            customerInformation.ReturnMessage = transaction.ReturnMessage;

            var response = Request.CreateResponse<CustomerInformation>(HttpStatusCode.OK, customerInformation);
            return response;


        }



    }
}
