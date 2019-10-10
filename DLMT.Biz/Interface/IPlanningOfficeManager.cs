using DLMT.Common.Request.PlanningOffice;
using DLMT.Common.Response.PlanningOffice;
using System.Threading.Tasks;

namespace DLMT.Biz.Interface
{
    public interface IPlanningOfficeManager
    {
        Task<PlanningOfficeGetAllResponse> GetAllAsync(PlanningOfficeGetAllRequest req);
        Task<PlanningOfficeDeleteByIdResponse> DeletePlanningOfficeByIdAsync(PlanningOfficeDeleteByIdRequest req);
        Task<PlanningOfficeGetByIdResponse> GetPlanningOfficeByIdAsync(PlanningOfficeGetByIdRequest req);
        Task<PlanningOfficeUpdateResponse> UpdatePlanningOfficeAsync(PlanningOfficeUpdateRequest req);
    }
}
