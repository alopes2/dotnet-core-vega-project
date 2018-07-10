using System.Collections.Generic;
using System.Threading.Tasks;
using Vega.Core.Models;

namespace Vega.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        Task<Vehicle> GetVehicleWithMake(int id);
        Task<Vehicle> GetVehicleWithFeature(int id);
        Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery vehicleQuery);
        Task Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);
    }
}