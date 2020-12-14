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

        public Gift GetGift(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var parameters = new { userId };

            var sqlForTotalPrice = @"select G.budgetId, B.dateCreated, SUM(price) as TotalPrice
                                        from Gift G
	                                        join Budget B on 
	                                        B.id = G.budgetId
	                                        where userId = @userId AND G.isActive = 1
                                        GROUP BY G.budgetId, B.dateCreated
                                        ORDER BY B.dateCreated desc";

            var giftTotalByBudgetId = db.QueryFirstOrDefault<Gift>(sqlForTotalPrice, parameters);

            var sql = @"select G.recepient, G.item, G.price, G.id, G.IsActive, B.dateCreated
                        from Gift G
	                        join Budget B on 
	                        B.id = G.budgetId
	                        where userId = @userId AND G.isActive = 1
                        GROUP BY  G.recepient, G.item, G.price, G.id, G.IsActive, B.dateCreated
                        ORDER BY B.dateCreated desc";

            var giftItems = db.Query<GiftItem>(sql, parameters);

            if (giftItems.Count() > 0) 
                giftTotalByBudgetId.GiftInfo = (List<GiftItem>)giftItems;

            return giftTotalByBudgetId;
        }

        public void RemoveGift(int id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"DELETE
                        FROM Gift
                        WHERE Id = @id";

            db.Execute(sql, new { id = id });

        }
    }
}


