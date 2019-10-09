using DLMT.Common.Request;
using DLMT.Common.Response;
using System.Threading.Tasks;

namespace DLMT.Biz.Interface
{
    public interface ICaseTypeManager
    {
        Task<CaseTypeGetAllResponse> GetAllAsync(CaseTypeGetAllRequest req);
        Task<CaseTypeDeleteByIdResponse> DeleteCaseTypeByIdAsync(CaseTypeDeleteByIdRequest req);
        Task<CaseTypeGetByIdResponse> GetCaseTypeByIdAsync(CaseTypeGetByIdRequest req);
        Task<CaseTypeUpdateResponse> UpdateCaseTypeAsync(CaseTypeUpdateRequest req);
    }
}
