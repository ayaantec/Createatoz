using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core;
using DD.Core.config;
using DD.Core.Entity;
using DD.Core.Exceptions;
using DD.Core.Interface.Repositories;
using DD.Core.Interface.Services;
using DD.Core.Models;
using DD.Core.Utilities;
using DD.Core.ViewModel;
using Stripe;
using Stripe.Checkout;

namespace DD.Service
{
    public class PurchaseService : IPurchaseService
    {
        private const string PaymentMode_Subscription = "subscription";
        private const string PaymentMode_Payment = "payment";

        public PurchaseService() 
        {

        }

        public string Charge(ChargeOptions chargeOptions)
        {

            var customers = new CustomerService();
            Customer customer;
            CustomerListOptions options = new CustomerListOptions
            {
                Email = chargeOptions.email
            };
            var customerList =  customers.List(options);
            customer = customerList.Data.Where(x => x.Email == chargeOptions.email).FirstOrDefault();
            if(customer is null)
            {
                customer = customers.Create(new CustomerCreateOptions
                {
                    Email = chargeOptions.email,
                    Source = chargeOptions.stripeToken,
                });
            }           
            var charges = new ChargeService();
            ChargeCreateOptions chargeCreateOptions = new ChargeCreateOptions
            {
                Amount = chargeOptions.amount,
                Description = chargeOptions.description,
                Currency = "usd",
                Customer = customer.Id,
                ReceiptEmail = chargeOptions.email,
                Metadata = chargeOptions.metada
            };

            Charge charge;
            try {
                charge = charges.Create(chargeCreateOptions); 
            }catch(Exception e)
            {
                throw new CustomException("Exception when charge create:" + e.Message);
            }
            if (charge.Status == "succeeded")
            {
                return charge.BalanceTransactionId;
            }
            throw new CustomException("Exception when charge:"+ charge.Status);
        }
        public async Task<string> CreateSessionForPackagePurchase(ConstPackages package, Guid userId,long currencyId,string priceId)
        {
            
            var metadata = new Dictionary<string, string>
            {
                { PurchaseMetaDataKey.userId.ToString(), userId.ToString() },
                { PurchaseMetaDataKey.packageId.ToString(), ((long)package).ToString() },
                { PurchaseMetaDataKey.purchaseType.ToString(), PurchaseType.Recurring.ToString() },
                { PurchaseMetaDataKey.currencyId.ToString(), currencyId.ToString() },
            };
            //string priceId = PackageInfo.PackagePriceIds[package];
            if (priceId is null)
            {
                throw new CustomException("The plan does not exist!");
            }
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> {"card" },
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        Price = priceId,
                        Quantity = 1,
                    },
                },
                Mode = PaymentMode_Subscription,
                SuccessUrl = GetPaymentSuccessUrl(),
                CancelUrl = GetPaymentCancelUrl(),
                Metadata = metadata,
            };
            string sessionId = await CreateSession(options);
            return sessionId;

        }

        public async Task<string> CreateNewPriceForPlane(ConstPackages package,long priceValue,string packageStripeId)
        {
            var options = new PriceCreateOptions
            {
                Currency = "usd",
                Recurring = new PriceRecurringOptions
                {
                    Interval = "month",
                },
                Product = packageStripeId,
                Nickname = PackageInfo.PackageStripeNames[package],
                UnitAmount = priceValue,
            };
            var service = new PriceService();
            var price = service.Create(options);
            await UpdateAllSubctions(price.Id);
            return price.Id;
        }

        private async Task UpdateAllSubctions(string newPriceId)
        {
            var service = new SubscriptionService();
            var subs = (await service.ListAsync()).ToList();
            foreach (var subsciption in subs)
            {
                List<SubscriptionItemOptions> items = new List<SubscriptionItemOptions>();
                var subscriptionId = subsciption.Id;
                var subscriptionDetails = service.Get(subscriptionId);

                var subOptions = new SubscriptionItemOptions
                {
                    Id = subscriptionDetails.Items.Data[0].Id,
                    Price = newPriceId,
                };
                items.Add(subOptions);
                var options = new SubscriptionUpdateOptions
                {
                    CancelAtPeriodEnd = false,
                    ProrationBehavior = "create_prorations",
                    Items = items,
                };
                try {
                    service.Update(subscriptionId, options);
                }catch(Exception e)
                {
                    throw new CustomException("Exception on update subscriptions:"+e.Message);
                }
            }            
        }

        public async Task<string> CreateSessionOneTime(OneTimeSessionOptions oneTimeSessionOptions)
        {
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            Currency =  "usd",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = oneTimeSessionOptions.ProductName
                            },
                            UnitAmount = oneTimeSessionOptions.Price,
                        },
                        Quantity = 1,
                    },
                },
                Mode = PaymentMode_Payment,
                SuccessUrl = GetOnetimePaymentSuccessUrl(oneTimeSessionOptions.MetaData[PurchaseMetaDataKey.s3Key.ToString()]),
                CancelUrl = GetPaymentCancelUrl(),
                Metadata = oneTimeSessionOptions.MetaData,
            };
            string sessionId = await CreateSession(options);
            return sessionId;
        }

        private async Task<string> CreateSession(SessionCreateOptions options)
        {
            var sessionService = new SessionService();
            var session = await sessionService.CreateAsync(options);
            return session.Id;
        }

        private string GetOnetimePaymentSuccessUrl(string s3key)
        {
            return ClientAppSettings.BaseUrl + "/" + StripeSettings.PaymentSuccessUrl+"?bucket="+ApplicationSettings.AWSBucketName+"&key="+s3key;
        }


        private string GetPaymentSuccessUrl()
        {
            return ClientAppSettings.BaseUrl +"/"+ StripeSettings.PaymentSuccessUrl;
        }

        private string GetPaymentCancelUrl()
        {
            return ClientAppSettings.BaseUrl +"/" + StripeSettings.PaymentCancelUrl;
        }
    }
}