using DLMT.Common.DTO;
using System.Collections.Generic;

namespace DLMT.Common.Response.DlmtCase
{
    public class DlmtDetailsFormDataResponse : BaseResponse
    {
        public DlmtDetailsFormDataResponse()
        {
            CasePhases = new List<CasePhaseDTO>();
        }
        public DlmtCaseDetailsDTO MainCase { get; set; }
        public IList<CasePhaseDTO> CasePhases { get; set; }
    }
}
