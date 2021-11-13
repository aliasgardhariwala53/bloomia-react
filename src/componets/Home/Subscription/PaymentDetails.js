import React from "react";
import "./PaymentDetails.css";
import { Modal } from "react-bootstrap";
import { useSelector,useDispatch } from 'react-redux'
import { modalActions } from "../../../store/index";

const PaymentDetails = (props) => {
   const dispatch = useDispatch()
    const showPaymentForm = useSelector(state => state.modal.payment)
  return (
    <Modal className="modal-paymentDetails-container" show={showPaymentForm}>
      <Modal.Header className="p-0">
          <div className="w-100 pb-3 row m-0">
          <span className="h3 m-0  w-auto">Upgrade Your Plan</span>
          <span className="ml-auto w-auto round-bottons round-bottons-border bg-white round-bottons-sm">
            <i
              className="fas fa-times fa-sm"
              onClick={() => dispatch(modalActions.paymentModalHandler())}
            ></i>
          </span>
        </div>
      </Modal.Header>
      <Modal.Body className="modal-Payments-body p-0">
        <div className="w-100 p-4 bg-white rounded-xl ">
         
          <div className="w-100 ">

            <form className="subscriptionForm ">
              <div className="pb-2 border-bottom">
                <div className="h4 mb-2 mx-3">Personal Details</div>
                <div className="row m-0">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Firstname</label>
                      <input disabled="" name="" className="form-control" />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Lastname</label>
                      <input disabled="" name="" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="row m-0">
                  <div className="col-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input disabled="" name="" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-3 pb-2">
                <div className="h4 mb-2 mx-3">Card Details</div>
                <div className="row m-0">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Name on card</label>
                      <input
                        formcontrolname="nameOnCard"
                        name=""
                        className="form-control ng-untouched ng-pristine ng-invalid"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Zipcode</label>
                      <input
                        type="number"
                        formcontrolname="zipcode"
                        className="form-control ng-untouched ng-pristine ng-invalid"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-2 mb-3 border rounded-xl">
                      <div className="field StripeElement StripeElement--empty">
                        <div className="__PrivateStripeElement">
                          <iframe
                            name="__privateStripeFrame6585"
                            frameborder="0"
                            allowtransparency="true"
                            scrolling="no"
                            allow="payment *"
                            src="https://js.stripe.com/v3/elements-inner-card-5fcbbd20ae6d5c2e2735eb76cf56ab5f.html#locale=en&amp;wait=false&amp;mids[guid]=NA&amp;mids[muid]=4cc1ee66-d623-4a4a-ba78-fe5e8e7c492f670f08&amp;mids[sid]=NA&amp;hidePostalCode=true&amp;style[base][iconColor]=%23666EE8&amp;style[base][color]=%2331325F&amp;style[base][fontWeight]=500&amp;style[base][fontFamily]=%22Helvetica+Neue%22%2C+Helvetica%2C+sans-serif+&amp;style[base][fontSize]=18px&amp;style[base][::placeholder][color]=%23CFD7E0&amp;rtl=false&amp;componentName=card&amp;keyMode=live&amp;apiKey=pk_live_51IsMrlEIyFbAyaOXg3i6g1O1KzchacxqQImbEj6hojUJZoUFYqDGlVOlMZymCafII3p7K224UGnhj8Y2eL1nKHDr00d60gxNnC&amp;referrer=https%3A%2F%2Fapp.bloomia.app%2Fproduct%2FloggedIn&amp;controllerId=__privateStripeController6581"
                            title="Secure card payment input frame"
                          ></iframe>
                          <input
                            className="__PrivateStripeElement-input"
                            aria-hidden="true"
                            aria-label=" "
                            autocomplete="false"
                            maxlength="1"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn bg-blue rounded-xl text-light"
                    >
                      {" "}
                      Subscribe{" "}
                    </button>
                  </div>
                </div>
              </div>
            </form>

          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentDetails;
