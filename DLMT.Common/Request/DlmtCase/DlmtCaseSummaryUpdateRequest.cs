using DLMT.Common.DTO;

namespace DLMT.Common.Request.DlmtCase
{
    public class DlmtCaseSummaryUpdateRequest : BaseRequest
    {
        public DlmtCaseSummaryDTO CaseSummary { get; set; }
    }
}
