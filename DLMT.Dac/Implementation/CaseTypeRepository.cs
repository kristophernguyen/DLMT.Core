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
                const string storeproc = @"[dbo].[uspCaseTypesGetList_New]";
                await conn.OpenAsync();
                var dynparam = new
                {
                    Query = tempQuery
                };
                var rawResult = await conn.QueryAsync<CaseTypeDTO>(storeproc, dynparam, null, null, CommandType.StoredProcedure);
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
    }
}
