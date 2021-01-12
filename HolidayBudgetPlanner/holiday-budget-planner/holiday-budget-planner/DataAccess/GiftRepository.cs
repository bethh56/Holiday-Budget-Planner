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
        static List<Gift> Gift = new List<Gift>();

        const string _connectionString = "Server=localhost;Database=HolidayBudgetPlanner;Trusted_Connection=True";

        public Gift GetGift(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var getNewestBudgetSql = @"select TOP 1 B.id, B.dateCreated, B.userId
                                    from Budget B
                                    where userId = @userId
                                    ORDER BY B.dateCreated desc";

            var parameters = new { userId };

            var recentBudget = db.QuerySingleOrDefault<Budget>(getNewestBudgetSql, parameters);

            DynamicParameters gift = new DynamicParameters();
            gift.Add("id", recentBudget.Id);
            gift.Add("userId", recentBudget.UserId);

            var sqlForTotalPrice = @"select G.budgetId, B.dateCreated, SUM(price) as TotalPrice
                                        from Gift G
	                                        join Budget B on 
	                                        B.id = G.budgetId
	                                        where B.userId = @userId AND B.Id = @id
                                        GROUP BY G.budgetId, B.dateCreated
                                        ORDER BY B.dateCreated desc";

            var giftTotalByBudgetId = db.QueryFirstOrDefault<Gift>(sqlForTotalPrice, gift);

            var sql = @"select G.recepient, G.item, G.price, G.id
                                    from Gift G
                                        join Budget B on 
                                        B.id = G.budgetId
                                        where userId = @userId AND B.Id = @id
                                    GROUP BY  G.recepient, G.item, G.price, G.id";

            var giftItems = db.Query<GiftItem>(sql, gift);

            if (giftItems.Count() > 0)
                giftTotalByBudgetId.GiftInfo = giftItems.ToList();

            return giftTotalByBudgetId;

        }

        public Gift GetGiftsByBudgetId(int budgetId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select G.budgetId, B.dateCreated, SUM(price) as TotalPrice
                        from Gift G
	                        join Budget B on 
	                        B.id = G.budgetId
	                        where  B.Id = @budgetId
                        GROUP BY G.budgetId, B.dateCreated";

            var parameters = new { budgetId };

            var giftsByBudgetId = db.QueryFirstOrDefault<Gift>(sql, parameters);

            var sqlForGifts = @"select G.recepient, G.item, G.price, G.id
                                    from Gift G
                                        join Budget B on 
                                        B.id = G.budgetId
                                        where B.Id = @budgetId
                                    GROUP BY  G.recepient, G.item, G.price, G.id";

            var giftItems = db.Query<GiftItem>(sqlForGifts, parameters);

            if (giftItems.Count() > 0)
                giftsByBudgetId.GiftInfo = giftItems.ToList();

            return giftsByBudgetId;
        }

        public void RemoveGift(int id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"DELETE
                        FROM Gift
                        WHERE Id = @id";

            db.Execute(sql, new { id = id });

        }

        public void AddNewGIft(GiftItem giftAdded)
        {
            var sql = @"INSERT INTO [dbo].[Gift]
                        ([Recepient]
                        ,[Item]
                        ,[Price]
                        ,[BudgetId])
                       VALUES
                         (@recepient, @item, @price, @budgetId)";
            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, giftAdded);

            giftAdded.id = newId;
        }
    }
}


