using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DLMT.Biz.Interface;
using DLMT.Common.Request.ZoneArea;
using DLMT.Common.Response.ZoneArea;
using DLMT.Web.Extensions.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DLMT.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ZoneAreaController : ControllerBase
    {
        private readonly IZoneAreaManager _zoneAreaManager;
        public ZoneAreaController(IZoneAreaManager zoneAreaManager)
        {
            _zoneAreaManager = zoneAreaManager;
        }
        [HttpPost("fetch/all")]
        [ProducesResponseType(typeof(ZoneAreaGetAllResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> ZoneAreaGetAllAsync(ZoneAreaGetAllRequest req)
        {
            var result = await _zoneAreaManager.GetAllAsync(req);
            return Ok(result);
        }

        [HttpGet("fetch/{id}")]
        [ProducesResponseType(typeof(ZoneAreaGetByIdResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> ZoneAreaGetByIdAsync(int id)
        {
            var req = new ZoneAreaGetByIdRequest { Id = id };
            var result = await _zoneAreaManager.GetZoneAreaByIdAsync(req);
            return Ok(result);
        }
        [HttpDelete("delete/{id}")]
        [ProducesResponseType(typeof(ZoneAreaDeleteByIdResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> ZoneAreaDeleteByIdAsync(int id)
        {
            var req = new ZoneAreaDeleteByIdRequest
            {
                Id = id,
                CurrentUser = User.CurrentUserName()
            };
            var result = await _zoneAreaManager.DeleteZoneAreaByIdAsync(req);
            return Ok(result);
        }

        [HttpPost("Update")]
        [ProducesResponseType(typeof(ZoneAreaUpdateResponse), 200)]
        [ProducesResponseType(typeof(IDictionary<string, string>), 400)]
        public async Task<IActionResult> ZoneAreaUpdateAsync(ZoneAreaUpdateRequest req)
        {
            req.ZoneArea.UpdatedBy = User.CurrentUserName();
            var result = await _zoneAreaManager.UpdateZoneAreaAsync(req);
            return Ok(result);
        }
    }
}