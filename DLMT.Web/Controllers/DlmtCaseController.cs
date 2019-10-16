using DLMT.Biz.Interface;
using DLMT.Common.Request.DlmtCase;
using DLMT.Common.Response;
using DLMT.Common.Response.DlmtCase;
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
        [HttpPost("casesummaryupdate")]
        [ProducesResponseType(typeof(DlmtCaseSummaryUpdateResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> DlmtCaseSummaryUpdateAsync(DlmtCaseSummaryUpdateRequest req)
        {
            req.CaseSummary.UpdatedBy = User.CurrentUserName();
            var result = await _dlmtCasemanager.UpdateDlmtCaseSummaryAsync(req);
            return Ok(result);
        }
        [HttpGet("detailsformlookup")]
        [ProducesResponseType(typeof(DetailsFormLookupResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> DlmtCaseDetailsFormLookup()
        {
            var result = await _dlmtCasemanager.GetCaseDetailsFormLookupAsync();
            return Ok(result);
        }
        [HttpGet("detailsformdata/{id}")]
        [ProducesResponseType(typeof(DlmtDetailsFormDataResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> DlmtDetailsFormData(int id)
        {
            var req = new DlmtDetailsFormDataRequest { Id = id };
            var result = await _dlmtCasemanager.GetCaseDetailFormDataAsync(req);
            return Ok(result);
        }
        [HttpGet("fetch/personnel/{caseNumber}/{phaseNo}")]
        [ProducesResponseType(typeof(DlmtDetailsPersonnelDataResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> DlmtDetailsPersonnelFormData(string caseNumber, string phaseNo)
        {
            var req = new DlmtDetailsPersonnelDataRequest {CaseNumber= caseNumber, PhaseNo = phaseNo };
            var result = await _dlmtCasemanager.GetAllPersonnelFormData(req);
            return Ok(result);
        }

    }
}