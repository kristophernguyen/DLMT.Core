using System;

namespace DLMT.Common.DTO
{
    public class BaseDTO
    {
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public int StatusId { get; set; }
    }
}
