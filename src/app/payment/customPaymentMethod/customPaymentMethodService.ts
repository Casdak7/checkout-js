/**
 * Handles the necessary process for each of the different types
 * of custom payment methods existing on the App.
 */
export default class CustomPaymentMethodService {

    public payment: any;
    public data: any;
    public response: any;

    /**
     *
     * @param {any} payment The payment selected on checkout
     * @param {any} data The bigcommerce CheckoutService data
     * @param {any} response The response from create payment
     */
    constructor(payment: any = {}, data: any = {}, response: any = {}) {
        this.payment = payment;
        this.data = data;
        this.response = response;
    }

    public fetchCustomPaymentMethods(storeProfile: any){
        return fetch("https://bc-custom-payment.herokuapp.com/admin/payment-methods/get-all/" + storeProfile.storeHash)
        .then(res => res.json());
    }

    public handlePayment(){
        console.log(
            "Links:",
            this.data.getConfig().links.orderConfirmationLink,
            this.data.getConfig().links.checkoutLink,
            this.data.getConfig().links.cartLink,
            this.data.getConfig().links.siteLink,
        );

        return this.createPayment(this.payment, this.data);

        // return new Promise((resolve, reject) => {
        //     this.createPayment(this.payment, this.data)
        //     .then(() => {
        //         this.handleResponse();
        //         resolve();
        //     })
        //     .catch((err) => {
        //         reject(err);
        //     });
        // });
    }

    /**
     * Send a POST request to the app to create the Payment.
     */
    private createPayment(payment: any, data: any){
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                order_id: data.getOrder().orderId,
                payment_method_config_id: payment.customMethodId,
                items: data.getOrder().lineItems,
                links: {
                    success: data.getConfig().links.orderConfirmationLink,
                    pending: data.getConfig().links.orderConfirmationLink,
                    failure: data.getConfig().links.orderConfirmationLink,
                }
            })
        };

        return fetch("https://bc-custom-payment.herokuapp.com/admin/payments/" + data.getConfig().storeProfile.storeHash, requestOptions)
        .then(response => response.json());

        // return new Promise((resolve, reject) => {
        //     fetch("https://bc-custom-payment.herokuapp.com/admin/payments/" + data.getConfig().storeProfile.storeHash, requestOptions)
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log('Return create payment: ', data);

        //             this.response = data;
        //             resolve();

        //             // if(typeof data.redirectUrl !== 'undefined'){
        //             //     window.open(data.redirectUrl, '_blank');
        //             //     resolve()
        //             // }
        //         })
        //         .catch(err => reject(err))
        // })
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
