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

        [HttpGet("user{userId}")]
        public IActionResult GetAllBudgetsByUserId(int userId)
        {
            var allBudget = _budgetRepo.GetAllBudgetsByUserId(userId);

            return Ok(allBudget);

        }

        [HttpGet("budgetId{budgetId}")]
        public IActionResult GetSingleBudgetByBudgetId(int budgetId)
        {
            var singleBudget = _budgetRepo.GetSingleBudgetByBudgetId(budgetId);

            return Ok(singleBudget);

        }

        [HttpGet("currentPlan/user{userId}")]
        public IActionResult GetCurrentBudgetByUserId(int userId)
        {
            var currentBudget = _budgetRepo.GetCurrentBudget(userId);

            return Ok(currentBudget);

        }

        [HttpPost]
        public IActionResult AddNewBudget(Budget newBudget)
        {
            _budgetRepo.AddNewBudget(newBudget);

            return Created($"/api/budget/{newBudget.Id}", newBudget);

        }

        [HttpDelete("removeBudget/{id}")]
        public IActionResult RemoveBudget(int id)
        {
            _budgetRepo.RemoveBudget(id);

            return Ok();
        }

    }
}
