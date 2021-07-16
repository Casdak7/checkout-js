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
    public storeHash: string;

    /**
     *
     * @param {any} payment The payment selected on checkout
     * @param {any} data The bigcommerce CheckoutService data
     * @param {any} response The response from create payment
     */
    constructor(payment: any = {}, data: any = {}, response: any = {}, links: any = {}, checkoutId: string = '', storeHash: string = '') {
        this.payment = payment;
        this.data = data;
        this.response = response;
        this.links = links;
        this.checkoutId = checkoutId;
        this.storeHash = storeHash;
    }

    public fetchCustomPaymentMethods(storeProfile: any){
        return fetch("https://bc-custom-payment.herokuapp.com/admin/payment-methods/get-all/" + storeProfile.storeHash)
        .then(res => res.json());
    }

    public handlePayment(){

        return this.createPayment(this.payment, this.links, this.checkoutId, this.storeHash);
    }

    /**
     * Send a POST request to the app to create the Payment.
     */
    private createPayment(payment: any, links: any, checkoutId: string, storeHash: string){
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                payment_method_config_id: payment.customMethodId,
                checkoutId: checkoutId,
                links: {
                    success: links.success,
                    pending: links.pending,
                    failure: links.failure,
                }
            })
        };

        return fetch("https://bc-custom-payment.herokuapp.com/admin/payments/" + storeHash, requestOptions)
        .then(response => response.json());
    }

    // /**
    //  * Method to handle the response received from the ajax call to the
    //  * App to create a payment.
    //  */
    public handleResponse(){

        console.log(`Processing ${this.response.paymentType} payment...`);

        switch(this.response.paymentType){
            case 'mercadopago':
                this.handleMercadoPago();
                break;
            default:
                console.log(`Sorry, not a payment type.`);
        }
    }

    private handleMercadoPago(){
        if(typeof this.response.redirectUrl !== 'undefined'){
            window.open(this.response.redirectUrl, '_blank');
        }
    }
}
