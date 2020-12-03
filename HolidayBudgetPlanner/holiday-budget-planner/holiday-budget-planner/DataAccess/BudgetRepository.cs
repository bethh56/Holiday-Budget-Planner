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

        public IEnumerable<Budget> GetAllBudgets()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select *
                        from Budget";

            var budgetPlan = db.Query<Budget>(sql);

            return budgetPlan;

        }

        public Budget GetCurrentBudget(int userId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select *
                        from Budget
                        where currentPlan = 1 AND Id = @userId";

            var parameters = new { userId };

            var budgetPlan = db.QueryFirstOrDefault<Budget>(sql, parameters);

            return budgetPlan;

        }
    }
}
