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
    [Route("api/holiday")]
    [ApiController]
    [Authorize]
    public class HolidayController : ControllerBase
    {
        HolidayRepository _holidayRepo;
        public HolidayController()
        {
            _holidayRepo = new HolidayRepository();
        }

        [HttpGet]
        public IActionResult GetAllHolidays()
        {
            var holiday = _holidayRepo.GetAllHolidays();

            return Ok(holiday);
        }
    }
}
