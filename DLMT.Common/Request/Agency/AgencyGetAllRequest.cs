using DLMT.Common.ViewAction;

namespace DLMT.Common.Request.Agency
{
    public class AgencyGetAllRequest : BaseRequest
    {
        public ViewPredicate Predicate { get; set; }
    }
}
