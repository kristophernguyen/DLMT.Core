using DLMT.Common.DTO;

namespace DLMT.Common.Response.Contact
{
    public class ContactGetByIdResponse : BaseResponse
    {
        public ContactDTO Data { get; set; }
    }
}
