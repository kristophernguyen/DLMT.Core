using DLMT.Common.Request.Developer;
using DLMT.Common.Response.Developer;
using System.Threading.Tasks;

namespace DLMT.Biz.Interface
{
    public interface IDeveloperManager
    {
        Task<DeveloperByPhaseResponse> GetAllDeveloperByPhaseAsync(DeveloperByPhaseRequest req);
    }
}
