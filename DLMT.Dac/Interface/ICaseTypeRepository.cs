using DLMT.Common.Request;
using DLMT.Common.Response;
using System.Threading.Tasks;

namespace DLMT.Dac.Interface
{
    public interface ICaseTypeRepository
    {
        Task<CaseTypeGetAllResponse> GetAllAsync(CaseTypeGetAllRequest req);
    }
}
