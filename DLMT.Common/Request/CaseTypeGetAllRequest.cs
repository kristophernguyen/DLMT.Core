using DLMT.Common.ViewAction;
using System;
using System.Collections.Generic;
using System.Text;

namespace DLMT.Common.Request
{
    public class CaseTypeGetAllRequest : BaseRequest
    {
        public ViewPredicate Predicate { get; set; }
    }
}
