using DLMT.Common.DTO;
using DLMT.Common.Request.ZoneArea;
using DLMT.Common.Response.ZoneArea;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DLMT.Dac.Interface
{
    public interface IZoneAreaRepository
    {
        Task<ZoneAreaGetAllResponse> GetAllAsync(ZoneAreaGetAllRequest req);
        Task<ZoneAreaDeleteByIdResponse> DeleteZoneAreaByIdAsync(ZoneAreaDeleteByIdRequest req);
        Task<ZoneAreaGetByIdResponse> GetZoneAreaByIdAsync(ZoneAreaGetByIdRequest req);
        Task<ZoneAreaUpdateResponse> UpdateZoneAreaAsync(ZoneAreaUpdateRequest req);
        Task<ZoneAreaDTO> GetZoneAreaByZoneAreaNameAsync(string zone, string ZoneName);
    }
}
