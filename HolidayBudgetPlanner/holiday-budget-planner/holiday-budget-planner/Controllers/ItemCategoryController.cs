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
    [Route("api/ItemCategory")]
    [ApiController]
    public class ItemCategoryController : ControllerBase
    {
        ItemCategoryRepository _itemCategoryRepo;
        public ItemCategoryController()
        {
            _itemCategoryRepo = new ItemCategoryRepository();
        }

        [HttpGet("user{userId}")]
        public IActionResult GetAllCurrentItemCategoriesByUserId(int userId)
        {
            var allItemCategories = _itemCategoryRepo.GetAllCurrentItemCategoriesByUserId(userId);

                return Ok(allItemCategories);

        }


        [HttpDelete("removeItem/{id}")]
        public IActionResult RemoveItem(int id)
        {
            _itemCategoryRepo.RemoveItem(id);

            return Ok();
        }

        [HttpPost]
        public IActionResult AddNewItemCategory(ItemCategory newItemCategory)
        {
            _itemCategoryRepo.AddNewItemCategory(newItemCategory);

            return Created($"/api/itemCategory/{newItemCategory.Id}", newItemCategory);

        }
/*
        [HttpPost]
        public IActionResult AddNewItem(Item newItem)
        {
            _itemCategoryRepo.AddNewItem(newItem);

            return Created($"/api/itemCategory/newItem/{newItem.Id}", newItem);

        }*/

    }
}
