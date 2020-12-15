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
    [Route("api/gift")]
    [ApiController]
    // [Authorize]
    public class GiftController : ControllerBase
    {
        GiftRepository _giftRepo;
        public GiftController()
        {
            _giftRepo = new GiftRepository();
        }

        [HttpGet("currentPlanGifts/user{userId}")]
        //[AllowAnonymous]
        public IActionResult GetGifts(int userId)
        {
            var gifts = _giftRepo.GetGift(userId);

            return Ok(gifts);
        }

        [HttpDelete("removeGift/{id}")]
        public IActionResult RemoveGift(int id)
        {
            _giftRepo.RemoveGift(id);

            return Ok();
        }

        [HttpPost]
        public IActionResult AddNewGIft(Gift newGift)
        {
            _giftRepo.AddNewGIft(newGift);

            return Created($"/api/gift/{newGift.Id}", newGift);

        }

    }
}
