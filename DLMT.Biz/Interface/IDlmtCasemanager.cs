using DLMT.Common.Request.DlmtCase;
using DLMT.Common.Response;
using DLMT.Common.Response.DlmtCase;
using System.Threading.Tasks;

namespace DLMT.Biz.Interface
{
    public interface IDlmtCasemanager
    {
        Task<DlmtCaseGetAllResponse> GetAllAsync(DlmtCaseGetAllRequest req);
        Task<DetailsFormLookupResponse> GetCaseDetailsFormLookupAsync();
        Task<DlmtNewCaseFormLookupResponse> GetNewCaseFormLookupAsync();
        Task<DlmtCaseSummaryUpdateResponse> UpdateDlmtCaseSummaryAsync(DlmtCaseSummaryUpdateRequest req);
        Task<DlmtDetailsFormDataResponse> GetCaseDetailFormDataAsync(DlmtDetailsFormDataRequest req);
        Task<DlmtDetailsPersonnelDataResponse> GetAllPersonnelFormData(DlmtDetailsPersonnelDataRequest req);
    }
}
