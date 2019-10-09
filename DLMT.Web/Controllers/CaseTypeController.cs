using DLMT.Biz.Interface;
using DLMT.Common.Request;
using DLMT.Common.Response;
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
        [Route("fetch/all")]
        public async Task<IActionResult> CaseTypeGetAllAsync(CaseTypeGetAllRequest req)
        {
            var result = await _caseTypeManager.GetAllAsync(req);
            return Ok(result);
        }
        [HttpGet]
        [ProducesResponseType(typeof(CaseTypeGetByIdResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        [Route("fetch/{id}")]
        public async Task<IActionResult> CaseTypeGetByIdAsync(int id)
        {
            var req = new CaseTypeGetByIdRequest { Id = id };
            var result = await _caseTypeManager.GetCaseTypeByIdAsync(req);
            return Ok(result);
        }
        [HttpDelete]
        [ProducesResponseType(typeof(CaseTypeDeleteByIdResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        [Route("delete/{id}")]
        public async Task<IActionResult> CaseTypeDeleteByIdAsync(int id)
        {
            var req = new CaseTypeDeleteByIdRequest
            {
                Id = id,
                CurrentUser = User.CurrentUserName()
            };
            var result = await _caseTypeManager.DeleteCaseTypeByIdAsync(req);
            return Ok(result);
        }
       
        [HttpPost]
        [Route("Update")]
        [ProducesResponseType(typeof(CaseTypeUpdateResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> CaseTypeUpdateAsync(CaseTypeUpdateRequest req)
        {
            req.CaseType.UpdatedBy = User.CurrentUserName();
            var result = await _caseTypeManager.UpdateCaseTypeAsync(req);
            return Ok(result);
        }
    }
}