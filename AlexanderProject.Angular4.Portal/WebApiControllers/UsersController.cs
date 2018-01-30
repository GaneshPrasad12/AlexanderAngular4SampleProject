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
using System.Security.Claims;
using Ninject;

namespace AlexanderProject.Angular4.Portal.WebApiControllers
{
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {

        [Inject]
        public IUserDataService _userDataService { get; set; }

        [Route("Ping")]
        [HttpPost]   
        public HttpResponseMessage Ping([FromBody] UserInformation userInformation)
        {

            TransactionalInformation transaction = new TransactionalInformation();

            userInformation = new UserInformation();
            userInformation.ReturnStatus = true;
            userInformation.ReturnMessage.Add("Ping was successful");

            var response = Request.CreateResponse<UserInformation>(HttpStatusCode.OK, userInformation);          
            return response;

        }

        /// <summary>
        /// Register User
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        [Route("RegisterUser")]      
        [HttpPost]
        public HttpResponseMessage RegisterUser(HttpRequestMessage request, [FromBody] UserInformation userInformation)
        {

            TransactionalInformation transaction = new TransactionalInformation();

            UserBusinessService userBusinessService = new UserBusinessService(_userDataService);
            User user = userBusinessService.RegisterUser(userInformation, out transaction);
            if (transaction.ReturnStatus == false)
            {
                var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.BadRequest, transaction);
                return badResponse;
            }

            userInformation.UserID = user.UserID;

            string tokenString = TokenManager.CreateToken(userInformation);

            userInformation.UserID = user.UserID;
            userInformation.ReturnStatus = true;
            userInformation.ReturnMessage = transaction.ReturnMessage;

            var response = Request.CreateResponse<UserInformation>(HttpStatusCode.OK, userInformation);
            response.Headers.Add("Access-Control-Expose-Headers", "Authorization");
            response.Headers.Add("Authorization", tokenString);
            return response;

        }

        /// <summary>
        /// Login
        /// </summary>
        /// <param name="request"></param>
        /// <param name="userInformation"></param>
        /// <returns></returns>
        [Route("Login")]
        [HttpPost]
        public HttpResponseMessage Login(HttpRequestMessage request, [FromBody] UserInformation userInformation)
        {

            string errorMessage = string.Empty;

  
            TransactionalInformation transaction = new TransactionalInformation();

            string emailAddress = userInformation.EmailAddress;
            string password = userInformation.Password;

            UserBusinessService userBusinessService = new UserBusinessService(_userDataService);
            User user = userBusinessService.Login(emailAddress, password, out transaction);
            if (transaction.ReturnStatus == false)
            {
                var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.BadRequest, transaction);
                return badResponse;
            }

            userInformation.UserID = user.UserID;

            string tokenString = TokenManager.CreateToken(userInformation);

            userInformation.UserID = user.UserID;
            userInformation.EmailAddress = user.EmailAddress;
            userInformation.FirstName = user.FirstName;
            userInformation.LastName = user.LastName;
            userInformation.AddressLine1 = user.AddressLine1;
            userInformation.AddressLine2 = user.AddressLine2;
            userInformation.City = user.City;
            userInformation.State = user.State;
            userInformation.ZipCode = user.ZipCode;

            userInformation.ReturnStatus = true;
            userInformation.ReturnMessage = transaction.ReturnMessage;

            var response = Request.CreateResponse<UserInformation>(HttpStatusCode.OK, userInformation);
            response.Headers.Add("Access-Control-Expose-Headers", "Authorization");
            response.Headers.Add("Authorization", tokenString);
            return response;

        }

        /// <summary>
        /// Authenicate
        /// </summary>
        /// <param name="request"></param>
        /// <param name="userInformation"></param>
        /// <returns></returns>
        [Route("Authenicate")]
        [HttpPost]
        public HttpResponseMessage Authenicate(HttpRequestMessage request, [FromBody] UserInformation userInformation)
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

            int userID = TokenManager.GetUserID(Request.Headers.Authorization.ToString());
            if (userID == 0)
            {
                transaction.ReturnMessage.Add("Your session is invalid.");
                transaction.ReturnStatus = false;
                var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.Unauthorized, transaction);
                return badResponse;
            }

            UserBusinessService userBusinessService = new UserBusinessService(_userDataService);
            User user = userBusinessService.Authenicate(userID, out transaction);
            if (transaction.ReturnStatus == false)
            {
                var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.BadRequest, transaction);
                return badResponse;
            }

            userInformation.UserID = user.UserID;
            userInformation.EmailAddress = user.EmailAddress;
            userInformation.FirstName = user.FirstName;
            userInformation.LastName = user.LastName;
            userInformation.AddressLine1 = user.AddressLine1;
            userInformation.AddressLine2 = user.AddressLine2;
            userInformation.City = user.City;
            userInformation.State = user.State;
            userInformation.ZipCode = user.ZipCode;

            userInformation.IsAuthenicated = true;          
            userInformation.ReturnStatus = true;

            var response = Request.CreateResponse<UserInformation>(HttpStatusCode.OK, userInformation);
            response.Headers.Add("Access-Control-Expose-Headers", "Authorization");
            response.Headers.Add("Authorization", tokenString);
            return response;


        }


        /// <summary>
        /// Update Profile
        /// </summary>
        /// <param name="request"></param>
        /// <param name="userInformation"></param>
        /// <returns></returns>
        [Route("UpdateProfile")]
        [HttpPost]
        public HttpResponseMessage UpdateProfile(HttpRequestMessage request, [FromBody] UserInformation userInformation)
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

            int userID = TokenManager.GetUserID(Request.Headers.Authorization.ToString());
            if (userID == 0)
            {
                transaction.ReturnMessage.Add("Your session is invalid.");
                transaction.ReturnStatus = false;
                var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.Unauthorized, transaction);
                return badResponse;
            }

            userInformation.UserID = userID;

            UserBusinessService userBusinessService = new UserBusinessService(_userDataService);
            userBusinessService.UpdateProfile(userInformation, out transaction);
            if (transaction.ReturnStatus == false)
            {
                var badResponse = Request.CreateResponse<TransactionalInformation>(HttpStatusCode.BadRequest, transaction);
                return badResponse;
            }
                    
            userInformation.ReturnStatus = true;
            userInformation.ReturnMessage = transaction.ReturnMessage;

            var response = Request.CreateResponse<UserInformation>(HttpStatusCode.OK, userInformation);           
            return response;


        }

    }
}
