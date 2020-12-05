using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace holiday_budget_planner.Models
{
    public class Gift
    {
        public int Id { get; set; }
        public string Recepient { get; set; }
        public string Item { get; set; }
        public decimal Price { get; set; }
        public bool IsActive { get; set; } = true;
        public int BudgetId { get; set; }
    }
}
