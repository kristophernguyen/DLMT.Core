using DLMT.Common.DTO.Reports;
using System.Collections.Generic;

namespace DLMT.Common.Response.Reports
{
    public class ReportADPMainResponse : BaseResponse
    {
        public IList<ReportMainDTO> Data { get; set; }
    }
}
