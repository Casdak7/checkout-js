import { CheckoutSelectors, PaymentInitializeOptions, PaymentMethod, PaymentRequestOptions } from '@bigcommerce/checkout-sdk';
import { noop } from 'lodash';
import { Component, ReactNode } from 'react';

export interface OfflinePaymentMethodProps {
    method: PaymentMethod | any;
    deinitializePayment(options: PaymentRequestOptions): Promise<CheckoutSelectors>;
    initializePayment(options: PaymentInitializeOptions): Promise<CheckoutSelectors>;
    onUnhandledError?(error: Error): void;
}

export default class OfflinePaymentMethod extends Component<OfflinePaymentMethodProps> {
    async componentDidMount(): Promise<void> {
        const {
            initializePayment,
            method,
            onUnhandledError = noop,
        } = this.props;

        // Parse to remove customPaymentMethod gateway that comes from the App and reset it
        var parsedGateway = typeof method.customId === 'undefined' ? method.gateway : null;

        try {
            await initializePayment({
                gatewayId: parsedGateway,
                methodId: method.id,
            });
        } catch (error) {
            onUnhandledError(error);
        }
    }

    async componentWillUnmount(): Promise<void> {
        const {
            deinitializePayment,
            method,
            onUnhandledError = noop,
        } = this.props;

        try {
            await deinitializePayment({
                gatewayId: method.gateway,
                methodId: method.id,
            });
        } catch (error) {
            onUnhandledError(error);
        }
    }

    render(): ReactNode {
        return null;
    }
}
