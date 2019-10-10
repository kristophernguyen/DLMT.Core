using DLMT.Biz.Interface;
using DLMT.Common.Request.PlanningOffice;
using DLMT.Common.Response.PlanningOffice;
using DLMT.Web.Extensions.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DLMT.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PlanningOfficeController : ControllerBase
    {
        private readonly IPlanningOfficeManager _planningOfficeManager;
        public PlanningOfficeController(IPlanningOfficeManager planningOfficeManager)
        {
            _planningOfficeManager = planningOfficeManager;
        }
        [HttpPost("fetch/all")]
        [ProducesResponseType(typeof(PlanningOfficeGetAllResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> PlanningOfficeGetAllAsync(PlanningOfficeGetAllRequest req)
        {
            var result = await _planningOfficeManager.GetAllAsync(req);
            return Ok(result);
        }

        [HttpGet("fetch/{id}")]
        [ProducesResponseType(typeof(PlanningOfficeGetByIdResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> PlanningOfficeGetByIdAsync(int id)
        {
            var req = new PlanningOfficeGetByIdRequest { Id = id };
            var result = await _planningOfficeManager.GetPlanningOfficeByIdAsync(req);
            return Ok(result);
        }
        [HttpDelete("delete/{id}")]
        [ProducesResponseType(typeof(PlanningOfficeDeleteByIdResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> PlanningOfficeDeleteByIdAsync(int id)
        {
            var req = new PlanningOfficeDeleteByIdRequest
            {
                Id = id,
                CurrentUser = User.CurrentUserName()
            };
            var result = await _planningOfficeManager.DeletePlanningOfficeByIdAsync(req);
            return Ok(result);
        }

        [HttpPost("Update")]
        [ProducesResponseType(typeof(PlanningOfficeUpdateResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> PlanningOfficeUpdateAsync(PlanningOfficeUpdateRequest req)
        {
            req.PlanningOffice.UpdatedBy = User.CurrentUserName();
            var result = await _planningOfficeManager.UpdatePlanningOfficeAsync(req);
            return Ok(result);
        }
    }
}