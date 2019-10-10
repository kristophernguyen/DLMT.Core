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
        public Task<PlanningOfficeDeleteByIdResponse> DeletePlanningOfficeByIdAsync(PlanningOfficeDeleteByIdRequest req)
        {

            throw new NotImplementedException();
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

        public Task<PlanningOfficeGetByIdResponse> GetPlanningOfficeByIdAsync(PlanningOfficeGetByIdRequest req)
        {
            throw new NotImplementedException();
        }

        public Task<PlanningOfficeDTO> GetPlanningOfficeByPlanningOfficeNameAsync(string PlanningOfficeName)
        {
            throw new NotImplementedException();
        }

        public Task<PlanningOfficeUpdateResponse> UpdatePlanningOfficeAsync(PlanningOfficeUpdateRequest req)
        {
            throw new NotImplementedException();
        }
    }
}
