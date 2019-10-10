using System;

namespace DLMT.Common.Request.Agency
{
    public class AgencyDeleteByIdRequest : BaseRequest
    {
        public int Id { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
