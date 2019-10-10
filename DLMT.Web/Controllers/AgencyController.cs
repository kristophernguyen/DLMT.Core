using DLMT.Biz.Interface;
using DLMT.Common.Request.Agency;
using DLMT.Common.Response.Agency;
using DLMT.Web.Extensions.Auth;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DLMT.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgencyController : ControllerBase
    {
        private readonly IAgencyManager _AgencyManager;
        public AgencyController(IAgencyManager AgencyManager)
        {
            _AgencyManager = AgencyManager;
        }
        [HttpPost("fetch/all")]
        [ProducesResponseType(typeof(AgencyGetAllResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> AgencyGetAllAsync(AgencyGetAllRequest req)
        {
            var result = await _AgencyManager.GetAllAsync(req);
            return Ok(result);
        }

        [HttpGet("fetch/{id}")]
        [ProducesResponseType(typeof(AgencyGetByIdResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> AgencyGetByIdAsync(int id)
        {
            var req = new AgencyGetByIdRequest { Id = id };
            var result = await _AgencyManager.GetAgencyByIdAsync(req);
            return Ok(result);
        }
        [HttpDelete("delete/{id}")]
        [ProducesResponseType(typeof(AgencyDeleteByIdResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> AgencyDeleteByIdAsync(int id)
        {
            var req = new AgencyDeleteByIdRequest
            {
                Id = id,
                CurrentUser = User.CurrentUserName()
            };
            var result = await _AgencyManager.DeleteAgencyByIdAsync(req);
            return Ok(result);
        }

        [HttpPost("Update")]
        [ProducesResponseType(typeof(AgencyUpdateResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> AgencyUpdateAsync(AgencyUpdateRequest req)
        {
            req.Agency.UpdatedBy = User.CurrentUserName();
            var result = await _AgencyManager.UpdateAgencyAsync(req);
            return Ok(result);
        }
    }
}