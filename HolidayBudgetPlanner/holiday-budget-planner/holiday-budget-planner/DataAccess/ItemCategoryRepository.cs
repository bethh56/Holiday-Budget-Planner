using System.Linq;
using System.Threading.Tasks;
using holiday_budget_planner.Models;
using Microsoft.Data.SqlClient;
using Dapper;
using System.Collections.Generic;

namespace holiday_budget_planner.DataAccess
{
    public class ItemCategoryRepository
    {
        static List<ItemCategory> ItemCategory = new List<ItemCategory>();

        const string _connectionString = "Server=localhost;Database=HolidayBudgetPlanner;Trusted_Connection=True";

        public ItemCategory GetAllCurrentItemCategoriesByUserId(int userId)
        {
            using var db = new SqlConnection(_connectionString);
            var parameters = new { userId };

            var categorySql = @"select Ic.categoryName, Ic.budgetId, B.userId, SUM(price) AS TotalPrice
                                from ItemCategory Ic
                                join Budget B on
                                B.id = Ic.budgetId
                                where B.userId = @userId
                                GROUP BY Ic.categoryName, Ic.budgetId, B.userId";


            var categoryInfo = db.QueryFirstOrDefault<ItemCategory>(categorySql, parameters);
            var itemSql = @"select Ic.itemName, Ic.price, Ic.id
	                            from ItemCategory Ic
	                            join Budget B on
	                            Ic.budgetId = B.id
								where B.userId = @userId
                                GROUP BY Ic.itemName, Ic.price, Ic.id";

            var item = db.Query<Item>(itemSql, parameters);


           if (item.Count() > 0)
                categoryInfo.LineItems = (List<Item>)item;

            return categoryInfo;
        }

        public void RemoveItem(int id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"DELETE
                        FROM ItemCategory
                        WHERE Id = @id";

            db.Execute(sql, new { id = id });

        }

    }
}
