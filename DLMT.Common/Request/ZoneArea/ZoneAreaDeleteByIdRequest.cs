using System;

namespace DLMT.Common.Request.ZoneArea
{
    public class ZoneAreaDeleteByIdRequest : BaseRequest
    {
        public int Id { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
