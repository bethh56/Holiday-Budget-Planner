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
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UsersRepository _userRepo;
        public UsersController()
        {
            _userRepo = new UsersRepository();
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = _userRepo.GetAllUsers();

            return Ok(allUsers);

        }

        [HttpPut]
        public IActionResult AddUser(Users user)
        {
            _userRepo.AddUser(user);
            return Created($"/api/users/{user.Id}", user);
        }
    }
}
