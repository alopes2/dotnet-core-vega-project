using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Vega.Core.Models;

namespace Vega.Persistence.Configurations
{
    public class VehicleConfiguration: IEntityTypeConfiguration<Vehicle>
    {
        public void Configure(EntityTypeBuilder<Vehicle> builder)
        {
            builder
                .OwnsOne(v => v.Contact,
                    con =>
                        {
                            con.Property(c => c.Name)
                                .HasColumnName("ContactName")
                                .IsRequired()
                                .HasMaxLength(255);

                            con.Property(c => c.Email)
                                .HasColumnName("ContactEmail")
                                .HasMaxLength(255);

                            con.Property(c => c.Phone)
                                .HasColumnName("ContactPhone")
                                .IsRequired()
                                .HasMaxLength(255);
                        });
            

	    }
    }
}