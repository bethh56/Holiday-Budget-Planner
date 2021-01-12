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

        const string _connectionString = "Data Source=tcp:holidaybudgetplanner.database.windows.net,1433;Initial Catalog=HolidayBudgetPlanner;User Id=bethh_56@holidaybudgetplanner;Password=S@ndydog56";

        public IEnumerable<Budget> GetAllBudgetsByUserId(int userId)
        {
            using var db = new SqlConnection(_connectionString);
            var parameters = new { userId };
            var sql = @"select B.Id AS Id, B.budgetAmount, B.dateCreated, B.userId AS userId, H.holidayName
	                    from Budget B
	                    join Holiday H
	                    on B.holidayId = H.id
	                    where B.userId = @userId
	                    ORDER BY H.holidayName, B.dateCreated desc";

            var budgetPlan = db.Query<Budget>(sql, parameters);

            return budgetPlan;

        }

        public Budget GetSingleBudgetByBudgetId(int budgetId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select *
                        from Budget B
	                        join Holiday
	                        on Holiday.id = B.holidayId
                        where B.Id = @budgetId";

            var parameters = new { budgetId };

            var singleBudgetbyBudgetId = db.QueryFirstOrDefault<Budget>(sql, parameters);

            return singleBudgetbyBudgetId;

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
        public void RemoveBudget(int id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"DELETE
                        FROM Budget
                        WHERE Id = @id";

            db.Execute(sql, new { id = id });

        }
    }
}
