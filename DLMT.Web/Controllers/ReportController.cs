using DLMT.Biz.Interface.Reports;
using DLMT.Common.Request.Reports;
using DLMT.Common.Response.Reports;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DLMT.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportADPMainManager _adpMainManager;
        public ReportController(IReportADPMainManager adpMainManager)
        {
            _adpMainManager = adpMainManager;
        }
        [HttpPost("adpmain")]
        [ProducesResponseType(typeof(ReportADPMainResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> AgencyGetAllAsync()
        {
            var req = new ReportADPMainRequest();
            var result = await _adpMainManager.GetAllAsync(req);
            return Ok(result);
        }
    }
}