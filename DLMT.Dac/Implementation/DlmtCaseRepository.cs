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

        public async Task<CaseSearchDTO> GetDlmtCaseByDlmtCaseNameAsync(string DlmtCaseName)
        {
            throw new NotImplementedException();
        }

        public async Task<DlmtCaseGetByIdResponse> GetDlmtCaseByIdAsync(DlmtCaseGetByIdRequest req)
        {
            throw new NotImplementedException();
        }

        public async Task<DlmtCaseUpdateResponse> UpdateDlmtCaseAsync(DlmtCaseUpdateRequest req)
        {
            throw new NotImplementedException();
        }
    }
}
