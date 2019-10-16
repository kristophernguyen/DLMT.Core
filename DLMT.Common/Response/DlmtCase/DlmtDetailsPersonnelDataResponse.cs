using DLMT.Common.DTO;
using System.Collections.Generic;

namespace DLMT.Common.Response.DlmtCase
{
    public class DlmtDetailsPersonnelDataResponse : BaseResponse
    {
        public DlmtDetailsPersonnelDataResponse()
        {
            Developers = new List<DeveloperDTO>();
        }
        public IList<DeveloperDTO> Developers { get; set; }
    }
}
