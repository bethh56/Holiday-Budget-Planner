﻿using System.Linq;
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

            var categorySql = @"select TOP 1 Ic.categoryName, Ic.budgetId, B.userId, B.dateCreated, SUM(price) AS TotalPrice
                                from ItemCategory Ic
                                join Budget B on
                                B.id = Ic.budgetId
                                where B.userId = @userId
                                GROUP BY Ic.categoryName, Ic.budgetId, B.userId, B.dateCreated
                                ORDER BY B.dateCreated desc";

            var categoryInfo = db.Query<ItemCategory>(categorySql, parameters);

            foreach (var ic in categoryInfo)
            {
                var categoryName = ic.CategoryName;
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("categoryName", categoryName);
                dynamicParameters.Add("userid", userId);

                var itemSql = @"select Ic.itemName, Ic.price, Ic.id, B.userId
	                            from ItemCategory Ic
	                            join Budget B on
	                            Ic.budgetId = B.id
								where Ic.categoryName = @categoryName AND B.userId = @userId
                                GROUP BY Ic.itemName, Ic.price, Ic.id, B.userId";

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

    }
}
