using DLMT.Biz.Interface;
using DLMT.Common.Request.DlmtCase;
using DLMT.Common.Response;
using DLMT.Common.Response.DlmtCase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DLMT.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DlmtCaseController : ControllerBase
    {
        private readonly IDlmtCasemanager _dlmtCasemanager;
        public DlmtCaseController(IDlmtCasemanager dlmtCasemanager)
        {
            _dlmtCasemanager = dlmtCasemanager;
        }
        [HttpPost("fetch/all")]
        [ProducesResponseType(typeof(DlmtCaseGetAllResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> DlmtCaseGetAllAsync(DlmtCaseGetAllRequest req)
        {
            var result = await _dlmtCasemanager.GetAllAsync(req);
            return Ok(result);
        }
        [HttpGet("summaryformlookup")]
        [ProducesResponseType(typeof(DlmtNewCaseFormLookupResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> DlmtCaseNewFormLookupAsync()
        {
            var result = await _dlmtCasemanager.GetNewCaseFormLookupAsync();
            return Ok(result);
        }
        [HttpPost("newcase")]
        [ProducesResponseType(typeof(DlmtCaseSummaryResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> DlmtCaseSummaryInsertAsync(DlmtCaseSummaryRequest req)
        {
            var result = await Task.FromResult("hello");
            return Ok(result);
        }
    }
}