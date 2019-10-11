using DLMT.Common.DTO;
using DLMT.Common.Request.DlmtCase;
using DLMT.Common.Response.DlmtCase;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DLMT.Dac.Interface
{
    public interface IDlmtCaseRepository
    {
        Task<DlmtCaseGetAllResponse> GetAllAsync(DlmtCaseGetAllRequest req);
        Task<DlmtCaseDeleteByIdResponse> DeleteDlmtCaseByIdAsync(DlmtCaseDeleteByIdRequest req);
        Task<DlmtCaseGetByIdResponse> GetDlmtCaseByIdAsync(DlmtCaseGetByIdRequest req);
        Task<DlmtCaseUpdateResponse> UpdateDlmtCaseAsync(DlmtCaseUpdateRequest req);
        Task<CaseSearchDTO> GetDlmtCaseByDlmtCaseNameAsync(string DlmtCaseName);
    }
}
