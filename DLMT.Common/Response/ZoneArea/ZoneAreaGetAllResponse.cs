using DLMT.Common.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace DLMT.Common.Response.ZoneArea
{
    public class ZoneAreaGetAllResponse : BaseResponse
    {
        public ZoneAreaGetAllResponse()
        {
            Result = new List<ZoneAreaDTO>();
        }
        public IList<ZoneAreaDTO> Result { get; set; }
        public int Total { get; set; }
    }
}
