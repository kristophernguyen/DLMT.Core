using DLMT.Common.Request.Agency;
using DLMT.Common.Response.Agency;
using System.Threading.Tasks;

namespace DLMT.Biz.Interface
{
    public interface IAgencyManager
    {
        Task<AgencyGetAllResponse> GetAllAsync(AgencyGetAllRequest req);
        Task<AgencyDeleteByIdResponse> DeleteAgencyByIdAsync(AgencyDeleteByIdRequest req);
        Task<AgencyGetByIdResponse> GetAgencyByIdAsync(AgencyGetByIdRequest req);
        Task<AgencyUpdateResponse> UpdateAgencyAsync(AgencyUpdateRequest req);
    }
}
