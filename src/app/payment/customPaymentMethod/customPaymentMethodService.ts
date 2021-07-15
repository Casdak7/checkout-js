/**
 * Handles the necessary process for each of the different types
 * of custom payment methods existing on the App.
 */
export default class CustomPaymentMethodService {

    payment: object;
    data: object;
    public response: object;

    /**
     *
     * @param {object} payment The payment selected on checkout
     * @param {object} data The bigcommerce CheckoutService data
     * @param {object} response The response from create payment
     */
    constructor(payment: object = {}, data: object = {}, response: object = {}) {
        this.payment = payment;
        this.data = data;
        this.response = response;
    }

    public fetchCustomPaymentMethods(storeProfile: any){
        return fetch("https://bc-custom-payment.herokuapp.com/admin/payment-methods/get-all/" + storeProfile.storeHash)
        .then(res => res.json())
        // .then(
        //     (result) => {
        //         console.log(result);
        //         this.response = result;
        //     },
        //     // Deal with error here so catch doesn't break component
        //     (error) => {
        //         console.log(error);
        //     }
        // )
    }

    // handlePayment(){
    //     console.log(
    //         "Links:",
    //         this.data.getConfig().links.orderConfirmationLink,
    //         this.data.getConfig().links.checkoutLink,
    //         this.data.getConfig().links.cartLink,
    //         this.data.getConfig().links.siteLink,
    //     );

    //     return new Promise((resolve, reject) => {
    //         this.createPayment(this.payment, this.data)
    //         .then(() => {
    //             this.handleResponse();
    //             resolve();
    //         })
    //         .catch((err) => {
    //             reject(err);
    //         });
    //     });
    // }

    // /**
    //  * Send a POST request to the app to create the Payment.
    //  */
    // createPayment(payment, data){
    //     // Simple POST request with a JSON body using fetch
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             order_id: data.getOrder().orderId,
    //             payment_method_config_id: payment.customMethodId,
    //             items: data.getOrder().lineItems,
    //             links: {
    //                 success: data.getConfig().links.orderConfirmationLink,
    //                 pending: data.getConfig().links.orderConfirmationLink,
    //                 failure: data.getConfig().links.orderConfirmationLink,
    //             }
    //         })
    //     };
    //     return new Promise((resolve, reject) => {
    //         fetch("https://bc-custom-payment.herokuapp.com/admin/payments/" + data.getConfig().storeProfile.storeHash, requestOptions)
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log('Return create payment: ', data);

    //                 this.response = data;
    //                 resolve();

    //                 // if(typeof data.redirectUrl !== 'undefined'){
    //                 //     window.open(data.redirectUrl, '_blank');
    //                 //     resolve()
    //                 // }
    //             })
    //             .catch(err => reject(err))
    //     })
    // }

    // /**
    //  * Method to handle the response received from the ajax call to the
    //  * App to create a payment.
    //  */
    // handleResponse(){

    //     console.log(`Processing ${this.response.paymentType} payment...`);

    //     switch(this.response.paymentType){
    //         case 'mercadopago':
    //             this.handleMercadoPago();
    //             break;
    //         default:
    //             console.log(`Sorry, not a payment type.`);
    //     }
    // }

    // handleMercadoPago(){
    //     if(typeof this.response.redirectUrl !== 'undefined'){
    //         window.open(this.response.redirectUrl, '_blank');
    //     }
    // }
}
