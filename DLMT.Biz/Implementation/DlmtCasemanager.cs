using DLMT.Biz.Interface;
using DLMT.Common.Request;
using DLMT.Common.Request.DlmtCase;
using DLMT.Common.Request.PlanningOffice;
using DLMT.Common.Request.ZoneArea;
using DLMT.Common.Response;
using DLMT.Common.Response.DlmtCase;
using DLMT.Common.ViewAction;
using DLMT.Dac.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DLMT.Biz.Implementation
{
    public class DlmtCasemanager : IDlmtCasemanager
    {
        private readonly IDlmtCaseRepository _repos;
        private readonly ICaseTypeManager _caseTypeManager;
        private readonly IAgencyManager _agencyManager;
        private readonly IZoneAreaManager _zoneAreaManager;
        private readonly IPlanningOfficeManager _planningOfficeManager;
        public DlmtCasemanager(
            IDlmtCaseRepository repos,
            ICaseTypeManager caseTypeManager,
            IAgencyManager agencyManager,
            IZoneAreaManager zoneAreaManager,
            IPlanningOfficeManager planningOfficeManager
         )
        {
            _repos = repos;
            _caseTypeManager = caseTypeManager;
            _agencyManager = agencyManager;
            _zoneAreaManager = zoneAreaManager;
            _planningOfficeManager = planningOfficeManager;
        }
        public async Task<DlmtCaseGetAllResponse> GetAllAsync(DlmtCaseGetAllRequest req)
        {
            var tempColumnSchemas = new Dictionary<string, string> {
                { "id", "C.ID"},
                { "caseNumber", "C.CaseNumber"},
                { "caseType", "CT.CaseType"},
                { "planningOffice", "PO.[Name]"},
                { "area","A.[Name]"},
                { "agency", "AG.Name"}
            };
            if (req.Predicate != null && req.Predicate.Filter != null && req.Predicate.Filter.FilterQueries.Any())
            {
                foreach (var d in tempColumnSchemas)
                {
                    var tempFilter = req.Predicate.Filter.FilterQueries.FirstOrDefault(x => x.ColumnName.Equals(d.Key, StringComparison.CurrentCultureIgnoreCase));
                    if (tempFilter != null)
                    {
                        tempFilter.ColumnName =d.Value;
                    }
                }
            }
            if (req.Predicate != null && req.Predicate.Sort != null && req.Predicate.Sort.SortConditions.Any())
            {
               
                foreach (var d in tempColumnSchemas)
                {
                    var tempSort = req.Predicate.Sort.SortConditions.FirstOrDefault(x => x.ColumnName.Equals(d.Key, StringComparison.CurrentCultureIgnoreCase));
                    if (tempSort != null)
                    {
                        tempSort.ColumnName = d.Value;
                    }
                }
            }
            var result = await _repos.GetAllAsync(req);
            return result;
        }
        public async Task<DlmtNewCaseFormLookupResponse> GetNewCaseFormLookupAsync()
        {
            var result = new DlmtNewCaseFormLookupResponse();
            var predicate = new ViewPredicate();
            predicate.StartRow = 0;
            predicate.EndRow = 10000;
            predicate.Sort = new SortModel();
            //case type
            var condition = new SortCondition { ColumnName = "CaseType", SortType = "Asc" };
            predicate.Sort.SortConditions = new List<SortCondition>();
            predicate.Sort.SortConditions.Add(condition);
            var caseTypeResult = await _caseTypeManager.GetAllAsync(new CaseTypeGetAllRequest { Predicate = predicate });
            if (caseTypeResult != null && caseTypeResult.Result.Any())
            {
                result.CaseTypes = caseTypeResult.Result;
            }
            //Zone Area
            condition.ColumnName = "[Zone]";
            var zoneAreaResult = await _zoneAreaManager.GetAllAsync(new ZoneAreaGetAllRequest { Predicate = predicate });
            if (zoneAreaResult != null && zoneAreaResult.Result.Any())
            {
                result.ZoneAreas = zoneAreaResult.Result;
            }
            //agency
            condition.ColumnName = "[Name]";
            var agencyResult = await _agencyManager.GetAllAsync(new Common.Request.Agency.AgencyGetAllRequest { Predicate = predicate });
            if (agencyResult != null && agencyResult.Result.Any())
            {
                result.Agencies = agencyResult.Result;
            }
            //planning office
            condition.ColumnName = "[Name]";
            var planningOfficeResult = await _planningOfficeManager.GetAllAsync(new PlanningOfficeGetAllRequest { Predicate = predicate });
            if (planningOfficeResult != null && planningOfficeResult.Result.Any())
            {
                result.PlanningOffices = planningOfficeResult.Result;
            }
            return result;
        }
    }
}

