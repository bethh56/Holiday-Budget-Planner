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
            var itemSql = @"select itemName, price
	                            from ItemCategory
	                            join Budget on
	                            budgetId = Budget.id
								where currentPlan = 1 AND userId = @userId
                                GROUP BY itemName, price";

            var parameters = new { userId };

            var item = db.Query<Item>(itemSql, parameters);

            var categorySql = @"select categoryName, budgetId, userId, ItemCategory.Id, SUM(price) AS TotalPrice
                        from ItemCategory
	                    join Budget on
	                    Budget.id = budgetId
	                    where Budget.currentPlan = 1 AND userId = @userId
                        GROUP BY categoryName, budgetId, userId, ItemCategory.Id";


            var categoryInfo = db.QueryFirstOrDefault<ItemCategory>(categorySql, parameters);
            categoryInfo.LineItems = (List<Item>)item;


            return categoryInfo;

        }
        
    }
}
