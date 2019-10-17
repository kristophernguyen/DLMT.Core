using DLMT.Common.DTO;
using System.Collections.Generic;

namespace DLMT.Common.Response.Contact
{
    public class ContactGetAllResponse : BaseResponse
    {
        public ContactGetAllResponse()
        {
            Result = new List<ContactDTO>();
        }
        public IList<ContactDTO> Result { get; set; }
        public int Total { get; set; }
    }
}
