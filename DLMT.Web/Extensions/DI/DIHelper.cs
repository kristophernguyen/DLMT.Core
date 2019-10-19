using DLMT.Biz.Implementation;
using DLMT.Biz.Implementation.Reports;
using DLMT.Biz.Interface;
using DLMT.Biz.Interface.Reports;
using DLMT.Dac.Implementation;
using DLMT.Dac.Implementation.Reports;
using DLMT.Dac.Interface;
using DLMT.Dac.Interface.Reports;
using Microsoft.Extensions.DependencyInjection;

namespace DLMT.Web.Extensions.DI
{
    public static class DIHelper
    {
        public static void InjectDlmtDependency(this IServiceCollection services)
        {
            services.AddSingleton<ICaseTypeRepository, CaseTypeRepository>();
            services.AddScoped<ICaseTypeManager, CaseTypeManager>();

            services.AddSingleton<IPlanningOfficeRepository, PlanningOfficeRepository>();
            services.AddScoped<IPlanningOfficeManager, PlanningOfficeManager>();

            services.AddSingleton<IZoneAreaRepository, ZoneAreaRepository>();
            services.AddScoped<IZoneAreaManager, ZoneAreaManager>();

            services.AddSingleton<IAgencyRepository, AgencyRepository>();
            services.AddScoped<IAgencyManager, AgencyManager>();

            services.AddSingleton<IDlmtCaseRepository, DlmtCaseRepository>();
            services.AddScoped<IDlmtCasemanager, DlmtCasemanager>();


            services.AddSingleton<IDeveloperRepository, DeveloperRepository>();
            services.AddScoped<IDeveloperManager, DeveloperManager>();

            services.AddSingleton<IContactRepository, ContactRepository>();
            services.AddScoped<IContactManager, ContactManager>();
            //Reports
            services.AddSingleton<IReportADPMainRepository, ReportADPMainRepository>();
            services.AddScoped<IReportADPMainManager, ReportADPMainManager>();
        }
    }
}
