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

            var itemCategory = db.Query<Item>(itemSql, parameters);

            var sql = @"select categoryName, budgetId, userId, ItemCategory.Id
                        from ItemCategory
	                    join Budget on
	                    Budget.id = budgetId
	                    where Budget.currentPlan = 1 AND userId = @userId
                        GROUP BY categoryName, budgetId, userId, ItemCategory.Id";


            var budgetLineItems = db.QueryFirstOrDefault<ItemCategory>(sql, parameters);
                budgetLineItems.LineItems = (List<Item>)itemCategory;


            return budgetLineItems;

        }
        
    }
}
