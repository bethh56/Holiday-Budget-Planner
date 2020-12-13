using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace holiday_budget_planner.Models
{
    public class Gift
    {
        public int Id { get; set; }
        public decimal TotalPrice { get; set; }
        public bool IsActive { get; set; } = true;
        public int BudgetId { get; set; }
        public DateTime BudgetDateCreated { get; set; }
        public List<GiftItem> GiftInfo { get; set; } = new List<GiftItem>();
    }
}
