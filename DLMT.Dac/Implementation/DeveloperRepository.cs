using Dapper;
using DLMT.Common.DTO;
using DLMT.Common.Request.Developer;
using DLMT.Common.Response.Developer;
using DLMT.Dac.Interface;
using Microsoft.Extensions.Options;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace DLMT.Dac.Implementation
{
    public class DeveloperRepository : IDeveloperRepository
    {
        private readonly ConnectionSettingDTO _connectionSettings;
        public DeveloperRepository(IOptions<ConnectionSettingDTO> connectionSettings)
        {
            _connectionSettings = connectionSettings.Value;
        }
        public async Task<DeveloperByPhaseResponse> GetAllDeveloperByPhaseAsync(DeveloperByPhaseRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new DeveloperByPhaseResponse();
                const string storeproc = @"[dbo].[uspDeveloperByPhaseGetList_New]";
                await conn.OpenAsync();
                var dynParm = new
                {
                    req.CaseNumber,
                    req.PhaseNo
                };
                var rawResult = await conn.QueryAsync<DeveloperDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                result.Data = rawResult.ToList();
                return result;
            }
        }
    }
}
