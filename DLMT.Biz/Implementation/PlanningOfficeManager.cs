using DLMT.Biz.Interface;
using DLMT.Common.DTO;
using DLMT.Common.Request.PlanningOffice;
using DLMT.Common.Response.PlanningOffice;
using DLMT.Dac.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DLMT.Biz.Implementation
{
    public class PlanningOfficeManager : IPlanningOfficeManager
    {
        private readonly IPlanningOfficeRepository _repos;
        public PlanningOfficeManager(IPlanningOfficeRepository repos)
        {
            _repos = repos;
        }

        public async Task<PlanningOfficeDeleteByIdResponse> DeletePlanningOfficeByIdAsync(PlanningOfficeDeleteByIdRequest req)
        {
            req.UpdatedDate = DateTime.Today;
            return await _repos.DeletePlanningOfficeByIdAsync(req);
        }

        public async Task<PlanningOfficeGetAllResponse> GetAllAsync(PlanningOfficeGetAllRequest req)
        {
            var result = await _repos.GetAllAsync(req);
            return result;
        }

        public async Task<PlanningOfficeGetByIdResponse> GetPlanningOfficeByIdAsync(PlanningOfficeGetByIdRequest req)
        {
            var result = await _repos.GetPlanningOfficeByIdAsync(req);
            return result;
        }
        private async Task<IList<ErrorDTO>> ValidateModel(PlanningOfficeUpdateRequest req)
        {
            var result = new List<ErrorDTO>();
            var existingRecord = await _repos.GetPlanningOfficeByPlanningOfficeNameAsync(req.PlanningOffice.OfficeName);
            if (existingRecord != null)
            {
                if (req.PlanningOffice.Id <= 0)
                {
                    result.Add(new ErrorDTO { ErrorMsg = "Duplicate Case Type Detected." });
                }
                else if (req.PlanningOffice.Id > 0 && existingRecord != null && existingRecord.Id != req.PlanningOffice.Id)
                {
                    result.Add(new ErrorDTO { ErrorMsg = "Duplicate Case Type Detected." });
                }
            }
            if (string.IsNullOrWhiteSpace(req.PlanningOffice.OfficeName))
            {
                result.Add(new ErrorDTO { ErrorMsg = "Office Name is Required" });
            }
            if (!string.IsNullOrWhiteSpace(req.PlanningOffice.OfficeName) && req.PlanningOffice.OfficeName.Length > 100)
            {
                result.Add(new ErrorDTO { ErrorMsg = "Office Name is limitted to 100 characters." });
            }
            return result;
        }
        public async Task<PlanningOfficeUpdateResponse> UpdatePlanningOfficeAsync(PlanningOfficeUpdateRequest req)
        {
            var result = new PlanningOfficeUpdateResponse();
            var validateResult = await ValidateModel(req);
            if (validateResult != null && validateResult.Any())
            {
                result.HasError = true;
                result.ErrorMsgs = validateResult;
                return result;
            }
            req.PlanningOffice.UpdatedDate = DateTime.Today;
            return await _repos.UpdatePlanningOfficeAsync(req);
        }
    }
}
