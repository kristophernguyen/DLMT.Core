using DLMT.Common.DTO;
using DLMT.Common.Request.Contact;
using DLMT.Common.Response.Contact;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DLMT.Dac.Interface
{
    public interface IContactRepository
    {
        Task<ContactGetAllResponse> GetAllAsync(ContactGetAllRequest req);
        Task<ContactDeleteByIdResponse> DeleteContactByIdAsync(ContactDeleteByIdRequest req);
        Task<ContactGetByIdResponse> GetContactByIdAsync(ContactGetByIdRequest req);
        Task<ContactUpdateResponse> UpdateContactAsync(ContactUpdateRequest req);
        Task<ContactDTO> GetContactByContactNameAsync(string name);
    }
}
