using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace holiday_budget_planner.Models
{
    public class GiftItem
    {   
        public int id { get; set; }
        public string Recepient { get; set; }
        public string Item { get; set; }
        public decimal Price { get; set; }
    }
}
