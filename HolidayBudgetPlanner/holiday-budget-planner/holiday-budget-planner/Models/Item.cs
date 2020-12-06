using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace holiday_budget_planner.Models
{
    public class Item
    {
        public int id { get; set; }
        public string ItemName { get; set; }
        public decimal Price { get; set; }
        public bool IsActive { get; set; } = true;
        public int BudgetId { get; set; }
        public int userId { get; set; }
    }
}
