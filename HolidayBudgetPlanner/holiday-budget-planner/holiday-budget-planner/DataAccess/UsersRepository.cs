﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using holiday_budget_planner.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace holiday_budget_planner.DataAccess
{
    public class UsersRepository
    {
        static List<Users> user = new List<Users>();

        const string _connectionString = "Server=localhost;Database=HolidayBudgetPlanner;Trusted_Connection=True";

        public IEnumerable<Users> GetAllUsers()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select *
                        from Users";

            var users = db.Query<Users>(sql);

            return users;

        }

        public Users GetUserById(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"SELECT * from Users WHERE id = @id";

            var parameters = new { id = userId };

            var singleUser = db.QueryFirstOrDefault<Users>(sql, parameters);

            return singleUser;
        }
        public void Add(Users userToAdd)
        {
            var sql = @"INSERT INTO [dbo].[Users]
                           ([FirstName]
                           ,[LastName]
                           ,[Email]
                           ,[Password]
                           ,[IsActive]
                           ,[Uid])
                         Output inserted.Id
                         VALUES
                             (@firstName, @lastName, @email, @password, @isActive, @uid)";
            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, userToAdd);

            userToAdd.Id = newId;
        }

    }
}
