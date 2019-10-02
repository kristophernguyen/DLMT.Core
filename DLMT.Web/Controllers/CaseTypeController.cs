using DLMT.Biz.Interface;
using DLMT.Common.Request;
using DLMT.Common.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DLMT.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CaseTypeController : ControllerBase
    {
        private readonly ICaseTypeManager _caseTypeManager;
        public CaseTypeController(ICaseTypeManager caseTypeManager)
        {
            _caseTypeManager = caseTypeManager;
        }
        [HttpPost]
        [ProducesResponseType(typeof(CaseTypeGetAllResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> CaseTypeGetAllAsync(CaseTypeGetAllRequest req)
        {
            var result = await _caseTypeManager.GetAllAsync(req);
            return Ok(result);
        }

    }
}