using Dapper;
using DLMT.Common.DTO;
using DLMT.Common.DTO.Reports;
using DLMT.Common.Request.Reports;
using DLMT.Common.Response.Reports;
using DLMT.Dac.Interface.Reports;
using Microsoft.Extensions.Options;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace DLMT.Dac.Implementation.Reports
{
    public class ReportADPMainRepository : IReportADPMainRepository
    {
        private readonly ConnectionSettingDTO _connectionSettings;
        public ReportADPMainRepository(IOptions<ConnectionSettingDTO> connectionSettings)
        {
            _connectionSettings = connectionSettings.Value;
        }
        public async Task<ReportADPMainResponse> GetAllAsync(ReportADPMainRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new ReportADPMainResponse();
                const string storeproc = @"[dbo].[uspADPMainGetList_New]";
                await conn.OpenAsync();
                var rawResult = await conn.QueryAsync<ReportMainDTO>(storeproc, null, null, null, CommandType.StoredProcedure);
                result.Data = rawResult.ToList();
                return result;
            }
        }
    }
}
