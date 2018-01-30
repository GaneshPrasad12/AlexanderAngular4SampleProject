using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AlexanderProject.Angular4.Business.Entities;
using System.Data.Entity;

namespace AlexanderProject.Angular4.Data.EntityFramework
{
    /// <summary>
    /// AlexanderProject Entity Framework Database Context
    /// </summary>
    public class AngularDatabase : DbContext
    {

        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }

        /// <summary>
        /// Model Creation
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().ToTable("dbo.Users");
            modelBuilder.Entity<Customer>().ToTable("dbo.Customers");


        }
    }
}
