using DLMT.Common.DTO;
using System.Collections.Generic;

namespace DLMT.Common.Response.DlmtCase
{
    public class DlmtCaseGetAllResponse : BaseResponse
    {
        public DlmtCaseGetAllResponse()
        {
            Result = new List<CaseSearchDTO>();
        }
        public IList<CaseSearchDTO> Result { get; set; }
        public int Total { get; set; }
    }
}
