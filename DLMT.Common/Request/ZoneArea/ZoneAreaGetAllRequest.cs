using DLMT.Common.ViewAction;

namespace DLMT.Common.Request.ZoneArea
{
    public class ZoneAreaGetAllRequest : BaseRequest
    {
        public ViewPredicate Predicate { get; set; }
    }
}
