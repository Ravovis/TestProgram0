using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanProgram.Models.Entities
{
    public class CatalogItem
    {
        public long Id { get; set; }
        public string ItemName { get; set; }
        public string ItemType { get; set; }
    }
}
