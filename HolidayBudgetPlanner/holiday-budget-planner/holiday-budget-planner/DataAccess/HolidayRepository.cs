using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using holiday_budget_planner.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace holiday_budget_planner.DataAccess
{
    public class HolidayRepository
    {
        static List<Budget> budget = new List<Budget>();


        const string _connectionString = "Server=localhost;Database=HolidayBudgetPlanner;Trusted_Connection=True";
        public IEnumerable<Holiday> GetAllHolidays()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select *
                        from Holiday";

            var holidays = db.Query<Holiday>(sql);

            return holidays;

        }
    }
}
