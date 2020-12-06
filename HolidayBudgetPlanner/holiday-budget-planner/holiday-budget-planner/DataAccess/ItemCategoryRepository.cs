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

        public ItemCategory GetAllCurrentItemCategoriesByUserId(int userId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select categoryName, itemName, price, budgetId, userId
                        from ItemCategory
	                    join Budget on
	                    Budget.id = budgetId
	                    where Budget.currentPlan = 1
                        GROUP BY categoryName, itemName, price, budgetId, @userId";

            var parameters = new { userId };

            var itemCategory = db.QueryFirstOrDefault<ItemCategory>(sql, parameters);

            return itemCategory;

        }
        
    }
}
