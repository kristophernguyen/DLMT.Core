using DLMT.Common.Request.Reports;
using DLMT.Common.Response.Reports;
using System.Threading.Tasks;

namespace DLMT.Biz.Interface.Reports
{
    public interface IReportADPMainManager
    {
        Task<ReportADPMainResponse> GetAllAsync(ReportADPMainRequest req);
    }
}
