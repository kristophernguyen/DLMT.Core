using DLMT.Common.DTO;
using System.Collections.Generic;

namespace DLMT.Common.Response.Developer
{
    public class DeveloperByPhaseResponse : BaseResponse
    {
        public IList<DeveloperDTO> Data { get; set; }
    }
}
