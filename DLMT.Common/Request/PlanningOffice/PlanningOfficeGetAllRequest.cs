using DLMT.Common.ViewAction;

namespace DLMT.Common.Request.PlanningOffice
{
    public class PlanningOfficeGetAllRequest : BaseRequest
    {
        public ViewPredicate Predicate { get; set; }
    }
}
