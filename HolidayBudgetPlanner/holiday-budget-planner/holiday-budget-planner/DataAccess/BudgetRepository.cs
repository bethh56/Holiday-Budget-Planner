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

        public IEnumerable<Budget> GetAllBudgetsByUserId(int userId)
        {
            using var db = new SqlConnection(_connectionString);
            var parameters = new { userId };
            var sql = @"select *
	                    from Budget B
	                    join Holiday H
	                    on B.holidayId = H.id
	                    where B.userId = @userId
	                    ORDER BY H.holidayName, B.dateCreated desc";

            var budgetPlan = db.Query<Budget>(sql, parameters);

            return budgetPlan;

        }

        public Budget GetCurrentBudget(int userId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select TOP 1 B.id, B.dateCreated, B.userId, B.budgetAmount, Holiday.holidayName, B.holidayId
                        from Budget B
	                        join Holiday
	                        on Holiday.id = B.holidayId
                        where userId = @userId
                        ORDER BY B.dateCreated desc";

            var parameters = new { userId };

            var budgetPlan = db.QueryFirstOrDefault<Budget>(sql, parameters);

            return budgetPlan;

        }
        
        public void AddNewBudget(Budget budgetAdded)
        {
            var sql = @"INSERT INTO [dbo].[Budget]
                        ([HolidayId]
                        ,[BudgetAmount]
                        ,[DateCreated]
                        ,[UserId])
                       Output inserted.Id
                        VALUES
                             (@holidayId, @budgetAmount, @dateCreated, @userId)";
            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, budgetAdded);

            budgetAdded.Id = newId;
        }
    }
}
