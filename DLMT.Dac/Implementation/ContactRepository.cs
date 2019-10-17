using Dapper;
using DLMT.Common.DTO;
using DLMT.Common.Request.Contact;
using DLMT.Common.Response.Contact;
using DLMT.Common.Utilities;
using DLMT.Dac.Interface;
using Microsoft.Extensions.Options;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace DLMT.Dac.Implementation
{
    public class ContactRepository : IContactRepository
    {
        private readonly ConnectionSettingDTO _connectionSettings;
        public ContactRepository(IOptions<ConnectionSettingDTO> connectionSettings)
        {
            _connectionSettings = connectionSettings.Value;
        }
        public async Task<ContactDeleteByIdResponse> DeleteContactByIdAsync(ContactDeleteByIdRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new ContactDeleteByIdResponse();
                string storeproc = string.Format("[dbo].[usp{0}Delete_New]",req.ContactType);
                await conn.OpenAsync();
                var dynParm = new
                {
                    ID = req.Id,
                    LastUpdatedBy = req.CurrentUser,
                    LastModifiedDate = req.UpdatedDate
                };
                await conn.ExecuteAsync(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<ContactGetAllResponse> GetAllAsync(ContactGetAllRequest req)
        {
            var resp = new ContactGetAllResponse();
            var tempQuery = string.Empty;
            var startRow = 0;
            var endRow = 0;
            if (req.Predicate != null)
            {
                tempQuery = req.Predicate.ConvertToString();
                startRow = req.Predicate.StartRow;
                endRow = req.Predicate.EndRow;
            }
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                string storeproc = string.Format("[dbo].[usp{0}GetListNew]", req.ContactType);
                await conn.OpenAsync();
                var dynparam = new
                {
                    Query = tempQuery
                };
                var rawResult = await conn.QueryAsync<ContactDTO>(storeproc, dynparam, null, null, CommandType.StoredProcedure);
                resp.Total = rawResult != null && rawResult.Any() ? rawResult.Count() : 0;
                if (startRow >= 0 && endRow >= 0)
                {
                    resp.Result = rawResult.ToList().Skip(startRow).Take(endRow - startRow).ToList();
                }
                else
                {
                    resp.Result = rawResult.ToList();
                }
            }
            return resp;
        }

        public  Task<ContactDTO> GetContactByContactNameAsync(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<ContactGetByIdResponse> GetContactByIdAsync(ContactGetByIdRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new ContactGetByIdResponse();
                string storeproc = string.Format("[dbo].[usp{0}GetById_New]", req.ContactType);
                await conn.OpenAsync();
                var dynParm = new
                {
                    ID = req.Id
                };
                var rawResult = await conn.QueryAsync<ContactDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                if (rawResult != null)
                {
                    result.Data = rawResult.FirstOrDefault();
                    result.Data.ContactType = req.ContactType;
                }
                
                return result;
            }
        }

        public async Task<ContactUpdateResponse> UpdateContactAsync(ContactUpdateRequest req)
        {
            using (var conn = new SqlConnection(_connectionSettings.DefaultConnection))
            {
                var result = new ContactUpdateResponse();
                string storeproc = string.Format("[dbo].[usp{0}Update_New]", req.ContactType);
                await conn.OpenAsync();
                var dynParm = new
                {
                    req.Contact.Id,
                    req.Contact.Address,
                    req.Contact.City,
                    req.Contact.ContactName,
                    req.Contact.Name,
                    req.Contact.Phone,
                    req.Contact.State,
                    req.Contact.Zip,
                    req.Contact.UpdatedBy,
                    req.Contact.UpdatedDate
                };
                var rawResult = await conn.QueryAsync<ContactDTO>(storeproc, dynParm, null, null, CommandType.StoredProcedure);
                if (rawResult != null)
                {
                    result.Data = rawResult.FirstOrDefault();
                    result.Data.ContactType = req.ContactType;
                }
                

                return result;
            }
        }
    }
}
