using DLMT.Common.ViewAction;

namespace DLMT.Common.Request.Contact
{
    public class ContactGetAllRequest : BaseContactRequest
    {
        public ViewPredicate Predicate { get; set; }
    }
}
