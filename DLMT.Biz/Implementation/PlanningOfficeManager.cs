using DLMT.Biz.Interface;
using DLMT.Common.Request.PlanningOffice;
using DLMT.Common.Response.PlanningOffice;
using DLMT.Dac.Interface;
using System;
using System.Collections.Generic;
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

        public async Task<PlanningOfficeUpdateResponse> UpdatePlanningOfficeAsync(PlanningOfficeUpdateRequest req)
        {
            var result = new PlanningOfficeUpdateResponse();
            var existingRecord = await _repos.GetPlanningOfficeByPlanningOfficeNameAsync(req.PlanningOffice.OfficeName);
            if (existingRecord != null)
            {
                if (req.PlanningOffice.Id <= 0)
                {
                    result.HasError = true;
                    result.ErrorMsgs.Add(new Common.DTO.ErrorDTO { ErrorMsg = "Duplicate Case Type Detected." });
                    return result;
                }
                else if (req.PlanningOffice.Id > 0 && existingRecord != null && existingRecord.Id != req.PlanningOffice.Id)
                {
                    result.HasError = true;
                    result.ErrorMsgs.Add(new Common.DTO.ErrorDTO { ErrorMsg = "Duplicate Case Type Detected." });
                    return result;
                }
            }

            req.PlanningOffice.UpdatedDate = DateTime.Today;
            return await _repos.UpdatePlanningOfficeAsync(req);
        }
    }
}
