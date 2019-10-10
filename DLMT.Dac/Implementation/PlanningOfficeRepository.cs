using Dapper;
using DLMT.Common.DTO;
using DLMT.Common.Request.PlanningOffice;
using DLMT.Common.Response.PlanningOffice;
using DLMT.Common.Utilities;
using DLMT.Dac.Interface;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DLMT.Dac.Implementation
{
    public class PlanningOfficeRepository : IPlanningOfficeRepository
    {
        private readonly ConnectionSettingDTO _connectionSettings;
        public PlanningOfficeRepository(IOptions<ConnectionSettingDTO> connectionSettings)
        {
            _connectionSettings = connectionSettings.Value;
        }
        public async Task<PlanningOfficeDeleteByIdResponse> DeletePlanningOfficeByIdAsync(PlanningOfficeDeleteByIdRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new PlanningOfficeDeleteByIdResponse();
                const string storeproc = @"[dbo].[uspPlanningOfficesDelete_New]";
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

        public async Task<PlanningOfficeGetAllResponse> GetAllAsync(PlanningOfficeGetAllRequest req)
        {
            var resp = new PlanningOfficeGetAllResponse();
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
                const string storeproc = @"[dbo].[uspPlanningOfficesGetList_New]";
                await conn.OpenAsync();
                var dynparam = new
                {
                    Query = tempQuery
                };
                var rawResult = await conn.QueryAsync<PlanningOfficeDTO>(storeproc, dynparam, null, null, CommandType.StoredProcedure);
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

        public async Task<PlanningOfficeGetByIdResponse> GetPlanningOfficeByIdAsync(PlanningOfficeGetByIdRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new PlanningOfficeGetByIdResponse();
                const string storeproc = @"[dbo].[uspPlanningOfficeGetById_New]";
                await conn.OpenAsync();
                var dynParm = new
                {
                    ID = req.Id
                };
                var rawResult = await conn.QueryAsync<PlanningOfficeDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                result.Data = rawResult.FirstOrDefault();
                return result;
            }
        }

        public async Task<PlanningOfficeDTO> GetPlanningOfficeByPlanningOfficeNameAsync(string planningOfficeName)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new PlanningOfficeDTO();
                const string storeproc = @"[dbo].[uspPlanningOfficeGetByName_New]";
                await conn.OpenAsync();
                var dynParm = new
                {
                    OfficeName = planningOfficeName
                };
                var rawResult = await conn.QueryAsync<PlanningOfficeDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                result = rawResult.FirstOrDefault();
                return result;
            }
        }

        public async Task<PlanningOfficeUpdateResponse> UpdatePlanningOfficeAsync(PlanningOfficeUpdateRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new PlanningOfficeUpdateResponse();
                const string storeproc = @"[dbo].[uspPlanningOfficesUpdate_New]";
                await conn.OpenAsync();
                var dynParm = new
                {
                    req.PlanningOffice.Id,
                    req.PlanningOffice.OfficeName,
                    req.PlanningOffice.UpdatedBy,
                    req.PlanningOffice.UpdatedDate
                };
                var rawResult = await conn.QueryAsync<PlanningOfficeDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                result.Data = rawResult.FirstOrDefault();
                return result;
            }
        }
    }
}
