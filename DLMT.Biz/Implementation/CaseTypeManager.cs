using DLMT.Biz.Interface;
using DLMT.Common.Request;
using DLMT.Common.Response;
using DLMT.Dac.Interface;
using System;
using System.Threading.Tasks;

namespace DLMT.Biz.Implementation
{
    public class CaseTypeManager : ICaseTypeManager
    {
        private readonly ICaseTypeRepository _repos;
        public CaseTypeManager(ICaseTypeRepository repos)
        {
            _repos = repos;
        }

        public async Task<CaseTypeDeleteByIdResponse> DeleteCaseTypeByIdAsync(CaseTypeDeleteByIdRequest req)
        {
            req.UpdatedDate = DateTime.Today;
            return await _repos.DeleteCaseTypeByIdAsync(req);
        }

        public async Task<CaseTypeGetAllResponse> GetAllAsync(CaseTypeGetAllRequest req)
        {
            var result = await _repos.GetAllAsync(req);
            return result;
        }

        public async Task<CaseTypeGetByIdResponse> GetCaseTypeByIdAsync(CaseTypeGetByIdRequest req)
        {
            var result = await _repos.GetCaseTypeByIdAsync(req);
            return result;
        }


        public async Task<CaseTypeUpdateResponse> UpdateCaseTypeAsync(CaseTypeUpdateRequest req)
        {
            var result = new CaseTypeUpdateResponse();
            var existingRecord = await _repos.GetCaseTypeByCaseTypeNameAsync(req.CaseType.CaseType);
            if (existingRecord != null)
            {
                if (req.CaseType.Id <= 0)
                {
                    result.HasError = true;
                    result.ErrorMsgs.Add(new Common.DTO.ErrorDTO { ErrorMsg = "Duplicate Case Type Detected." });
                    return result;
                }
                else if (req.CaseType.Id > 0 && existingRecord != null && existingRecord.Id != req.CaseType.Id)
                {
                    result.HasError = true;
                    result.ErrorMsgs.Add(new Common.DTO.ErrorDTO { ErrorMsg = "Duplicate Case Type Detected." });
                    return result;
                }
            }
            
            req.CaseType.UpdatedDate = DateTime.Today;
            return await _repos.UpdateCaseTypeAsync(req);
        }
    }
}
