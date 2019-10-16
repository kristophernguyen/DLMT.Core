using DLMT.Common.Request.Developer;
using DLMT.Common.Response.Developer;
using System.Threading.Tasks;

namespace DLMT.Dac.Interface
{
    public interface IDeveloperRepository
    {
        Task<DeveloperByPhaseResponse> GetAllDeveloperByPhaseAsync(DeveloperByPhaseRequest req);
    }
}
