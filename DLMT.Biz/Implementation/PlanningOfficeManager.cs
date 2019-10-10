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

        public Task<PlanningOfficeDeleteByIdResponse> DeletePlanningOfficeByIdAsync(PlanningOfficeDeleteByIdRequest req)
        {
            throw new NotImplementedException();
        }

        public async Task<PlanningOfficeGetAllResponse> GetAllAsync(PlanningOfficeGetAllRequest req)
        {
            var result = await _repos.GetAllAsync(req);
            return result;
        }

        public Task<PlanningOfficeGetByIdResponse> GetPlanningOfficeByIdAsync(PlanningOfficeGetByIdRequest req)
        {
            throw new NotImplementedException();
        }

        public Task<PlanningOfficeUpdateResponse> UpdatePlanningOfficeAsync(PlanningOfficeUpdateRequest req)
        {
            throw new NotImplementedException();
        }
    }
}
