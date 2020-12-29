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
            
            var parameters = new { userId };
            var getNewestBudgetSql = @"select TOP 1 B.DateCreated, B.id, B.userId
                                      from Budget B
                                      where B.userId = @userId AND B.id IS NOT null
                                      ORDER BY B.dateCreated desc";

            var newestBudget = db.QueryFirstOrDefault<Budget>(getNewestBudgetSql, parameters);



            var categoryDynamicParameters = new DynamicParameters();
            categoryDynamicParameters.Add("id", newestBudget.Id);
            categoryDynamicParameters.Add("userId", newestBudget.UserId);

            var categorySql = @"select Ic.categoryName, Ic.budgetId, B.userId, B.dateCreated, Ic.id, SUM(price) AS TotalPrice
                                from ItemCategory Ic
                                join Budget B on
                                B.id = Ic.budgetId
                                where B.userId = @userId AND B.Id = @id
                                GROUP BY Ic.categoryName, Ic.budgetId, B.userId, Ic.id, B.dateCreated
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

        public void RemoveItem(int id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"DELETE
                        FROM ItemCategory
                        WHERE Id = @id";

            db.Execute(sql, new { id = id });

        }

        public void AddNewItemCategory(ItemCategory itemCategoryAdded)
        {
            var sql = @"INSERT INTO [dbo].[ItemCategory]
                        ([categoryName]
                        ,[budgetId])
                       Output inserted.Id
                        VALUES
                             (@categoryName,  @budgetId)";
            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, itemCategoryAdded);

            itemCategoryAdded.Id = newId;
        }

        /*   public void AddNewItem(Item itemAdded)
           {
               var sql = @"INSERT INTO [dbo].[ItemCategory]
                           ([itemName]
                           ,[categoryName]
                           ,[id]
                           ,[budgetId]
                           ,[price])
                           VALUES
                                (@itemName,  @price, @id)";
               using var db = new SqlConnection(_connectionString);

               var newId = db.Execute(sql, itemAdded);
           }*/

        public IEnumerable<ItemCategory> GetAllCategories()
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select categoryName 
                        from ItemCategory
                        GROUP BY categoryName";

            var allCategories = db.Query<ItemCategory>(sql);

            return allCategories;

        }

    }
}
