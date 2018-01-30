using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AlexanderProject.Angular4.Interfaces;
using AlexanderProject.Angular4.Business.Entities;

namespace AlexanderProject.Angular4.Data.EntityFramework
{
   
    /// <summary>
    /// User Data Service
    /// </summary>
    public class UserDataService : EntityFrameworkService, IUserDataService
    {
        /// <summary>
        /// Create User
        /// </summary>
        /// <param name="user"></param>
        public void CreateUser(User user)
        {
            DateTime now = DateTime.Now;
            user.DateCreated = now;
            user.DateUpdated = now;
            dbConnection.Users.Add(user);
        }

        /// <summary>
        /// Update User
        /// </summary>
        /// <param name="user"></param>
        public void UpdateUser(User user)
        {
            user.DateUpdated = DateTime.Now;
        }

        /// <summary>
        /// Get User
        /// </summary>
        /// <param name="emailAddress"></param>
        /// <returns></returns>
        public User GetUser(string emailAddress)
        {
            User user = dbConnection.Users.Where(u => u.EmailAddress == emailAddress).FirstOrDefault();
            return user;
        }

        /// <summary>
        /// Get User
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public User GetUser(int userID)
        {
            User user = dbConnection.Users.Where(u => u.UserID == userID).FirstOrDefault();
            return user;
        }

    }
}
