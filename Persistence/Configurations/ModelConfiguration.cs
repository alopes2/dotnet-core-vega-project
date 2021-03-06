using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Vega.Core.Models;

namespace Vega.Persistence.Configurations
{
    public class ModelConfiguration : IEntityTypeConfiguration<Model>
    {
        public void Configure(EntityTypeBuilder<Model> builder)
        {
		    builder.Property(m => m.Name)
                .IsRequired()
                .HasMaxLength(255);

            builder.ToTable("Models");
	    }
    }   
}