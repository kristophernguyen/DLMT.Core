using DLMT.Common.Request;
using DLMT.Common.Response;
using System.Threading.Tasks;

namespace DLMT.Biz.Interface
{
    public interface ICaseTypeManager
    {
        Task<CaseTypeGetAllResponse> GetAllAsync(CaseTypeGetAllRequest req);
    }
}
