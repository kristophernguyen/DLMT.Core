using Dapper;
using DLMT.Common.DTO;
using DLMT.Common.Request.DlmtCase;
using DLMT.Common.Response.DlmtCase;
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
    public class DlmtCaseRepository : IDlmtCaseRepository
    {
        private readonly ConnectionSettingDTO _connectionSettings;
        public DlmtCaseRepository(IOptions<ConnectionSettingDTO> connectionSettings)
        {
            _connectionSettings = connectionSettings.Value;
        }
        public async Task<DlmtCaseDeleteByIdResponse> DeleteDlmtCaseByIdAsync(DlmtCaseDeleteByIdRequest req)
        {
            throw new NotImplementedException();
        }

        public async Task<DlmtCaseGetAllResponse> GetAllAsync(DlmtCaseGetAllRequest req)
        {
            var resp = new DlmtCaseGetAllResponse();
            var tempQuery = string.Empty;
            var tempQueryWithNoSort = string.Empty;
            var startRow = 0;
            var endRow = 0;
            if (req.Predicate != null)
            {
                tempQuery = req.Predicate.ConvertToString();
                tempQueryWithNoSort = req.Predicate.ConvertToStringWithNoOrder();
                startRow = req.Predicate.StartRow;
                endRow = req.Predicate.EndRow;
            }
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                const string storeproc = @"[dbo].[uspFindCase_New]";
                await conn.OpenAsync();
                var dynparam = new
                {
                    Query = tempQuery,
                    StartRow = startRow,
                    EndRow = endRow
                };
                var rawResult = await conn.QueryAsync<CaseSearchDTO>(storeproc, dynparam, null, null, CommandType.StoredProcedure);
                var tempTotal = await conn.QueryAsync<int>("[dbo].[uspFindCaseTotal_New]", new { Query = tempQueryWithNoSort}, null, null, CommandType.StoredProcedure);
                resp.Total = tempTotal != null? tempTotal.FirstOrDefault() : 0;
                resp.Result = rawResult.ToList();
            }
            return resp;
        }

        public async Task<DlmtDetailsFormDataResponse> GetCaseDetailFormDataAsync(DlmtDetailsFormDataRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new DlmtDetailsFormDataResponse();
                const string storeproc = @"[dbo].[uspsCaseDetailsGetById]";
                await conn.OpenAsync();
                var dynParm = new { req.Id };
                var rawResult = await conn.QueryMultipleAsync(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                if (rawResult != null)
                {
                    result.MainCase = rawResult.Read<DlmtCaseDetailsDTO>().FirstOrDefault();
                    if (result.MainCase != null)
                    {
                        result.CasePhases = rawResult.Read<CasePhaseDTO>().ToList();
                    }
                }
               
                return result;
            }
        }

        public async Task<CaseSearchDTO> GetCaseSummaryByCaseNumberAsync(string caseNumber)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new CaseSearchDTO();
                const string storeproc = @"[dbo].[uspFindCaseByCaseNumber_New]";
                await conn.OpenAsync();
                var dynParm = new { caseNumber };
                var rawResult = await conn.QueryAsync<CaseSearchDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                result = rawResult.FirstOrDefault();
                return result;
            }
        }

        public async Task<DlmtCaseGetByIdResponse> GetDlmtCaseByIdAsync(DlmtCaseGetByIdRequest req)
        {
            throw new NotImplementedException();
        }

        public async Task<DlmtCaseUpdateResponse> UpdateDlmtCaseAsync(DlmtCaseUpdateRequest req)
        {
            throw new NotImplementedException();
        }

        public  async Task<DlmtCaseSummaryUpdateResponse> UpdateDlmtCaseSummaryAsync(DlmtCaseSummaryUpdateRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new DlmtCaseSummaryUpdateResponse();
                const string storeproc = @"[dbo].[uspCaseMainSave_New]";
                await conn.OpenAsync();
                var dynParm = new
                {
                    req.CaseSummary.Id,
                    req.CaseSummary.CaseNumber,
                    req.CaseSummary.CaseTypeId,
                    req.CaseSummary.AgencyId,
                    req.CaseSummary.PlanningOfficeId,
                    req.CaseSummary.ZoneAreaId,
                    req.CaseSummary.UpdatedBy,
                    req.CaseSummary.UpdatedDate
                };
                var rawResult = await conn.QueryAsync<DlmtCaseSummaryDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                result.Data = rawResult.FirstOrDefault();
                return result;
            }
        }
    }
}
