using DLMT.Common.DTO;
using System.Collections.Generic;

namespace DLMT.Common.Response.Agency
{
    public class AgencyGetAllResponse : BaseResponse
    {
        public AgencyGetAllResponse()
        {
            Result = new List<AgencyDTO>();
        }
        public IList<AgencyDTO> Result { get; set; }
        public int Total { get; set; }
    }
}
