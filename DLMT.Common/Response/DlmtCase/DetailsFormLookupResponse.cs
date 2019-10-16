using DLMT.Common.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace DLMT.Common.Response.DlmtCase
{
    public class DetailsFormLookupResponse : BaseResponse
    {
        public IList<CaseTypeDTO> CaseTypes { get; set; }
        public IList<ZoneAreaDTO> ZoneAreas { get; set; }
        public IList<AgencyDTO> Agencies { get; set; }
        public IList<PlanningOfficeDTO> PlanningOffices { get; set; }
    }
}
