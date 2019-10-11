using System;
using System.Collections.Generic;
using System.Text;

namespace DLMT.Common.DTO
{
    public class DlmtCaseSummaryDTO
    {
        public int AgencyId { get; set; }
        public string CaseNumber { get; set; }
        public int ZoneAreaId { get; set; }
        public int PlanningOfficeId { get; set; }
        public int CaseTypeId { get; set; }

    }
}
