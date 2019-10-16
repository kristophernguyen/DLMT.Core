using DLMT.Biz.Interface;
using DLMT.Common.Request.Developer;
using DLMT.Common.Response.Developer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DLMT.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DeveloperController : ControllerBase
    {
        private readonly IDeveloperManager _personnelManager;
        public DeveloperController(IDeveloperManager personnelManager)
        {
            _personnelManager = personnelManager;
        }
        [HttpPost("fetch/developer/{caseNumber}/{phaseNo}")]
        [ProducesResponseType(typeof(DeveloperByPhaseResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> GetAllDeveloperByPhase(string caseNumber, string phaseNo)
        {
            var req = new DeveloperByPhaseRequest
            {
                CaseNumber = caseNumber,
                PhaseNo = phaseNo
            };
            var result = await _personnelManager.GetAllDeveloperByPhaseAsync(req);
            return Ok(result);
        }
    }
}