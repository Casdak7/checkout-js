/**
 * Handles the necessary process for each of the different types
 * of custom payment methods existing on the App.
 */
export default class CustomPaymentMethodService {

    public payment: any;
    public data: any;
    public response: any;
    public links: any;
    public checkoutId: string;

    // /**
    //  *
    //  * @param {any} payment The payment selected on checkout
    //  * @param {any} data The bigcommerce CheckoutService data
    //  * @param {any} response The response from create payment
    //  */
    // constructor(payment, data, response = '') {
    //     this.payment = payment;
    //     this.data = data;
    //     this.response = response;
    // }

    public fetchCustomPaymentMethods(storeProfile: any): any;

    public handlePayment(): any;

    // /**
    //  * Send a POST request to the app to create the Payment.
    //  */
    private createPayment(payment: any, links: any, checkoutId: string): any;

    // /**
    //  * Method to handle the response received from the ajax call to the
    //  * App to create a payment.
    //  */
    public handleResponse(): any;

    private handleMercadoPago(): any;
}
