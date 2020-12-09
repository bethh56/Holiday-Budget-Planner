using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using holiday_budget_planner.DataAccess;
using holiday_budget_planner.Models;
using Microsoft.AspNetCore.Authorization;

namespace holiday_budget_planner.Controllers
{
    [Route("api/budget")]
    [ApiController]
    [Authorize]
    public class BudgetController : ControllerBase
    {
        BudgetRepository _budgetRepo;
        public BudgetController()
        {
            _budgetRepo = new BudgetRepository();
        }

        [HttpGet]
        public IActionResult GetAllBudgets()
        {
            var allBudget = _budgetRepo.GetAllBudgets();

            return Ok(allBudget);

        }

        [HttpGet("currentPlan/user{userId}")]
        [AllowAnonymous]
        public IActionResult GetCurrentBudgetByUserId(int userId)
        {
            var currentBudget = _budgetRepo.GetCurrentBudget(userId);

            return Ok(currentBudget);

        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult AddNewBudget(Budget newBudget)
        {
            _budgetRepo.AddNewBudget(newBudget);

            return Created($"/api/budget/{newBudget.Id}", newBudget);

        }

    }
}
