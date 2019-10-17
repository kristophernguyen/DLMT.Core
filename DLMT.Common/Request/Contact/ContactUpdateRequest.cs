using DLMT.Common.DTO;

namespace DLMT.Common.Request.Contact
{
    public class ContactUpdateRequest : BaseContactRequest
    {
        public ContactDTO Contact { get; set; }
    }
}
