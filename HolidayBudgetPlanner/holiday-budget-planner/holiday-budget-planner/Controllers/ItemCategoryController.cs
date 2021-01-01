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

       /* [HttpGet("lineItems")]
        public IActionResult GetItemsByBudgetId()
        {
            var items = _itemCategoryRepo.GetItemsByBudgetId();

            return Ok(items);

        }*/

        [HttpGet("category")]
        public IActionResult GetAllCategories()
        {
            var allItemCategories = _itemCategoryRepo.GetAllCategories();

            return Ok(allItemCategories);

        }


        [HttpDelete("removeItem/{id}")]
        public IActionResult RemoveItem(int id)
        {
            _itemCategoryRepo.RemoveItem(id);

            return Ok();
        }

        [HttpPost]
        public IActionResult AddNewItemInfo(ItemCategory newItemCategory)
        {
            _itemCategoryRepo.AddNewItemInfo(newItemCategory);

            return Created($"/api/itemCategory/{newItemCategory.Id}", newItemCategory);

        }

    }
}
