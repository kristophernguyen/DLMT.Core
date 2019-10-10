using DLMT.Biz.Interface;
using DLMT.Common.DTO;
using DLMT.Common.Request.ZoneArea;
using DLMT.Common.Response.ZoneArea;
using DLMT.Dac.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DLMT.Biz.Implementation
{
    public class ZoneAreaManager : IZoneAreaManager
    {
        private readonly IZoneAreaRepository _repos;
        public ZoneAreaManager(IZoneAreaRepository repos)
        {
            _repos = repos;
        }
        public async Task<ZoneAreaDeleteByIdResponse> DeleteZoneAreaByIdAsync(ZoneAreaDeleteByIdRequest req)
        {
            req.UpdatedDate = DateTime.Today;
            return await _repos.DeleteZoneAreaByIdAsync(req);
        }

        public async Task<ZoneAreaGetAllResponse> GetAllAsync(ZoneAreaGetAllRequest req)
        {
            if (req.Predicate != null && req.Predicate.Filter != null && req.Predicate.Filter.FilterQueries.Any())
            {
                var tempFilter = req.Predicate.Filter.FilterQueries.FirstOrDefault(x => x.ColumnName.Equals("zonename", StringComparison.CurrentCultureIgnoreCase));
                if (tempFilter != null)
                {
                    tempFilter.ColumnName = "Name";
                }
            }
            if (req.Predicate != null && req.Predicate.Sort != null && req.Predicate.Sort.SortConditions.Any())
            {
                var tempSort = req.Predicate.Sort.SortConditions.FirstOrDefault(x=>x.ColumnName.Equals("zonename", StringComparison.CurrentCultureIgnoreCase));
                if (tempSort != null)
                {
                    tempSort.ColumnName = "Zone";
                    req.Predicate.Sort.SortConditions.Add(new Common.ViewAction.SortCondition { ColumnName = "Name", SortType = tempSort.SortType });
                }
            }
            var result = await _repos.GetAllAsync(req);
            return result;
        }

        public async Task<ZoneAreaGetByIdResponse> GetZoneAreaByIdAsync(ZoneAreaGetByIdRequest req)
        {
            var result = await _repos.GetZoneAreaByIdAsync(req);
            return result;
        }
        private async Task<IList<ErrorDTO>> ValidateModel(ZoneAreaUpdateRequest req)
        {
            var result = new List<ErrorDTO>();
            var existingRecord = await _repos.GetZoneAreaByZoneAreaNameAsync(req.ZoneArea.Zone, req.ZoneArea.Name);
            if (existingRecord != null)
            {
                if (req.ZoneArea.Id <= 0)
                {
                    result.Add(new ErrorDTO { ErrorMsg = "Duplicate Zone Detected." });
                }
                else if (req.ZoneArea.Id > 0 && existingRecord != null && existingRecord.Id != req.ZoneArea.Id)
                {
                    result.Add(new ErrorDTO { ErrorMsg = "Duplicate Zone Detected." });
                }
            }
            if (string.IsNullOrWhiteSpace(req.ZoneArea.Zone))
            {
                result.Add(new ErrorDTO { ErrorMsg = "Zone is Required" });
            }
            if (!string.IsNullOrWhiteSpace(req.ZoneArea.Zone) && req.ZoneArea.Zone.Length > 1)
            {
                result.Add(new ErrorDTO { ErrorMsg = "Zone is limitted to 1 characters." });
            }
            if (string.IsNullOrWhiteSpace(req.ZoneArea.Name))
            {
                result.Add(new ErrorDTO { ErrorMsg = "Name is Required" });
            }
            if (!string.IsNullOrWhiteSpace(req.ZoneArea.Name) && req.ZoneArea.Name.Length > 100)
            {
                result.Add(new ErrorDTO { ErrorMsg = "Name is limitted to 100 characters." });
            }
            return result;
        }
        public async Task<ZoneAreaUpdateResponse> UpdateZoneAreaAsync(ZoneAreaUpdateRequest req)
        {
            var result = new ZoneAreaUpdateResponse();
            var validateResult = await ValidateModel(req);
            if (validateResult != null && validateResult.Any())
            {
                result.HasError = true;
                result.ErrorMsgs = validateResult;
                return result;
            }
            req.ZoneArea.UpdatedDate = DateTime.Today;
            return await _repos.UpdateZoneAreaAsync(req);
        }
    }
}
