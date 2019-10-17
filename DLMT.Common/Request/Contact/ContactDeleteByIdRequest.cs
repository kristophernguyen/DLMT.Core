using System;

namespace DLMT.Common.Request.Contact
{
    public class ContactDeleteByIdRequest : BaseContactRequest
    {
        public int Id { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
