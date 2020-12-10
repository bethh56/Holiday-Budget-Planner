using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using holiday_budget_planner.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace holiday_budget_planner.DataAccess
{
    public class GiftRepository
    {
        static List<Gift> budget = new List<Gift>();

        const string _connectionString = "Server=localhost;Database=HolidayBudgetPlanner;Trusted_Connection=True";

        public IEnumerable<Gift> GetGift(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var parameters = new { userId };

            var sql = @"select G.recepient, G.item, G.budgetId, G.price
                        from Gift G
	                        join Budget B on 
	                        B.id = G.budgetId
	                        where B.currentPlan = 1 AND userId = @userId AND G.isActive = 1
                        GROUP BY  G.recepient, G.item, G.budgetId, G.price";

            var gift = db.Query<Gift>(sql, parameters);

            return gift;
        }
    }
}
