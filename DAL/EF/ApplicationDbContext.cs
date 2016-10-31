using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace DAL.EF
{
    public sealed class ApplicationDbContext : DbContext
    {
        private static string _connection;
        private static volatile ApplicationDbContext instance;
        private static object syncRoot = new Object();

        private ApplicationDbContext() { }
        public static ApplicationDbContext Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (syncRoot)
                    {
                        if (instance == null)
                            instance = new ApplicationDbContext("ApplicationDbContext");
                    }
                }

                return instance;
            }
        }
        private ApplicationDbContext(string connectionString)
            : base("ApplicationDbContext")
        {
            _connection = connectionString;
        }

        public DbSet<Message> Texts { get; set; }
   }
}