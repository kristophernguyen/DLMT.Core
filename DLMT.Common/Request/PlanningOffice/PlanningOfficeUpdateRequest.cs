using DLMT.Common.DTO;

namespace DLMT.Common.Request.PlanningOffice
{
    public class PlanningOfficeUpdateRequest : BaseRequest
    {
        public PlanningOfficeDTO PlanningOffice { get; set; }
    }
}
