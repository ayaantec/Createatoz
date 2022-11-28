using System.Threading.Tasks;
using DD.Core.DataModel;

namespace DD.Core.Interface.Services
{
    public interface IFileDownloadService
    {
        Task<S3File> GetS3File(string bucket, string key);
        Task<bool> Exists(string bucket, string key);
    }
}