using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using DD.Core;
using DD.Core.Entity;
using DD.Core.Interface.Services;
using DD.Core.ResponseModels;
using DD.Core.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        UserManager<User> _userManager;
        ITemplateService _templateService;
        IImageService _imageService;
        IFontService _fontService;
        IAudioService _audioService;
        IVideoService _videoService;
        IElementService _elementService;
        public PaymentController(UserManager<User> userManager, ITemplateService templateService, IImageService imageService, 
            IFontService fontService, IAudioService audioService, IVideoService videoService, IElementService elementService)
        {
            _userManager = userManager;
            _templateService = templateService;
            _imageService = imageService;
            _imageService = imageService;
            _fontService = fontService;
            _audioService = audioService;
            _audioService = audioService;
            _videoService = videoService;
            _elementService = elementService;
        }

        [HttpPost]
        [Route("StripeWebHook")]
        public async Task<IActionResult> StripeWebHook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            try
            {
                var stripeEvent = EventUtility.ParseEvent(json);
                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    Session session = (Session)stripeEvent.Data.Object;
                    session.Metadata.TryGetValue(PurchaseMetaDataKey.userId.ToString(), out string UserIdD);
                    session.Metadata.TryGetValue(PurchaseMetaDataKey.purchaseType.ToString(), out string PurchaseTypeD);
                    session.Metadata.TryGetValue(PurchaseMetaDataKey.currencyId.ToString(), out string CurrencyId);
                    var ReferenceId = session.ClientReferenceId;
                    var sessionId = session.Id;
                    var paymentIntentId = session.PaymentIntentId;
                    long currencyIdLong = long.Parse(CurrencyId);
                    bool isPackagePurchase = session.Metadata.TryGetValue(PurchaseMetaDataKey.packageId.ToString(), out string planId);

                    //var userId = long.Parse(UserIdD);
                    
                    if (isPackagePurchase)
                    {
                        //session.Metadata.TryGetValue(PurchaseMetaDataKey.packageId.ToString(), out string planId);
                        var planIdValue = long.Parse(planId);
                        var subscriptionId = session.SubscriptionId;
                        await PurchaseRecurring(session.Metadata, UserIdD);
                        //await _subscriptionService.UpdateOrCreate(userId, planIdValue, subscriptionId);

                    }
                    else
                    {
                        await PurchaseOneTime(session.Metadata, currencyIdLong, UserIdD);
                        //session.Metadata.TryGetValue("BookId", out string bookId);
                        //var bookIdValue = long.Parse(bookId);
                        //await _bookService.Purchase(userId, bookIdValue);
                    }
                }
                else
                {
                    HandleOtherEvents(stripeEvent);
                }
                return Ok();
            }
            catch (StripeException e)
            {
                return BadRequest();
            }            
        }        

        private async Task PurchaseOneTime(Dictionary<string,string> metadata, long currencyId,string userId)
        {
            User user = await _userManager.FindByIdAsync(userId);
            if (metadata.TryGetValue(PurchaseMetaDataKey.templateId.ToString(), out string templateId))
            {
                PurchaseTemplate puchaseTemplate = new PurchaseTemplate()
                {
                    CurrencyId = currencyId,
                    MetaData = metadata,
                    TemplateId = long.Parse(templateId)
                };

                await _templateService.Purchase(puchaseTemplate, user);
            }
            else if(metadata.TryGetValue(PurchaseMetaDataKey.imageId.ToString(), out string imageId))
            {
                PurchaseImage puchaseImage = new PurchaseImage()
                {
                    CurrencyId = currencyId,
                    MetaData = metadata,
                    ImageId = long.Parse(imageId)
                };

                await _imageService.Purchase(puchaseImage, user);
            }
            else if (metadata.TryGetValue(PurchaseMetaDataKey.fontId.ToString(), out string fontId))
            {
                PurchaseFont purchaseFont = new PurchaseFont()
                {
                    CurrencyId = currencyId,
                    MetaData = metadata,
                    FontId = long.Parse(fontId)
                };

                await _fontService.Purchase(purchaseFont, user);
            }
            else if (metadata.TryGetValue(PurchaseMetaDataKey.audioId.ToString(), out string audioId))
            {
                PurchaseAudio purchaseFont = new PurchaseAudio()
                {
                    CurrencyId = currencyId,
                    MetaData = metadata,
                    AudioId = long.Parse(audioId)
                };

                await _audioService.Purchase(purchaseFont, user);
            }
            else if (metadata.TryGetValue(PurchaseMetaDataKey.videoId.ToString(), out string videoId))
            {
                PurchaseVideo purchaseVideo = new PurchaseVideo()
                {
                    CurrencyId = currencyId,
                    MetaData = metadata,
                    VideoId = long.Parse(videoId)
                };

                
                await _videoService.Purchase(purchaseVideo, user);
            }
            else if (metadata.TryGetValue(PurchaseMetaDataKey.elementId.ToString(), out string elementId))
            {
                PurchaseElement purchaseElement = new PurchaseElement()
                {
                    CurrencyId = currencyId,
                    MetaData = metadata,
                    ElementId = long.Parse(elementId)
                };

                await _elementService.Purchase(purchaseElement, user);
            }
        }

        private async Task PurchaseRecurring(Dictionary<string, string> metadata, string userId)
        {
            //var lastmonth = DateTime.Today.AddMonths(-1);
            User user = await _userManager.FindByIdAsync(userId);
            var nextMonth = DateTime.Today.AddMonths(1);
            user.PackageExpirationDate = nextMonth.ToString("o");
            var packageId = metadata[PurchaseMetaDataKey.packageId.ToString()];
            ConstPackages package = (ConstPackages)long.Parse(packageId);
            user.Package = package;
            await _userManager.UpdateAsync(user);
        }

        private void HandleOtherEvents(Event stripeEvent)
        {
            // Handle the event
            switch (stripeEvent.Type)
            {
                case Events.PaymentIntentSucceeded:
                    var paymentIntent = stripeEvent.Data.Object as Session;
                    // Then define and call a method to handle the successful payment intent.
                    // handlePaymentIntentSucceeded(paymentIntent);
                    break;

                case Events.PaymentMethodAttached:
                    var paymentMethod = stripeEvent.Data.Object as Session;
                    // Then define and call a method to handle the successful attachment of a PaymentMethod.
                    // handlePaymentMethodAttached(paymentMethod);
                    break;

                case Events.ChargeExpired:
                    var chargeExp = stripeEvent.Data.Object as Session;
                    //_logger.Information("Charge Expired");
                    break;

                case Events.ChargeFailed:
                    var chargeExp1 = stripeEvent.Data.Object as Session;
                    //_logger.Information("Charge Failed");
                    break;

                case Events.ChargePending:
                    var chargeExp2 = stripeEvent.Data.Object as Session;
                    //_logger.Information("Charge Pending");
                    break;

                case Events.ChargeCaptured:
                    var chargeExp4 = stripeEvent.Data.Object as Session;
                    //_logger.Information("Charge Captured");
                    break;

                case Events.ChargeSucceeded:
                    var chargeExp5 = stripeEvent.Data.Object as Session;
                    //_logger.Information("Charge Succeeded");
                    break;

                default:
                    // Unexpected event type
                    //_logger.Error("Error in Webhook Handling. ABORTING....");
                    break;
            }
        }



    }
}