using DLMT.Biz.Interface.Reports;
using DLMT.Common.Request.Reports;
using DLMT.Common.Response.Reports;
using DLMT.Dac.Interface.Reports;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DLMT.Biz.Implementation.Reports
{
    public class ReportADPMainManager : IReportADPMainManager
    {
        private readonly IReportADPMainRepository _repos;
        public ReportADPMainManager(IReportADPMainRepository repos)
        {
            _repos = repos;
        }
        public async Task<ReportADPMainResponse> GetAllAsync(ReportADPMainRequest req)
        {
            var result =  await _repos.GetAllAsync(req);
            if (result != null && result.Data.Any())
            {
                result.Data.ToList().ForEach(x =>
                {
                    if (x.EffectiveDate != null && x.EffectiveDate > DateTime.MinValue && x.EffectiveDate < DateTime.MaxValue)
                    {
                        x.EffectiveDateStr = x.EffectiveDate.ToString("MM/dd/yyyy");
                    }
                });
            }
            return result;
        }
    }
}
