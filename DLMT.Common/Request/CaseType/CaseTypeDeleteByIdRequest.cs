using System;

namespace DLMT.Common.Request
{
    public class CaseTypeDeleteByIdRequest : BaseRequest
    {
        public int Id { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
