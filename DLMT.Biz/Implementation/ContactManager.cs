using System;
using System.Linq;
using System.Threading.Tasks;
using DLMT.Biz.Interface;
using DLMT.Common.Request.Contact;
using DLMT.Common.Response.Contact;
using DLMT.Dac.Interface;

namespace DLMT.Biz.Implementation
{
    public class ContactManager : IContactManager
    {
        private readonly IContactRepository _repos;
        public ContactManager(IContactRepository repos)
        {
            _repos = repos;
        }
        public async Task<ContactDeleteByIdResponse> DeleteContactByIdAsync(ContactDeleteByIdRequest req)
        {
            //Todo: make sure this contact is not reference in any case
            var result = new ContactDeleteByIdResponse();
            req.UpdatedDate = DateTime.Today;
            result = await _repos.DeleteContactByIdAsync(req);
            return result;
        }

        public async Task<ContactGetAllResponse> GetAllAsync(ContactGetAllRequest req)
        {
            var result = new ContactGetAllResponse();
            result = await _repos.GetAllAsync(req);
            if (result != null && result.Result.Any())
            {
                result.Result.ToList().ForEach(x =>
                {
                    x.DisplayName = x.Name;
                    if (!string.IsNullOrWhiteSpace(x.ContactName))
                    {
                        x.DisplayName = string.Format("{0} ({1})", x.Name, x.ContactName);
                    }
                    else if (!string.IsNullOrWhiteSpace(x.Zip))
                    {
                        x.DisplayName = string.Format("{0} (Zip: {1})", x.Name, x.Zip);
                    }
                });
            }
            return result;
        }

        public async Task<ContactGetByIdResponse> GetContactByIdAsync(ContactGetByIdRequest req)
        {
            return await _repos.GetContactByIdAsync(req);
        }

        public async Task<ContactUpdateResponse> UpdateContactAsync(ContactUpdateRequest req)
        {
            req.Contact.UpdatedDate = DateTime.Today;
            return await _repos.UpdateContactAsync(req);
        }
    }
}
