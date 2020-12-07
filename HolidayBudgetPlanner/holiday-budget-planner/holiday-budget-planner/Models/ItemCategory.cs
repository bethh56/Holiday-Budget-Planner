using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace holiday_budget_planner.Models
{
    public class ItemCategory
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public bool IsActive { get; set; } = true;
        public int BudgetId { get; set; }
        public int userId { get; set; }
        public decimal TotalPrice { get; set; }
        public List<Item> LineItems { get; set; } = new List<Item>();
    }
}
