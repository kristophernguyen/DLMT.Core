using Dapper;
using DLMT.Common.DTO;
using DLMT.Common.Request.ZoneArea;
using DLMT.Common.Response.ZoneArea;
using DLMT.Common.Utilities;
using DLMT.Dac.Interface;
using Microsoft.Extensions.Options;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace DLMT.Dac.Implementation
{
    public class ZoneAreaRepository : IZoneAreaRepository
    {
        private readonly ConnectionSettingDTO _connectionSettings;
        public ZoneAreaRepository(IOptions<ConnectionSettingDTO> connectionSettings)
        {
            _connectionSettings = connectionSettings.Value;
        }
        public async Task<ZoneAreaDeleteByIdResponse> DeleteZoneAreaByIdAsync(ZoneAreaDeleteByIdRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new ZoneAreaDeleteByIdResponse();
                const string storeproc = @"[dbo].[uspAreasDelete_New]";
                await conn.OpenAsync();
                var dynParm = new
                {
                    ID = req.Id,
                    LastUpdatedBy = req.CurrentUser,
                    LastModifiedDate = req.UpdatedDate
                };
                await conn.ExecuteAsync(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<ZoneAreaGetAllResponse> GetAllAsync(ZoneAreaGetAllRequest req)
        {
            var resp = new ZoneAreaGetAllResponse();
            var tempQuery = string.Empty;
            var startRow = 0;
            var endRow = 0;
            if (req.Predicate != null)
            {
                tempQuery = req.Predicate.ConvertToString();
                startRow = req.Predicate.StartRow;
                endRow = req.Predicate.EndRow;
            }
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                const string storeproc = @"[dbo].[uspAreasGetList_NEW]";
                await conn.OpenAsync();
                var dynparam = new
                {
                    Query = tempQuery
                };
                var rawResult = await conn.QueryAsync<ZoneAreaDTO>(storeproc, dynparam, null, null, CommandType.StoredProcedure);
                resp.Total = rawResult != null && rawResult.Any() ? rawResult.Count() : 0;
                if (startRow >= 0 && endRow >= 0)
                {
                    resp.Result = rawResult.ToList().Skip(startRow).Take(endRow - startRow).ToList();
                }
                else
                {
                    resp.Result = rawResult.ToList();
                }
            }
            return resp;
        }

        public async Task<ZoneAreaGetByIdResponse> GetZoneAreaByIdAsync(ZoneAreaGetByIdRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new ZoneAreaGetByIdResponse();
                const string storeproc = @"[dbo].[uspAreasGetById_New]";
                await conn.OpenAsync();
                var dynParm = new
                {
                    ID = req.Id
                };
                var rawResult = await conn.QueryAsync<ZoneAreaDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                result.Data = rawResult.FirstOrDefault();
                return result;
            }
        }

        public async Task<ZoneAreaDTO> GetZoneAreaByZoneAreaNameAsync(string zone, string name)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new ZoneAreaDTO();
                const string storeproc = @"[dbo].[uspZoneAreaGetByName_New]";
                await conn.OpenAsync();
                var dynParm = new {zone, name };
                var rawResult = await conn.QueryAsync<ZoneAreaDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                result = rawResult.FirstOrDefault();
                return result;
            }
        }

        public async Task<ZoneAreaUpdateResponse> UpdateZoneAreaAsync(ZoneAreaUpdateRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new ZoneAreaUpdateResponse();
                const string storeproc = @"[dbo].[uspAreasUpdate_New]";
                await conn.OpenAsync();
                var dynParm = new
                {
                    req.ZoneArea.Id,
                    req.ZoneArea.Zone,
                    req.ZoneArea.Name,
                    req.ZoneArea.UpdatedBy,
                    req.ZoneArea.UpdatedDate
                };
                var rawResult = await conn.QueryAsync<ZoneAreaDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                result.Data = rawResult.FirstOrDefault();
                return result;
            }
        }
    }
}
