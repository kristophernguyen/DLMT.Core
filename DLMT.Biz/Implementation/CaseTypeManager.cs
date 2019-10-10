using DLMT.Biz.Interface;
using DLMT.Common.DTO;
using DLMT.Common.Request;
using DLMT.Common.Response;
using DLMT.Dac.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
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

        private async Task<IList<ErrorDTO>> ValidateModel(CaseTypeUpdateRequest req)
        {
            var result = new List<ErrorDTO>();
            var existingRecord = await _repos.GetCaseTypeByCaseTypeNameAsync(req.CaseType.CaseType);
            if (existingRecord != null)
            {
                if (req.CaseType.Id <= 0)
                {
                    result.Add(new ErrorDTO { ErrorMsg = "Duplicate Case Type Detected." });
                }
                else if (req.CaseType.Id > 0 && existingRecord != null && existingRecord.Id != req.CaseType.Id)
                {
                    result.Add(new ErrorDTO { ErrorMsg = "Duplicate Case Type Detected." });
                }
            }
            if (string.IsNullOrWhiteSpace(req.CaseType.CaseType))
            {
                result.Add(new ErrorDTO { ErrorMsg = "Case Type is Required" });
            }
            if (!string.IsNullOrWhiteSpace(req.CaseType.CaseType) && req.CaseType.CaseType.Length > 4)
            {
                result.Add(new ErrorDTO { ErrorMsg = "Case type is limitted to 4 characters." });
            }
            if (string.IsNullOrWhiteSpace(req.CaseType.Description))
            {
                result.Add(new ErrorDTO { ErrorMsg = "Description is required" });
            }
            if (!string.IsNullOrWhiteSpace(req.CaseType.Description) && req.CaseType.Description.Length > 100)
            {
                result.Add(new ErrorDTO { ErrorMsg = "Description is limitted to 100 characters." });
            }
            return result;
        }
        public async Task<CaseTypeUpdateResponse> UpdateCaseTypeAsync(CaseTypeUpdateRequest req)
        {
            var result = new CaseTypeUpdateResponse();
            var validateResult = await ValidateModel(req);
            if (validateResult != null && validateResult.Any())
            {
                result.HasError = true;
                result.ErrorMsgs = validateResult;
                return result;
            }
            req.CaseType.UpdatedDate = DateTime.Today;
            return await _repos.UpdateCaseTypeAsync(req);
        }
    }
}
