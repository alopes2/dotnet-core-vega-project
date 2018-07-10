using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Vega.Core.Models
{
    public class Feature
    {
        public Feature()
        {
            Vehicles = new Collection<VehicleFeature>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<VehicleFeature> Vehicles { get; set; }
    }
}