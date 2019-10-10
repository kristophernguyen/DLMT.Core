using DLMT.Common.DTO;
using System.Collections.Generic;

namespace DLMT.Common.Response.PlanningOffice
{
    public class PlanningOfficeGetAllResponse : BaseResponse
    {
        public PlanningOfficeGetAllResponse()
        {
            Result = new List<PlanningOfficeDTO>();
        }
        public IList<PlanningOfficeDTO> Result { get; set; }
        public int Total { get; set; }
    }
}
