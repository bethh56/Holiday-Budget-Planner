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

        [HttpGet("budgetId{budgetId}")]
        public IActionResult GetAllCurrentItemCategoriesByBudgetId(int budgetId)
        {
            var allItemCategories = _itemCategoryRepo.GetAllCurrentItemCategoriesByBudgetId(budgetId);

            return Ok(allItemCategories);

        }

        [HttpGet("itemTotalPrice{userId}")]
        public IActionResult GetItemTotalPrice(int userId)
        {
            var totalPrice = _itemCategoryRepo.GetItemTotalPrice(userId);

            return Ok(totalPrice);

        }

        [HttpGet("budgetIdForTotalPrice/budgetId/{budgetId}")]
        public IActionResult ItemTotalPriceByBudgetId(int budgetId)
        {
            var totalPrice = _itemCategoryRepo.ItemTotalPriceByBudgetId(budgetId);

            return Ok(totalPrice);

        }


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
