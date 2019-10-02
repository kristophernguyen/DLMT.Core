using DLMT.Common.DTO;
using System.Collections.Generic;

namespace DLMT.Common.Response
{
    public class BaseResponse
    {
        public BaseResponse()
        {
            ErrorMsgs = new List<ErrorDTO>();
        }
        public bool HasError { get; set; }
        public IList<ErrorDTO> ErrorMsgs { get; set; }
    }
}
