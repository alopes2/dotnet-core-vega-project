using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Vega.Core.Models
{
    public class Make
    {
        public Make()
        {
            Models = new Collection<Model>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Model> Models { get; set; }
    }
}