using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using holiday_budget_planner.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace holiday_budget_planner.DataAccess
{
    public class BudgetRepository
    {
        static List<Budget> budget = new List<Budget>();

        const string _connectionString = "Server=localhost;Database=HolidayBudgetPlanner;Trusted_Connection=True";

        public IEnumerable<Budget> GetCurrentPlan()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select *
                        from Budget";

            var currentBudgetPlan = db.Query<Budget>(sql);

            return currentBudgetPlan;

        }
    }
}
