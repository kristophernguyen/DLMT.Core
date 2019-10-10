using DLMT.Biz.Interface;
using DLMT.Common.Request.PlanningOffice;
using DLMT.Common.Response.PlanningOffice;
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
    }
}