using DLMT.Common.DTO;
using System.Collections.Generic;

namespace DLMT.Common.Response
{
    public class DlmtNewCaseFormLookupResponse : BaseResponse
    {
        public IList<CaseTypeDTO> CaseTypes { get; set; }
        public IList<ZoneAreaDTO> ZoneAreas { get; set; }
        public IList<AgencyDTO> Agencies { get; set; }
        public IList<PlanningOfficeDTO> PlanningOffices { get; set; }
    }
}
