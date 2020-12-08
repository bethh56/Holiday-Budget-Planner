using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using holiday_budget_planner.Models;
using Microsoft.Data.SqlClient;
using Dapper;

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
        public void AddUser(Users userToAdd)
        {
            var sql = @"INSERT INTO [dbo].[Users]
                                 ([FirstName]
                                 ,[LastName]
                                 ,[Email]
                                 ,[Password]
                                 ,[IsActive]
                                 ,[Uid]   
                                 )
                                Output inserted.id
                                VALUES
                                (@Email,@FirstName,@LastName,@Password,@IsActive,@Uid)";
            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, userToAdd);

            userToAdd.Id = newId;

        }

    }
}
