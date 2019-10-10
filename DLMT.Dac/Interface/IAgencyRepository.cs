using DLMT.Common.DTO;
using DLMT.Common.Request.Agency;
using DLMT.Common.Response.Agency;
using System.Threading.Tasks;

namespace DLMT.Dac.Interface
{
    public interface IAgencyRepository
    {
        Task<AgencyGetAllResponse> GetAllAsync(AgencyGetAllRequest req);
        Task<AgencyDeleteByIdResponse> DeleteAgencyByIdAsync(AgencyDeleteByIdRequest req);
        Task<AgencyGetByIdResponse> GetAgencyByIdAsync(AgencyGetByIdRequest req);
        Task<AgencyUpdateResponse> UpdateAgencyAsync(AgencyUpdateRequest req);
        Task<AgencyDTO> GetAgencyByAgencyNameAsync(string name);
    }
}
