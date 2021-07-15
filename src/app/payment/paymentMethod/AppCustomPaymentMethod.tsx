import { CheckoutSelectors, PaymentInitializeOptions, PaymentMethod, PaymentRequestOptions } from '@bigcommerce/checkout-sdk';
import { noop } from 'lodash';
import { Component, ReactNode } from 'react';

//import CustomPaymentMethodService from '../customPaymentMethod/customPaymentMethodService';

export interface AppCustomPaymentMethodProps {
    method: PaymentMethod | any;
    deinitializePayment(options: PaymentRequestOptions): Promise<CheckoutSelectors>;
    initializePayment(options: PaymentInitializeOptions): Promise<CheckoutSelectors>;
    onUnhandledError?(error: Error): void;
}

export default class AppCustomPaymentMethod extends Component<AppCustomPaymentMethodProps> {
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
            }).then(() => {console.log('Custom State: ', this.state)});
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

        // Parse to remove customPaymentMethod gateway that comes from the App and reset it
        var parsedGateway = typeof method.customId === 'undefined' ? method.gateway : null;

        try {
            await deinitializePayment({
                gatewayId: parsedGateway,
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
