using DLMT.Common.DTO;
using System.Collections.Generic;

namespace DLMT.Common.Response
{
    public class CaseTypeGetAllResponse : BaseResponse
    {
        public IList<CaseTypeDTO> Result { get; set; }
        public int Total { get; set; }
    }
}
