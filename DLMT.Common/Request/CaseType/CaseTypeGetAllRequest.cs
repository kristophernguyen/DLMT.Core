﻿using DLMT.Common.ViewAction;

namespace DLMT.Common.Request
{
    public class CaseTypeGetAllRequest : BaseRequest
    {
        public ViewPredicate Predicate { get; set; }
    }
}
