using DLMT.Common.Request.Contact;
using DLMT.Common.Response.Contact;
using System.Threading.Tasks;

namespace DLMT.Biz.Interface
{
    public interface IContactManager
    {
        Task<ContactGetAllResponse> GetAllAsync(ContactGetAllRequest req);
        Task<ContactDeleteByIdResponse> DeleteContactByIdAsync(ContactDeleteByIdRequest req);
        Task<ContactGetByIdResponse> GetContactByIdAsync(ContactGetByIdRequest req);
        Task<ContactUpdateResponse> UpdateContactAsync(ContactUpdateRequest req);
    }
}
