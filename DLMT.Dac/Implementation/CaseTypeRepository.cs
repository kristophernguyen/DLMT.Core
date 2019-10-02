using Dapper;
using DLMT.Common.DTO;
using DLMT.Common.Request;
using DLMT.Common.Response;
using DLMT.Common.Utilities;
using DLMT.Dac.Interface;
using Microsoft.Extensions.Options;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace DLMT.Dac.Implementation
{
    public class CaseTypeRepository : ICaseTypeRepository
    {
        private readonly ConnectionSettingDTO _connectionSettings;
        public CaseTypeRepository(IOptions<ConnectionSettingDTO> connectionSettings)
        {
            _connectionSettings = connectionSettings.Value;
        }
        public async Task<CaseTypeGetAllResponse> GetAllAsync(CaseTypeGetAllRequest req)
        {
            var resp = new CaseTypeGetAllResponse();
            var tempQuery = string.Empty;
            if (req.Predicate != null)
            {
                tempQuery = req.Predicate.ConvertToString();
            }
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                const string storeproc = @"[dbo].[uspCaseTypesGetList_New]";
                await conn.OpenAsync();
                var dynparam = new
                {
                    Query = tempQuery
                };
                var rawResult = await conn.QueryAsync<CaseTypeDTO>(storeproc, dynparam, null, null, CommandType.StoredProcedure);
                resp.Result = rawResult.ToList();
            }
            return resp;
        }
    }
}
