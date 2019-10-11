using System;
using System.Collections.Generic;
using System.Text;

namespace DLMT.Common.DTO
{
    public class CaseSearchDTO : BaseDTO
    {
        public int CaseId { get; set; }
        public string CaseNumber { get; set; }
        public string CaseType { get; set; }
        public string PlanningOffice { get; set; }
        public string Area { get; set; }
        public string Agency { get; set; }
    }
}
