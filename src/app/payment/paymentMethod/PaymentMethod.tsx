import { CheckoutSelectors, CustomerInitializeOptions, CustomerRequestOptions, PaymentInitializeOptions, PaymentMethod, PaymentRequestOptions } from '@bigcommerce/checkout-sdk';
import React, { memo, FunctionComponent } from 'react';

import { withCheckout, CheckoutContextProps } from '../../checkout';

import getUniquePaymentMethodId from './getUniquePaymentMethodId';
import AdyenV2PaymentMethod from './AdyenV2PaymentMethod';
import AffirmPaymentMethod from './AffirmPaymentMethod';
import AmazonPaymentMethod from './AmazonPaymentMethod';
import AmazonPayV2PaymentMethod from './AmazonPayV2PaymentMethod';
import BarclaycardPaymentMethod from './BarclaycardPaymentMethod';
import BlueSnapV2PaymentMethod from './BlueSnapV2PaymentMethod';
import BoltPaymentMethod from './BoltPaymentMethod';
import BraintreeCreditCardPaymentMethod from './BraintreeCreditCardPaymentMethod';
import ChasePayPaymentMethod from './ChasePayPaymentMethod';
import CheckoutCustomPaymentMethod from './CheckoutcomCustomPaymentMethod';
import CCAvenueMarsPaymentMethod from './CCAvenueMarsPaymentMethod';
import DigitalRiverPaymentMethod from './DigitalRiverPaymentMethod';
import GooglePayPaymentMethod from './GooglePayPaymentMethod';
import HostedCreditCardPaymentMethod from './HostedCreditCardPaymentMethod';
import HostedPaymentMethod from './HostedPaymentMethod';
import KlarnaPaymentMethod from './KlarnaPaymentMethod';
import KlarnaV2PaymentMethod from './KlarnaV2PaymentMethod';
import MasterpassPaymentMethod from './MasterpassPaymentMethod';
import MolliePaymentMethod from './MolliePaymentMethod';
import MonerisPaymentMethod from './MonerisPaymentMethod';
import OfflinePaymentMethod from './OfflinePaymentMethod';
import PaymentMethodId from './PaymentMethodId';
import PaymentMethodProviderType from './PaymentMethodProviderType';
import PaymentMethodType from './PaymentMethodType';
import PaypalCommerceCreditCardPaymentMethod from './PaypalCommerceCreditCardPaymentMethod';
import PaypalCommercePaymentMethod from './PaypalCommercePaymentMethod';
import PaypalExpressPaymentMethod from './PaypalExpressPaymentMethod';
import PaypalPaymentsProPaymentMethod from './PaypalPaymentsProPaymentMethod';
import PPSDKPaymentMethod from './PPSDKPaymentMethod';
import SquarePaymentMethod from './SquarePaymentMethod';
import StripePaymentMethod from './StripePaymentMethod';
import VisaCheckoutPaymentMethod from './VisaCheckoutPaymentMethod';

import AppCustomPaymentMethod from './AppCustomPaymentMethod';
export interface PaymentMethodProps {
    method: PaymentMethod | any;
    isEmbedded?: boolean;
    isUsingMultiShipping?: boolean;
    onUnhandledError?(error: Error): void;
    submitForm?(): void;
}

export interface WithCheckoutPaymentMethodProps {
    isPpsdkEnabled: boolean;
    isInitializing: boolean;
    deinitializeCustomer(options: CustomerRequestOptions): Promise<CheckoutSelectors>;
    deinitializePayment(options: PaymentRequestOptions): Promise<CheckoutSelectors>;
    initializeCustomer(options: CustomerInitializeOptions): Promise<CheckoutSelectors>;
    initializePayment(options: PaymentInitializeOptions): Promise<CheckoutSelectors>;
}

