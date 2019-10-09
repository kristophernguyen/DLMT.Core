using DLMT.Common.DTO;
using DLMT.Common.Request;
using DLMT.Common.Response;
using System.Threading.Tasks;

namespace DLMT.Dac.Interface
{
    public interface ICaseTypeRepository
    {
        Task<CaseTypeGetAllResponse> GetAllAsync(CaseTypeGetAllRequest req);
        Task<CaseTypeDeleteByIdResponse> DeleteCaseTypeByIdAsync(CaseTypeDeleteByIdRequest req);
        Task<CaseTypeGetByIdResponse> GetCaseTypeByIdAsync(CaseTypeGetByIdRequest req);
        Task<CaseTypeUpdateResponse> UpdateCaseTypeAsync(CaseTypeUpdateRequest req);
        Task<CaseTypeDTO> GetCaseTypeByCaseTypeNameAsync(string caseTypeName);
    }
}
