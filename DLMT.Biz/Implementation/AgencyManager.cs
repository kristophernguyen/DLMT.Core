using DLMT.Biz.Interface;
using DLMT.Common.DTO;
using DLMT.Common.Request.Agency;
using DLMT.Common.Response.Agency;
using DLMT.Dac.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DLMT.Biz.Implementation
{
    public class AgencyManager : IAgencyManager
    {
        private readonly IAgencyRepository _repos;
        public AgencyManager(IAgencyRepository repos)
        {
            _repos = repos;
        }

        public async Task<AgencyDeleteByIdResponse> DeleteAgencyByIdAsync(AgencyDeleteByIdRequest req)
        {
            req.UpdatedDate = DateTime.Today;
            return await _repos.DeleteAgencyByIdAsync(req);
        }

        public async Task<AgencyGetAllResponse> GetAllAsync(AgencyGetAllRequest req)
        {
            var result = await _repos.GetAllAsync(req);
            return result;
        }

        public async Task<AgencyGetByIdResponse> GetAgencyByIdAsync(AgencyGetByIdRequest req)
        {
            var result = await _repos.GetAgencyByIdAsync(req);
            return result;
        }
        private async Task<IList<ErrorDTO>> ValidateModel(AgencyUpdateRequest req)
        {
            var result = new List<ErrorDTO>();
            var existingRecord = await _repos.GetAgencyByAgencyNameAsync(req.Agency.Name);
            if (existingRecord != null)
            {
                if (req.Agency.Id <= 0)
                {
                    result.Add(new ErrorDTO { ErrorMsg = "Duplicate Case Type Detected." });
                }
                else if (req.Agency.Id > 0 && existingRecord != null && existingRecord.Id != req.Agency.Id)
                {
                    result.Add(new ErrorDTO { ErrorMsg = "Duplicate Case Type Detected." });
                }
            }
            if (string.IsNullOrWhiteSpace(req.Agency.Name))
            {
                result.Add(new ErrorDTO { ErrorMsg = "Office Name is Required" });
            }
            if (!string.IsNullOrWhiteSpace(req.Agency.Name) && req.Agency.Name.Length > 100)
            {
                result.Add(new ErrorDTO { ErrorMsg = "Office Name is limitted to 100 characters." });
            }
            return result;
        }
        public async Task<AgencyUpdateResponse> UpdateAgencyAsync(AgencyUpdateRequest req)
        {
            var result = new AgencyUpdateResponse();
            var validateResult = await ValidateModel(req);
            if (validateResult != null && validateResult.Any())
            {
                result.HasError = true;
                result.ErrorMsgs = validateResult;
                return result;
            }
            req.Agency.UpdatedDate = DateTime.Today;
            return await _repos.UpdateAgencyAsync(req);
        }
    }
}
