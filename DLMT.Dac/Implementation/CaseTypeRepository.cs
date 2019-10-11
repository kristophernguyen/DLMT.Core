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
        public async Task<CaseTypeUpdateResponse> UpdateCaseTypeAsync(CaseTypeUpdateRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new CaseTypeUpdateResponse();
                const string storeproc = @"[dbo].[uspCaseTypesUpdate_New]";
                await conn.OpenAsync();
                var dynParm = new
                {
                    req.CaseType.Id,
                    req.CaseType.CaseType,
                    req.CaseType.Description,
                    req.CaseType.UpdatedBy,
                    req.CaseType.UpdatedDate
                };
                var rawResult = await conn.QueryAsync<CaseTypeDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                result.Data = rawResult.FirstOrDefault();
                return result;
            }
        }

        public async Task<CaseTypeGetByIdResponse> GetCaseTypeByIdAsync(CaseTypeGetByIdRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new CaseTypeGetByIdResponse();
                const string storeproc = @"[dbo].[uspCaseTypesGetById_New]";
                await conn.OpenAsync();
                var dynParm = new
                {
                    ID = req.Id
                };
                var rawResult = await conn.QueryAsync<CaseTypeDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                result.Data = rawResult.FirstOrDefault();
                return result;
            }
        }
        public async Task<CaseTypeDeleteByIdResponse> DeleteCaseTypeByIdAsync(CaseTypeDeleteByIdRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new CaseTypeDeleteByIdResponse();
                const string storeproc = @"[dbo].[uspCaseTypesDelete_New]";
                await conn.OpenAsync();
                var dynParm = new {
                    ID = req.Id,
                    LastUpdatedBy = req.CurrentUser,
                    LastModifiedDate = req.UpdatedDate
                };
                await conn.ExecuteAsync(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                return result;
            }
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
        
        public async Task<CaseTypeDTO> GetCaseTypeByCaseTypeNameAsync(string caseTypeName)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new CaseTypeDTO();
                const string storeproc = @"[dbo].[uspCaseTypesGetByCaseTypeName_New]";
                await conn.OpenAsync();
                var dynParm = new
                {
                    CaseType = caseTypeName
                };
                var rawResult = await conn.QueryAsync<CaseTypeDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                result = rawResult.FirstOrDefault();
                return result;
            }
        }


    }
}
