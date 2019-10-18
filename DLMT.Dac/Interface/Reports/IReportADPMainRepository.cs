using DLMT.Common.Request.Reports;
using DLMT.Common.Response.Reports;
using System.Threading.Tasks;

namespace DLMT.Dac.Interface.Reports
{
    public interface IReportADPMainRepository
    {
        Task<ReportADPMainResponse> GetAllAsync(ReportADPMainRequest req);
    }
}
