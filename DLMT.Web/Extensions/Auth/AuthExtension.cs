using System.Linq;
using System.Security.Claims;

namespace DLMT.Web.Extensions.Auth
{
    public static class AuthExtension
    {
        public static string CurrentUserName(this ClaimsPrincipal user)
        {
            if (user == null)
            {
                return string.Empty;
            }
            var rawSurenameResult = ((ClaimsIdentity)user.Identity).Claims
                            .Where(c => c.Type.Equals(ClaimTypes.Surname.ToString())).Select(c => c.Value).FirstOrDefault();
            var rawGivennameResult = ((ClaimsIdentity)user.Identity).Claims
                            .Where(c => c.Type.Equals(ClaimTypes.GivenName.ToString())).Select(c => c.Value).FirstOrDefault();
            var result = string.Format("{0} {1}", rawGivennameResult, rawSurenameResult);
            return result;
        }
    }
}