/**
 * If possible, try to avoid having components that are specific to a specific
 * payment provider or method. Instead, try to generalise the requirements and
 * use components that can are reusable for multiple payment methods. i.e.:
 * CreditCardPaymentMethod, HostedPaymentMethod etc... If it is really necessary
 * for a particular payment method, you may write a method-specific component for
 * the purpose of configuring a general-purpose component in order to fulfill
 * its specific product or technical requirements.
 */
// tslint:disable:cyclomatic-complexity
const PaymentMethodComponent: FunctionComponent<PaymentMethodProps & WithCheckoutPaymentMethodProps> = props => {
    const { method, isPpsdkEnabled } = props;

    if (isPpsdkEnabled && method.type === PaymentMethodProviderType.PPSDK) {
        return <PPSDKPaymentMethod { ...props } />;
    }

    if (method.gateway === PaymentMethodId.AdyenV2) {
        return <AdyenV2PaymentMethod { ...props } />;
    }

    if (method.id === PaymentMethodId.SquareV2) {
        return <SquarePaymentMethod { ...props } />;
    }

    if (method.gateway === PaymentMethodId.StripeV3) {
        return <StripePaymentMethod { ...props } />;
    }

    if (method.id === PaymentMethodId.Amazon) {
        return <AmazonPaymentMethod { ...props } />;
    }

    if (method.id === PaymentMethodId.AmazonPay) {
        return <AmazonPayV2PaymentMethod { ...props } />;
    }

    if (method.id === PaymentMethodId.Affirm) {
        return <AffirmPaymentMethod { ...props } />;
    }

    if (method.gateway === PaymentMethodId.BlueSnapV2) {
        return <BlueSnapV2PaymentMethod { ...props } />;
    }

    if (method.id === PaymentMethodId.DigitalRiver) {
        return <DigitalRiverPaymentMethod { ...props } />;
    }

    if (method.gateway === PaymentMethodId.Klarna) {
        return <KlarnaV2PaymentMethod { ...props } />;
    }

    if (method.id === PaymentMethodId.Klarna) {
        return <KlarnaPaymentMethod { ...props } />;
    }

    if (method.id === PaymentMethodId.CCAvenueMars) {
        return <CCAvenueMarsPaymentMethod { ...props } />;
    }

    if (method.id === PaymentMethodId.ChasePay) {
        return <ChasePayPaymentMethod { ...props } />;
    }

    if (method.gateway === PaymentMethodId.Checkoutcom) {
        if (method.id === 'credit_card') {
            return <HostedCreditCardPaymentMethod { ...props } />;
        }

        if (method.id === PaymentMethodId.Boleto ||
            method.id === PaymentMethodId.Ideal ||
            method.id === PaymentMethodId.Fawry ||
            method.id === PaymentMethodId.Oxxo ||
            method.id === PaymentMethodId.Qpay ||
            method.id === PaymentMethodId.Sepa
            ) {
            return <CheckoutCustomPaymentMethod checkoutCustomMethod={ method.id } { ...props } />;
        }

        return <HostedPaymentMethod { ...props } />;
    }

    if (method.id === PaymentMethodId.BraintreeVisaCheckout) {
        return <VisaCheckoutPaymentMethod { ...props } />;
    }

    if (method.id === PaymentMethodId.AdyenV2GooglePay ||
        method.id === PaymentMethodId.AuthorizeNetGooglePay ||
        method.id === PaymentMethodId.BraintreeGooglePay ||
        method.id === PaymentMethodId.CheckoutcomGooglePay ||
        method.id === PaymentMethodId.CybersourceV2GooglePay ||
        method.id === PaymentMethodId.OrbitalGooglePay ||
        method.id === PaymentMethodId.StripeGooglePay) {
        return <GooglePayPaymentMethod { ...props } />;
    }

    if (method.id === PaymentMethodId.Masterpass) {
        return <MasterpassPaymentMethod { ...props } />;
    }

    if (method.id === PaymentMethodId.Braintree) {
        return <BraintreeCreditCardPaymentMethod { ...props } />;
    }

    if (method.id === PaymentMethodId.PaypalCommerceCreditCards) {
        return <PaypalCommerceCreditCardPaymentMethod { ...props } />;
    }

    if (method.id === PaymentMethodId.PaypalCommerce ||
        method.id === PaymentMethodId.PaypalCommerceCredit ||
        method.gateway === PaymentMethodId.PaypalCommerceAlternativeMethod) {
        return <PaypalCommercePaymentMethod
            { ...props }
            isAPM={ method.gateway === PaymentMethodId.PaypalCommerceAlternativeMethod }
            uniqueId={ getUniquePaymentMethodId(method.id, method.gateway) }
        />;
    }

    if (method.id === PaymentMethodId.PaypalExpress) {
        return <PaypalExpressPaymentMethod { ...props } />;
    }

    if (method.type !== PaymentMethodProviderType.Hosted &&
        method.id === PaymentMethodId.PaypalPaymentsPro) {
        return <PaypalPaymentsProPaymentMethod { ...props } />;
    }

    if (method.gateway === PaymentMethodId.Barclaycard) {
        return <BarclaycardPaymentMethod { ...props } />;
    }

    if (method.id === PaymentMethodId.Bolt) {
        return <BoltPaymentMethod { ...props } />;
    }

    if (method.id === PaymentMethodId.Moneris) {
        return <MonerisPaymentMethod { ...props } />;
    }

    if (method.gateway === PaymentMethodId.Afterpay ||
        method.gateway === PaymentMethodId.Clearpay ||
        method.id === PaymentMethodId.Laybuy ||
        method.id === PaymentMethodId.Quadpay ||
        method.id === PaymentMethodId.Sezzle ||
        method.id === PaymentMethodId.Zip ||
        method.method === PaymentMethodType.Paypal ||
        method.method === PaymentMethodType.PaypalCredit ||
        method.type === PaymentMethodProviderType.Hosted) {
        return <HostedPaymentMethod { ...props } />;
    }

    console.log('made it this far', method.type );

    //BC_APP TODO: Create a .tsx component for handling the app's custom payments
    if (typeof method.customId !== 'undefined') {
        console.log('In custom payment');
        return <AppCustomPaymentMethod { ...props } />;
    }

    if (method.type === PaymentMethodProviderType.Offline) {
        console.log('made it this far too');
        return <OfflinePaymentMethod { ...props } />;
    }

    if (method.gateway === PaymentMethodId.Mollie) {
        return <MolliePaymentMethod { ...props } />;
    }
    // NOTE: Some payment methods have `method` as `credit-card` but they are
    // actually not. Therefore, as a workaround, we are doing the following
    // check last.
    if (method.method === PaymentMethodType.CreditCard ||
        method.type === PaymentMethodProviderType.Api) {
        return <HostedCreditCardPaymentMethod { ...props } />;
    }

    return null;
};

function mapToWithCheckoutPaymentMethodProps(
    { checkoutService, checkoutState }: CheckoutContextProps,
    { method }: PaymentMethodProps
): WithCheckoutPaymentMethodProps {
    const {
        statuses: { isInitializingPayment },
    } = checkoutState;

    const isPpsdkEnabled = Boolean(
        checkoutService.getState()
            .data.getConfig()
            ?.checkoutSettings.features['PAYMENTS-6806.enable_ppsdk_strategy']
    );

    return {
        deinitializeCustomer: checkoutService.deinitializeCustomer,
        deinitializePayment: checkoutService.deinitializePayment,
        initializeCustomer: checkoutService.initializeCustomer,
        initializePayment: checkoutService.initializePayment,
        isInitializing: isInitializingPayment(method.id),
        isPpsdkEnabled,
    };
}

export default withCheckout(mapToWithCheckoutPaymentMethodProps)(memo(PaymentMethodComponent));
