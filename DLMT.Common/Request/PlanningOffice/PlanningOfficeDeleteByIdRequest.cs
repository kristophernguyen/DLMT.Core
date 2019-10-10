using System;

namespace DLMT.Common.Request.PlanningOffice
{
    public class PlanningOfficeDeleteByIdRequest : BaseRequest
    {
        public int Id { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
