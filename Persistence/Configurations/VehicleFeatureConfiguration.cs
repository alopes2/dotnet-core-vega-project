using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Vega.Core.Models;

namespace Vega.Persistence.Configurations
{
    public class VehicleFeatureConfiguration : IEntityTypeConfiguration<VehicleFeature>
    {
        public void Configure(EntityTypeBuilder<VehicleFeature> builder) 
        {
            builder
                .HasKey(vf => new { vf.VehicleId, vf.FeatureId });
            
            builder
                .ToTable("VehicleFeatures");
        }
    }
}