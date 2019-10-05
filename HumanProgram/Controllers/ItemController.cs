using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HumanProgram.Models;
using HumanProgram.Models.DTO;
using HumanProgram.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace HumanProgram.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : Controller
    {
        private readonly HumanProgramContext _context;

        public ItemController(HumanProgramContext context)
        {
            _context = context;

            if (_context.CatalogItems.Count() == 0)
            {
                _context.CatalogItems.Add(new CatalogItem {
                    ItemName = "S1",
                    ItemType = "T1"
                });
                _context.CatalogItems.Add(new CatalogItem
                {
                    ItemName = "S2",
                    ItemType = "T1"
                });
                _context.CatalogItems.Add(new CatalogItem
                {
                    ItemName = "S3",
                    ItemType = "T2"
                });
                _context.CatalogItems.Add(new CatalogItem
                {
                    ItemName = "S4",
                    ItemType = "T2"
                });
                _context.CatalogItems.Add(new CatalogItem
                {
                    ItemName = "S5",
                    ItemType = "T3"
                });
                _context.CatalogItems.Add(new CatalogItem
                {
                    ItemName = "S6",
                    ItemType = "T3"
                });
                _context.CatalogItems.Add(new CatalogItem
                {
                    ItemName = "S7",
                    ItemType = "T3"
                });
                _context.CatalogItems.Add(new CatalogItem
                {
                    ItemName = "S8",
                    ItemType = "T4"
                });
                _context.SaveChanges();
            }

        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CatalogItem>>> GetCatalogItems(int? first, int? amount)
        {
            if(first==null && amount == null)
                return await _context.CatalogItems.ToListAsync();
            int skip = first ?? 0;
            int take = amount ?? (_context.CatalogItems.Count() - skip);

            return (await _context.CatalogItems.ToArrayAsync()).Skip(skip).
                Take(take).ToArray(); ;
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CatalogItem>> GetCatalogItem(long id)
        {
            var item = await _context.CatalogItems.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }


        [HttpGet("statistics")]
        public async Task<ActionResult<List<ItemTypeStat>>> GetCatalogItemsStatistics()
        {
            return await _context.CatalogItems.GroupBy(x=>x.ItemType).
                Select(c => new ItemTypeStat{
                    ItemType = c.Key,
                    ItemTypeCount = c.Count()
                }).ToListAsync();
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<ActionResult<CatalogItem>> PostCatalogItem(CatalogItem item)
        {
            _context.CatalogItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCatalogItem), new { Id = item.Id}, item);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCatalogItem(long id, CatalogItem item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCatalogItem(long id)
        {
            var todoItem = await _context.CatalogItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            _context.CatalogItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
