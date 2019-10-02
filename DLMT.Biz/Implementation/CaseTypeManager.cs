using DLMT.Biz.Interface;
using DLMT.Common.Request;
using DLMT.Common.Response;
using DLMT.Dac.Interface;
using System.Threading.Tasks;

namespace DLMT.Biz.Implementation
{
    public class CaseTypeManager : ICaseTypeManager
    {
        private readonly ICaseTypeRepository _repos;
        public CaseTypeManager(ICaseTypeRepository repos)
        {
            _repos = repos;
        }

        public async Task<CaseTypeGetAllResponse> GetAllAsync(CaseTypeGetAllRequest req)
        {
            var result = await _repos.GetAllAsync(req);
            return result;
        }
    }
}
