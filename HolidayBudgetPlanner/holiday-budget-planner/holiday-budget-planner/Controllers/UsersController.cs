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
    [Authorize]
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

        [HttpGet("{userId}")]
        public IActionResult GetUserById(int userId)
        {
            var singleUser = _userRepo.GetUserById(userId);

            return Ok(singleUser);

        }

        [HttpGet("uid/{uid}")]
        public IActionResult GetUserIdByUid(string uid)
        {
            var selectedUserId = _userRepo.GetUserIdByUid(uid);
            if (selectedUserId == 0) return NotFound("We did not find a user with this UID. Please try again.");
            return Ok(selectedUserId);
        }

        [HttpPost]
        public IActionResult AddUser(Users newUser)
        {
            _userRepo.Add(newUser);

            return Created($"/api/users/{newUser.Id}", newUser);

        }
    }
}
