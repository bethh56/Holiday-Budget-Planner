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
    }
}
