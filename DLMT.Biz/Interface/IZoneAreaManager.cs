using DLMT.Common.Request.ZoneArea;
using DLMT.Common.Response.ZoneArea;
using System.Threading.Tasks;

namespace DLMT.Biz.Interface
{
    public interface IZoneAreaManager
    {
        Task<ZoneAreaGetAllResponse> GetAllAsync(ZoneAreaGetAllRequest req);
        Task<ZoneAreaDeleteByIdResponse> DeleteZoneAreaByIdAsync(ZoneAreaDeleteByIdRequest req);
        Task<ZoneAreaGetByIdResponse> GetZoneAreaByIdAsync(ZoneAreaGetByIdRequest req);
        Task<ZoneAreaUpdateResponse> UpdateZoneAreaAsync(ZoneAreaUpdateRequest req);
    }
}
