using DLMT.Biz.Interface;
using DLMT.Common.Request.Contact;
using DLMT.Common.Response.Contact;
using DLMT.Web.Extensions.Auth;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DLMT.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactManager _contactManager;
        public ContactController(IContactManager contactManager)
        {
            _contactManager = contactManager;
        }
        [HttpPost("fetch/all")]
        [ProducesResponseType(typeof(ContactGetAllResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> ContactGetAllAsync(ContactGetAllRequest req)
        {
            var result = await _contactManager.GetAllAsync(req);
            return Ok(result);
        }

        [HttpGet("fetch/{id}")]
        [ProducesResponseType(typeof(ContactGetByIdResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> ContactGetByIdAsync(int id)
        {
            var req = new ContactGetByIdRequest { Id = id };
            var result = await _contactManager.GetContactByIdAsync(req);
            return Ok(result);
        }
        [HttpDelete("delete/{id}")]
        [ProducesResponseType(typeof(ContactDeleteByIdResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> ContactDeleteByIdAsync(int id)
        {
            var req = new ContactDeleteByIdRequest
            {
                Id = id,
                CurrentUser = User.CurrentUserName()
            };
            var result = await _contactManager.DeleteContactByIdAsync(req);
            return Ok(result);
        }

        [HttpPost("Update")]
        [ProducesResponseType(typeof(ContactUpdateResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> ContactUpdateAsync(ContactUpdateRequest req)
        {
            req.Contact.UpdatedBy = User.CurrentUserName();
            var result = await _contactManager.UpdateContactAsync(req);
            return Ok(result);
        }
    }
}