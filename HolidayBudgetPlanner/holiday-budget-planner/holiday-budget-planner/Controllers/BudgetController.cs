﻿using System;
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
    public class BudgetController : ControllerBase
    {
        BudgetRepository _budgetRepo;
        public BudgetController()
        {
            _budgetRepo = new BudgetRepository();
        }

        [HttpGet]
        public IActionResult GetCurrentPlan()
        {
            var currentPlanBudget = _budgetRepo.GetCurrentPlan();

            return Ok(currentPlanBudget);

        }

    }
}
