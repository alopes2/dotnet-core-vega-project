using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Vega.Core.Models;

namespace Vega.Persistence.Configurations
{
    public class MakeConfiguration : IEntityTypeConfiguration<Make>
    {
        public void Configure(EntityTypeBuilder<Make> builder)
        {
		    builder.Property(m => m.Name)
                .IsRequired()
                .HasMaxLength(255);
	    }
    }   
}