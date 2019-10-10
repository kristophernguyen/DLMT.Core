using Dapper;
using DLMT.Common.DTO;
using DLMT.Common.Request.Agency;
using DLMT.Common.Response.Agency;
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
    public class AgencyRepository : IAgencyRepository
    {
        private readonly ConnectionSettingDTO _connectionSettings;
        public AgencyRepository(IOptions<ConnectionSettingDTO> connectionSettings)
        {
            _connectionSettings = connectionSettings.Value;
        }
        public async Task<AgencyDeleteByIdResponse> DeleteAgencyByIdAsync(AgencyDeleteByIdRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new AgencyDeleteByIdResponse();
                const string storeproc = @"[dbo].[uspAgenciesDelete_New]";
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

        public async Task<AgencyDTO> GetAgencyByAgencyNameAsync(string name)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new AgencyDTO();
                const string storeproc = @"[dbo].[uspAgenciesGetByName_New]";
                await conn.OpenAsync();
                var dynParm = new
                {
                    name = name
                };
                var rawResult = await conn.QueryAsync<AgencyDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                result = rawResult.FirstOrDefault();
                return result;
            }
        }

        public async Task<AgencyGetByIdResponse> GetAgencyByIdAsync(AgencyGetByIdRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new AgencyGetByIdResponse();
                const string storeproc = @"[dbo].[uspAgenciesGetById_New]";
                await conn.OpenAsync();
                var dynParm = new
                {
                    ID = req.Id
                };
                var rawResult = await conn.QueryAsync<AgencyDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                result.Data = rawResult.FirstOrDefault();
                return result;
            }
        }

        public async Task<AgencyGetAllResponse> GetAllAsync(AgencyGetAllRequest req)
        {
            var resp = new AgencyGetAllResponse();
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
                const string storeproc = @"[dbo].[uspAgenciesGetList_New]";
                await conn.OpenAsync();
                var dynparam = new
                {
                    Query = tempQuery
                };
                var rawResult = await conn.QueryAsync<AgencyDTO>(storeproc, dynparam, null, null, CommandType.StoredProcedure);
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

        public async Task<AgencyUpdateResponse> UpdateAgencyAsync(AgencyUpdateRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new AgencyUpdateResponse();
                const string storeproc = @"[dbo].[uspAgenciesUpdate_New]";
                await conn.OpenAsync();
                var dynParm = new
                {
                    req.Agency.Id,
                    req.Agency.Name,
                    req.Agency.UpdatedBy,
                    req.Agency.UpdatedDate
                };
                var rawResult = await conn.QueryAsync<AgencyDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                result.Data = rawResult.FirstOrDefault();
                return result;
            }
        }
    }
}
