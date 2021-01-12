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


        const string _connectionString = "Data Source=tcp:holidaybudgetplanner.database.windows.net,1433;Initial Catalog=HolidayBudgetPlanner;User Id=bethh_56@holidaybudgetplanner;Password=S@ndydog56";
        public IEnumerable<ItemCategory> GetAllCurrentItemCategoriesByUserId(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var parameters = new { userId };
            var getNewestBudgetSql = @"select TOP 1 B.DateCreated, B.id, B.userId
                                      from Budget B
                                      where B.userId = @userId AND B.id IS NOT null
                                      ORDER BY B.dateCreated desc";

            var newestBudget = db.QueryFirstOrDefault<Budget>(getNewestBudgetSql, parameters);



            var categoryDynamicParameters = new DynamicParameters();
            categoryDynamicParameters.Add("id", newestBudget.Id);
            categoryDynamicParameters.Add("userId", newestBudget.UserId);

            var categorySql = @"select Ic.categoryName, Ic.budgetId, B.userId, B.dateCreated, SUM(price) AS TotalPrice
                                from ItemCategory Ic
                                join Budget B on
                                B.id = Ic.budgetId
                                where B.userId = @userId AND B.Id = @id
                                GROUP BY Ic.categoryName, Ic.budgetId, B.userId, B.dateCreated
                                ORDER BY B.dateCreated desc";

            var categoryInfo = db.Query<ItemCategory>(categorySql, categoryDynamicParameters);

            foreach (var ic in categoryInfo)
            {
                var categoryName = ic.CategoryName;
                var budgetId = ic.BudgetId;
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("categoryName", categoryName);
                dynamicParameters.Add("userid", userId);
                dynamicParameters.Add("budgetId", budgetId);

                var itemSql = @"select Ic.itemName, Ic.price, Ic.categoryName, Ic.Id
	                            from ItemCategory Ic
	                            join Budget B on
	                            Ic.budgetId = B.id
								where Ic.categoryName = @categoryName AND B.userId = @userId AND B.Id = @budgetId
                                GROUP BY Ic.itemName, Ic.price, Ic.categoryName, Ic.Id";

                var item = db.Query<Item>(itemSql, dynamicParameters);

                foreach (var itemName in item)
                {
                    if (itemName.ItemName != null)
                    {
                        if (item.Count() > 0)
                            ic.LineItems = (List<Item>)item;
                    }
                }

            }

            return categoryInfo;

        }

        public IEnumerable<ItemCategory> GetAllCurrentItemCategoriesByBudgetId(int budgetId){
            using var db = new SqlConnection(_connectionString);
            var sql = @"select Ic.categoryName, Ic.budgetId, B.userId, SUM(price) AS TotalPrice
                                from ItemCategory Ic
                                join Budget B on
                                B.id = Ic.budgetId
                                where B.Id = @budgetId
                                GROUP BY Ic.categoryName, Ic.budgetId, B.userId";

            var parameters = new { budgetId };

            var categoryInfo = db.Query<ItemCategory>(sql, parameters);

            foreach (var ic in categoryInfo)
            {
                var categoryName = ic.CategoryName;
                var budget = ic.BudgetId;
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("categoryName", categoryName);
                dynamicParameters.Add("budgetId", budget);

                var itemSql = @"select Ic.itemName, Ic.price, Ic.categoryName, Ic.Id
	                            from ItemCategory Ic
	                            join Budget B on
	                            Ic.budgetId = B.id
								where Ic.categoryName = @categoryName AND B.Id = @budgetId
                                GROUP BY Ic.itemName, Ic.price, Ic.categoryName, Ic.Id";

                var item = db.Query<Item>(itemSql, dynamicParameters);

                if (item.Count() > 0)
                    ic.LineItems = (List<Item>)item;

            }

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

        public void AddNewItemInfo(ItemCategory itemCategoryAdded)
        {
            var sql = @"INSERT INTO [dbo].[ItemCategory]
                        ([categoryName]
                        ,[budgetId]
                        ,[itemName]
                        ,[price])
                       Output inserted.Id
                        VALUES
                             (@categoryName,  @budgetId, @itemName, @price)";
            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, itemCategoryAdded);

            itemCategoryAdded.Id = newId;
        }

        public IEnumerable<ItemCategory> GetAllCategories()
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select categoryName 
                        from ItemCategory
                        GROUP BY categoryName";

            var allCategories = db.Query<ItemCategory>(sql);

            return allCategories;

        }

        public IEnumerable<ItemCategory> GetItemTotalPrice (int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var parameters = new { userId };
            var getNewestBudgetSql = @"select TOP 1 B.DateCreated, B.id, B.userId
                                      from Budget B
                                      where B.userId = @userId AND B.id IS NOT null
                                      ORDER BY B.dateCreated desc";

            var newestBudget = db.QueryFirstOrDefault<Budget>(getNewestBudgetSql, parameters);



            var categoryDynamicParameters = new DynamicParameters();
            categoryDynamicParameters.Add("id", newestBudget.Id);

            var categorySql = @"select SUM(price) AS TotalPrice, B.id AS budgetId, B.userId, b.dateCreated
                                    from ItemCategory Ic
                                    join Budget B on
                                    B.id = Ic.budgetId
                                    where B.Id = @id
                                    GROUP BY B.id, B.userId, b.dateCreated";

            var categoryInfo = db.Query<ItemCategory>(categorySql, categoryDynamicParameters);

            return categoryInfo;
        }

        public ItemCategory ItemTotalPriceByBudgetId(int budgetId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select SUM(price) AS TotalPrice
                        from ItemCategory Ic
                        join Budget B on
                        B.id = Ic.budgetId
                        where B.Id = @budgetId";

            var parameters = new { budgetId };

            var price = db.QueryFirstOrDefault<ItemCategory>(sql, parameters);

            return price;
        }

    }
}
