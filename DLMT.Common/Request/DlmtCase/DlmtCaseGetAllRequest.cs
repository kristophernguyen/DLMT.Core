using DLMT.Common.ViewAction;

namespace DLMT.Common.Request.DlmtCase
{
    public class DlmtCaseGetAllRequest : BaseRequest
    {
        public ViewPredicate Predicate { get; set; }
    }
}
