using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace holiday_budget_planner.Models
{
    public class Budget
    {
        public int Id { get; set; }
        public string HolidayName { get; set; }
        public int HolidayId { get; set; }
        public decimal BudgetAmount { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsActive { get; set; } = true;
        public int UserId { get; set; }
    }
}
