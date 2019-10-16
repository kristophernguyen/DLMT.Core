using DLMT.Biz.Interface;
using DLMT.Common.Request.Developer;
using DLMT.Common.Response.Developer;
using DLMT.Dac.Interface;
using System.Threading.Tasks;

namespace DLMT.Biz.Implementation
{
    public class DeveloperManager : IDeveloperManager
    {
        private readonly IDeveloperRepository _repos;
        public DeveloperManager(IDeveloperRepository repos)
        {
            _repos = repos;
        }
        public async Task<DeveloperByPhaseResponse> GetAllDeveloperByPhaseAsync(DeveloperByPhaseRequest req)
        {
            var result = new DeveloperByPhaseResponse();
            if (req == null)
            {
                result.HasError = true;
                result.ErrorMsgs.Add(new Common.DTO.ErrorDTO { ErrorMsg = "Invalid Request" });
                return result;
            }
            if (string.IsNullOrWhiteSpace(req.CaseNumber) || string.IsNullOrWhiteSpace(req.PhaseNo))
            {
                result.HasError = true;
                result.ErrorMsgs.Add(new Common.DTO.ErrorDTO { ErrorMsg = "Invalid Request Parameters" });
                return result;
            }
            result = await _repos.GetAllDeveloperByPhaseAsync(req);
            return result;
        }

    }
}
