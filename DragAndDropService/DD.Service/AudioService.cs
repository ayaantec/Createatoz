using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Entity;
using DD.Core.Exceptions;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.Utilities;
using DD.Core.ViewModel;

namespace DD.Service
{
    public class AudioService:BaseService<Audio>,IAudioService
    {
        private readonly IFileUploadService _fileUploadService;
        private readonly IAudioRepository _audioRepository;
        private readonly IAudioUserMapRepository _audioUserMapRepository;
        private readonly IPriceRepository _priceRepository;
        private readonly IPurchaseService _purchaseService;
        private readonly IFolderService _folderService;
        public AudioService(IAudioRepository baseRepository, IFileUploadService fileUploadService, IFolderService folderService,
                IPriceRepository priceRepository, IPurchaseService purchaseService, IAudioUserMapRepository audioUserMapRepository) : base(baseRepository)
        {
            _audioRepository = baseRepository;
            _fileUploadService = fileUploadService;
            _priceRepository = priceRepository;
            _purchaseService = purchaseService;
            _audioUserMapRepository = audioUserMapRepository;
            _folderService = folderService;
        }

        public async Task<Audio> createAudio(CreateAudio data, User user)
        {
            string s3key = $"audio_{Guid.NewGuid().ToString()}_{data.audio.FileName}";
            Folder rootFolder =  await _folderService.FindRootFolder(user);
            Audio audio = new Audio()
            {
                Name = data.Name,
                S3Key = s3key,
                CostType = data.CostType,
                FolderId = data.FolderId ?? rootFolder.Id,
            };
            await _audioRepository.Insert(audio);
            AudioUserMap audioUserMap = new AudioUserMap
            {
                AudioId = audio.Id,
                UserId = user.Id,
                IsOwner = true
            };
            audio.Users = new List<AudioUserMap>() { audioUserMap };
            List<AudioTagMap> audioTagMaps = new List<AudioTagMap>();
            if(data.Tags != null) { 
                foreach(long tagId in data.Tags)
                {
                    AudioTagMap audioTagMap = new AudioTagMap()
                    {
                        AudioId = audio.Id,
                        TagId = tagId
                    };
                    audioTagMaps.Add(audioTagMap);
                }
             
                audio.Tags = audioTagMaps;
            }

            if (data.CostType != CostType.Free)
            {
                if (data.Prices == null) throw new CustomException("Price must have some value if not free content");
                List<Price> prices = new List<Price>();
                foreach (var str in data.Prices)
                {
                    var strSplits = str.Split(":");
                    if (strSplits.Length != 2) throw new CustomException("Price formate should be <CurrencyId>:<Value>");
                    Price price = new Price()
                    {
                        CurrencyId = long.Parse(strSplits[0]),
                        Value = decimal.Parse(strSplits[1]),
                        AudioId = audio.Id
                    };
                    await _priceRepository.InsertOrUpdate(price);
                    prices.Add(price);
                }
                audio.Prices = prices;

            }
            await _audioRepository.Update(audio);
            await _fileUploadService.UploadAsync(s3key, data.audio);
            return audio;
        }

        public async Task<Audio> FindAudioById(long id)
        {
            return await _audioRepository.FindAudioById(id);
        }

        public Task<List<Audio>> getAllAudio()
        {
            return _audioRepository.GetAllAudios();
        }

        public async Task<string> Purchase(PurchaseAudio payload, User user)
        {
            Audio audio = await _audioRepository.FindAudioById(payload.AudioId);
            AudioUserMap audioUserMap = audio.Users.Where(x => x.UserId == user.Id).FirstOrDefault();
            bool alreadyShared = false;
            if (audioUserMap is null)
            {
                audioUserMap = new AudioUserMap()
                {
                    AudioId = payload.AudioId,
                    UserId = user.Id
                };
            }
            else alreadyShared = true;
            audioUserMap.HasPurchased = true;
            if (alreadyShared) await _audioUserMapRepository.Update(audioUserMap);
            else await _audioUserMapRepository.Insert(audioUserMap);
            return "";
        }

        public async Task<List<Audio>> Search(string keyword)
        {
            return await _audioRepository.Search(keyword);
        }
    }
}