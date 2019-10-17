using System;
using System.Collections.Generic;
using System.Text;

namespace DLMT.Common.DTO
{
    public class ContactDTO : BaseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ContactName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Phone { get; set; }
        public string ContactType { get; set; }
        public string DisplayName { get; set; }
    }
}
