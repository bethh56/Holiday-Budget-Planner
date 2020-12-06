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

        public IEnumerable<ItemCategory> GetAllCurrentItemCategoriesByUserId(int userId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select categoryName, budgetId, userId
                        from ItemCategory
	                    join Budget on
	                    Budget.id = budgetId
	                    where Budget.currentPlan = 1 AND userId = @userId
                        GROUP BY categoryName, budgetId, userId";

            var parameters = new { userId };

            var itemCategory = db.Query<ItemCategory>(sql, parameters);

            List<Item> itemInCategory = new List<Item>();
      
            if (itemInCategory != null )
            {
                var itemSql = @"select categoryName, budgetId, userId, itemName, price
	                            from ItemCategory
	                            join Budget on
	                            Budget.id = budgetId
	                            where Budget.currentPlan = 1 AND userId = 1
                                GROUP BY categoryName, budgetId, userId, itemName, price";

                var item = db.Query<Item>(itemSql);


            }

            return itemCategory;

        }
        
    }
}
