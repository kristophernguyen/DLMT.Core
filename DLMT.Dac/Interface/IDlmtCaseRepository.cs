using DLMT.Common.DTO;
using DLMT.Common.Request.DlmtCase;
using DLMT.Common.Response.DlmtCase;
using System.Threading.Tasks;

namespace DLMT.Dac.Interface
{
    public interface IDlmtCaseRepository
    {
        Task<DlmtCaseGetAllResponse> GetAllAsync(DlmtCaseGetAllRequest req);
        Task<DlmtCaseDeleteByIdResponse> DeleteDlmtCaseByIdAsync(DlmtCaseDeleteByIdRequest req);
        Task<DlmtCaseGetByIdResponse> GetDlmtCaseByIdAsync(DlmtCaseGetByIdRequest req);
        Task<DlmtCaseUpdateResponse> UpdateDlmtCaseAsync(DlmtCaseUpdateRequest req);
        Task<DlmtCaseSummaryUpdateResponse> UpdateDlmtCaseSummaryAsync(DlmtCaseSummaryUpdateRequest req);
        Task<CaseSearchDTO> GetCaseSummaryByCaseNumberAsync(string caseNumber);
        Task<DlmtDetailsFormDataResponse> GetCaseDetailFormDataAsync(DlmtDetailsFormDataRequest req);
    }
}
