using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace holiday_budget_planner.Models
{
    public class Item
    {
        public int Id { get; set; }
        public int budgetId { get; set; }
        public string ItemName { get; set; }
        public decimal Price { get; set; }
        public string CategoryName { get; set; }

    }
}
