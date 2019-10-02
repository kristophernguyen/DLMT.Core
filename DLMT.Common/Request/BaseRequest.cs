using DLMT.Common.ViewAction;
using System.Collections.Generic;

namespace DLMT.Common.Request
{
    public class BaseRequest
    {
        public string CurrentUser { get; set; }
        public IList<string> Roles { get; set; }
        public ViewPredicate Predicate { get; set; }
    }
}
