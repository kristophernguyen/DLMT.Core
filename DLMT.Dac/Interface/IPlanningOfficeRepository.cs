using DLMT.Common.DTO;
using DLMT.Common.Request.PlanningOffice;
using DLMT.Common.Response.PlanningOffice;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DLMT.Dac.Interface
{
    public interface IPlanningOfficeRepository
    {
        Task<PlanningOfficeGetAllResponse> GetAllAsync(PlanningOfficeGetAllRequest req);
        Task<PlanningOfficeDeleteByIdResponse> DeletePlanningOfficeByIdAsync(PlanningOfficeDeleteByIdRequest req);
        Task<PlanningOfficeGetByIdResponse> GetPlanningOfficeByIdAsync(PlanningOfficeGetByIdRequest req);
        Task<PlanningOfficeUpdateResponse> UpdatePlanningOfficeAsync(PlanningOfficeUpdateRequest req);
        Task<PlanningOfficeDTO> GetPlanningOfficeByPlanningOfficeNameAsync(string PlanningOfficeName);
    }
}
