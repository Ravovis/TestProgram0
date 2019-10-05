using HumanProgram.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanProgram.Models
{
    public class HumanProgramContext: DbContext
    {
        public HumanProgramContext(DbContextOptions<HumanProgramContext> options)
           : base(options)
        {

        }

        public DbSet<CatalogItem> CatalogItems { get; set; }
    }
}
