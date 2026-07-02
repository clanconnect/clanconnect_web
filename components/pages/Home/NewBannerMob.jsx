'use client';
import React, {useEffect, useState, useRef} from 'react';
import {HomeBannerData, HomeBannerModalVideoData, brandData} from '../../../data/data';
import Slider from 'react-slick';
import {Link} from '@/lib/router';
import { PackageService } from "../../../core/services/package.service";
import * as gtUtil from "../../../core/utility/constant"
import { Methods } from "../../../core/utility/methods";
import { makeRazorpayPayment } from '../../../core/services/PaymentService';
import {Tab, Nav, Modal, Form } from "react-bootstrap";
import { FormValidation } from '../../../core/utility/formValidation';
import { PublicService } from '../../../core/services/public.service';
import { MenuPropsAutoCompleteNoCheckBox, MenuPropsSelect, MenuPropsSelectSmall } from "../../../core/utility/style";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Checkbox, FormControlLabel, InputAdornment } from '@mui/material';
import { BASE_URL_WEB } from '../../../config/config';
import Skeleton from 'react-loading-skeleton';
const appStore = '/assets/images/influencers-page/app-store.png';
const playStore = '/assets/images/influencers-page/play-store.png';
const appStoreBgImage = '/assets/images/app-info-banner.png';

const packageService = new PackageService();
const methods = new Methods();
const publicService = new PublicService();

const NewBannerMob = () => {
  const formValidation = new FormValidation();
  // const locationRef = useRef<HTMLInputElement>(null);

  const [packagePlans, setPackagePlans] = useState(null);
  const [selectedPackagePlan, setSelectedPackagePlan] = useState(null);
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({name: '', email: '', phone: '', address: '', pincode: '', gstin: '', pan: '', state: ''});
  const [formError, setFormError] = useState({
    name: { status: true, message: "" },
    email: { status: true, message: "" },
    phone: { status: true, message: "" },
    address: { status: true, message: "" },
    pincode: { status: true, message: "" },
    gstin: { status: true, message: "" },
    pan: { status: true, message: "" },
    state: { status: true, message: "" }
  })
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const handleCloseShowPaymentForm = () => {
    setShowPaymentForm(false);
    setFormData({name: '', email: '', phone: '', address: '', pincode: '', gstin: '', pan: '', state: ''});
    setFormError({
      name: { status: true, message: "" },
      email: { status: true, message: "" },
      phone: { status: true, message: "" },
      address: { status: true, message: "" },
      pincode: { status: true, message: "" },
      gstin: { status: true, message: "" },
      pan: { status: true, message: "" },
      state: { status: true, message: "" }
    });
  };
    const [isAgreed, setIsAgreed] = useState(false);
    const [checkboxError, setCheckboxError] = useState(false);

  const handleFullName = (e) => {
    const value = e?.target?.value ?? e;
    const errors = {...formError};
    errors.name = formValidation.GetNameValidate(value);
    setFormError(errors);
  };

  const handleState = (e) => {
    const value = e?.target?.value ?? e;
    const errors = {...formError};
    errors.state = formValidation.GetNameValidate(value);
    setFormError(errors);
  };

  const handleEmail = (e) => {
    const value = e?.target?.value ?? e;
    const errors = {...formError};
    errors.email = formValidation.GetEmailControlIsValid(value);
    setFormError(errors);
  }

  const handlePhone = (e) => {
    const value = e?.target?.value ?? e;
    const errors = {...formError};
    errors.phone = formValidation.GetMobileControlIsValid(value);
    setFormError(errors);
  }

  const handleAddress = (e) => {
    const value = e?.target?.value ?? e;
    const errors = {...formError};
    if (value.trim()) {
      errors.address = formValidation.GetNameValidate(value);
    } else {
      errors.address = { status: true, message: "" }
    }
    setFormError(errors);
  }

  const handlePin = (e) => {
    const value = e?.target?.value ?? e;
    const errors = {...formError};
    if (value.trim()) {
      errors.pin = formValidation.GetPincodeValid(value);
    } else {
      errors.pin = { status: true, message: "" }
    }
    setFormError(errors);
  }

  const handleGstin = (e) => {
    const value = e?.target?.value ?? e;
    const errors = {...formError};
    if (value.trim()) {
      errors.gstin = formValidation.getgstIsValid(value);
    } else {
      errors.gstin = { status: true, message: "" }
    }
    setFormError(errors);
  }

  const handlePan = (e) => {
    const value = e?.target?.value ?? e;
    const errors = {...formError};
    if (value.trim()) {
      errors.pan = formValidation.getPANisValid(value);
    } else {
      errors.pan = { status: true, message: "" }
    }
    setFormError(errors);
  }

  const handleLocationChange = (event, value) => {
    // setSelectedLocation(value);
    setFormData({...formData,location_id: value})
    // You can perform any action here based on the selected location
    // if(influencer_id){
    //   setIsActiveField((prevIsActiveField) => ({
    //     ...prevIsActiveField,
    //     social_media:false,
    //   }));   
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // let hasError = false;
    const errors = {
      name: { status: false, message: "This field is required" },
      email: { status: false, message: "This field is required" },
      phone: { status: false, message: "This field is required" },
      address: { status: true, message: "" },
      pincode: { status: true, message: "" },
      gstin: { status: true, message: "" },
      pan: { status: true, message: "" },
      state: { status: false, message: "This field is required" }
    };

    // Name validation
    errors.name = formValidation.GetNameValidate(`${formData.name}`);
    if (!formData.name.trim()) {
      errors.name = { status: false, message: "Name/Company name is required" };
      // hasError = true;
    }

    // Name validation
    errors.state = formValidation.StateNameValidate(`${formData.state}`);
    if (!formData.state.trim()) {
      errors.state = { status: false, message: "State is required" };
      // hasError = true;
    }

    // Email validation
    errors.email = formValidation.GetEmailControlIsValid(`${formData.email}`);
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = { status: false, message: "Email is required" };
      // hasError = true;
    }

    // Phone validation (basic 10-digit)
    errors.phone = formValidation.GetMobileControlIsValid(`${formData.phone}`);
    // const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      errors.phone = { status: false, message: "Phone number is required" };
      // hasError = true;
    }

    // if (formData.address.trim()) {
    //   errors.address = formValidation.GetNameValidate(formData.address);
    // } else {
    //   errors.address = { status: true, message: "" }
    // }

    // if (formData.pincode.trim()) {
    //   errors.pincode = formValidation.GetPincodeValid(formData.pincode);
    // } else {
    //   errors.pincode = { status: true, message: "" }
    // }

    // if (formData.gstin.trim()) {
    //   errors.gstin = formValidation.getgstIsValid(formData.gstin);
    // } else {
    //   errors.gstin = { status: true, message: "" }
    // }

    // if (formData.pan.trim()) {
    //   errors.pan = formValidation.getPANisValid(formData.pan);
    // } else {
    //   errors.pan = { status: true, message: "" }
    // }

    setFormError(errors);
    // if (!hasError) {
    if (
      (errors.name.status && errors.phone.status && errors.email.status,
      errors.state.status && isAgreed)
      ) {
      makePayment(selectedPackagePlan);
      // Proceed with API call or logic
      // console.log("Form submitted:", formData);
      // Example: handleCloseShowPaymentForm();
      // or call API here
    }
    if (!isAgreed) {
      setCheckboxError(true);
      return; // block submission
    }
  };
  const [activeIndex, setActiveIndex] = useState(0);

  const packageSliderSettings = {
    centerMode: true,
    centerPadding: "0px", // or adjust for spacing if needed
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600, // smooth transition speed
    infinite: true,
    dots: false,
    arrows: false,
    pauseOnHover: false,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
          arrows: true,
          infinite: false,
          centerMode: false,
          cssEase: "",
        },
      },
    ],
  };

  const outerSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 7500,
    initialSlide: 0,
    beforeChange: (current, next) => setActiveIndex(next),
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 4000,
    initialSlide: 0,
  };

  const slides = [
    { id: 1, title: "Slide 1", img: "https://via.placeholder.com/200" },
    { id: 2, title: "Slide 2", img: "https://via.placeholder.com/200" },
    { id: 3, title: "Slide 3", img: "https://via.placeholder.com/200" },
    { id: 4, title: "Slide 4", img: "https://via.placeholder.com/200" },
    { id: 5, title: "Slide 5", img: "https://via.placeholder.com/200" },
  ];

  // To get the best_seller packagePlans
  const getPackagePlans = async () => {
    try {
      const response = await packageService.getPackagePlanDetails({package_type: 'best_seller'});
      if (response.status === gtUtil.Constants.SUCCESS) {
        setPackagePlans(response.data.rows);
      }
    } catch (error) {
      console.error('Error getPackagePlans:', error);
    }
  };

  useEffect(() => {
    getPackagePlans();
  }, []);

  useEffect(() => {
    //get Geo (Location)
    async function getLocations() {
      try {
        setLoading(true);
        const res = await publicService.getLocation({format: 'city,state,country'});
        if (res.data.status) {
          // if (res?.data?.rows[0].state === 'India' && res?.data?.rows[0].city === 'India' ){
          //   res?.data?.rows.shift();
          // }
          // const filteredAndSortedRows = res?.data?.rows
          //   .filter((row: any) => row.state === "Puducherry" || row.city !== row.state) // Filter logic
          //   .sort((a: any, b: any) => a.state.localeCompare(b.state));
          setLocation(res?.data?.rows);
        } else {
          setLocation([]);
        }
      } catch (error) {
        setLocation([]);
        console.log(`get Geo (Location) error :: ${JSON.stringify(error)}`);
      } finally {
        setLoading(false);
      }
    }
    getLocations();
  }, [])

  // For subscription payment
  const makePayment = async (data) => {
    // Your makePayment function logic here
    setLoading(true);
    try {
      // const paymentResponse = await makeRazorpayPayment(data, props, razorpay);
      const props = {account_type: 'Agency', account_name: formData.name, login_email: formData.email, login_mobile: formData.phone, state: formData.state, address: formData.address, pincode: formData.pincode, pan: formData.pan, gstin: formData.gstin}
      const paymentResponse = await makeRazorpayPayment(data, props);
      if (paymentResponse?.status) {
        // Payment successful, perform necessary actions
        window.location.href = `/package/orders/confirmed?payment_id=${paymentResponse?.paymentId}`;
      } else {
        // Payment failed, handle it
        console.log("Payment failed");
        // localService.toastify(paymentResponse?.message, "error", 1000);
      }
    } catch (error) {
      console.error(`Make Payment Error :: ${JSON.stringify(error)}`);
    } finally {
      setLoading(false);
    }
  }

  const buyNow = async (packagePlan) => {
    setShowPaymentForm(true);
    setSelectedPackagePlan(packagePlan);
  }

  const [sliderLoading, setSliderLoading] = useState(true);

  useEffect(() => {
    if (packagePlans && packagePlans.length > 0) {
      setSliderLoading(false);
    } else {
      setSliderLoading(true);
    }
  }, [packagePlans]);
  return (
    <>
      <section className={`outer-slider homeBanner homeBannerLatest eleContainer ${activeIndex === 0 ? "outer-slider-active" : ""}`}>        
        <div className="slider-container">
          <Slider {...outerSliderSettings}>
              <section className={`app-info`}>
              <div className="container">
                <h1>
                  Collaboration at your fingertips
                  <span>From campaign alerts to payments, manage it all instantly<br/> with the ClanConnect for Creators App.</span>
                </h1>

                <div className="punchline-slide">
                  <strong className="pb-2 pb-xxl-3 d-none d-md-block">
                    &nbsp;
                  </strong>
                  {HomeBannerData.HomeBannerSlider.map((bannerData) => {
                    return bannerData.influencersNew?.map((brandData) => {
                      return (
                        <div key={brandData.id} className="banner-caption">
                          <div className="banner-caption-right">
                            <div className="banner-caption-center">
                              <span className="triangle-border triangle-border-inner"></span>
                              <strong>
                                {brandData.bannerCaptionCenterTitle}
                              </strong>
                            </div>
                            <div className="banner-caption-bottom">
                              <span className="banner-caption-bottom-desc-mob">
                                {brandData.bannerCaptionBottomTitle}&nbsp;
                              </span>
                              <a href="/our_business_models">
                                {brandData.bannerCaptionBottomAnchor}
                              </a>
                            </div>
                          </div>
                          
                        </div>
                      );
                    });
                  })}
                  <div className="app-banner-bottom-img d-md-none">
                    <img src={appStoreBgImage} alt="App Banner" />
                  </div>
                  <div className="banner-bottom-btn d-flex mt-4 mt-md-5 mb-3">  
                   <div className='infl-banner-buttons'>
                      <Link to="https://apps.apple.com/us/app/clanconnect-for-creators/id6742653562" target='_blank'>
                          <img src={appStore} alt="App Store" />
                      </Link>
                      <Link to="https://play.google.com/store/apps/details?id=ai.clanconnect.app&hl=en_IN" target='_blank'>
                          <img src={playStore} alt="Play Store" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>  
            <section className="punchline-slide">
              <h1>
                Guaranteed Reach, Unmatched Value!
                <span>
                  Get your campaigns delivered @ 20 paisa cost per view
                </span>
                {/* <span>campaigns at just 20 paisa CPV!</span> */}
              </h1>
              <Link
                to="/our_business_models/1"
                className="btn btn-text-link px-0 explore-plan-btn"
              >
                Explore our plans now
              </Link>
              <div className="slider-package-container">
                <div className="slider-package">
                  {/* {packagePlans && packagePlans.map(({ plan_name, net_amount, description, nano, micro, macro, mega, total_influencers, committed_views, campaign_cpv, best_value, best_seller, most_popular }, index) => ( */}
                  {sliderLoading ? (
                    <div className="slider-loader">
                      <Skeleton count={3} height={340} />
                    </div>
                  ) : (
                    <Slider {...packageSliderSettings}>
                      {packagePlans &&
                        [...packagePlans, ...packagePlans].map(
                          (packagePlan, index) => (
                            <div className="tab-content-package-carousel-detail best-seller-container">
                              <span className="ribbon-new ribbon-best-seller">
                                <strong>Best</strong>
                                Seller
                              </span>

                              <strong className="fs-18 tab-content-package-carousel-title">
                                {packagePlan.plan_name}
                              </strong>
                              <span className="tab-content-package-carousel-subtitle">
                                (PAN INDIA)
                              </span>
                              <span className="tab-content-package-carousel-desc">
                                {packagePlan.description}
                              </span>
                              {packagePlan.nano !== 0 &&
                              packagePlan.micro === 0 &&
                              packagePlan.macro === 0 &&
                              packagePlan.mega === 0 ? (
                                <span className="tab-content-package-carousel-info stack">
                                  <span className="tab-content-package-carousel-count">
                                    Total Influencers{" "}
                                    <strong className="ms-1 fs-18">
                                      {packagePlan.nano}
                                    </strong>
                                  </span>
                                  <span className="tab-content-package-carousel-subtitle fs-14">
                                    (Nano)
                                  </span>
                                </span>
                              ) : (
                                <>
                                  <span className="tab-content-package-carousel-info pb-0">
                                    Total Influencers{" "}
                                    <strong className="ms-1">
                                      {packagePlan.total_influencers}
                                    </strong>
                                  </span>
                                  <ul className="tab-content-package-infl-type-count">
                                    {packagePlan.nano !== 0 && (
                                      <li>
                                        <span className="">
                                          Nano:{" "}
                                          <strong>{packagePlan.nano}</strong>
                                        </span>
                                      </li>
                                    )}
                                    {packagePlan.micro !== 0 && (
                                      <li>
                                        <span className="">
                                          Micro:{" "}
                                          <strong>{packagePlan.micro}</strong>
                                        </span>
                                      </li>
                                    )}
                                    {packagePlan.macro !== 0 && (
                                      <li>
                                        <span className="">
                                          Macro:{" "}
                                          <strong>{packagePlan.macro}</strong>
                                        </span>
                                      </li>
                                    )}
                                    {packagePlan.mega !== 0 && (
                                      <li>
                                        <span className="">
                                          Mega:{" "}
                                          <strong>{packagePlan.mega}</strong>
                                        </span>
                                      </li>
                                    )}
                                  </ul>
                                </>
                              )}
                              <span className="tab-content-package-carousel-info d-flex flex-column text-center">
                                Committed Views{" "}
                                <strong>
                                  {methods.convertExactNumber(
                                    packagePlan.committed_views
                                  )}
                                </strong>
                              </span>
                              <span className="tab-content-package-carousel-info d-flex flex-column text-center">
                                Campaign CPV{" "}
                                <strong>
                                  {packagePlan.campaign_cpv} paisa
                                </strong>
                              </span>
                              <div className="tab-content-package-carousel-footer">
                                <span className="tab-content-package-carousel-footer-price">
                                  <span>
                                    ₹
                                    {packagePlan.net_amount
                                      ? packagePlan.net_amount.toLocaleString(
                                          "en-IN"
                                        )
                                      : "N/A"}
                                  </span>
                                  <span
                                    className="fs-10 fw-400 mb-2 mb-lg-0"
                                    style={{ lineHeight: "0.5" }}
                                  >
                                    (Excl. Taxes)
                                  </span>
                                </span>
                                <button
                                  className="btn btn-black w-blk-bg mt-0"
                                  onClick={() => buyNow(packagePlan)}
                                >
                                  Buy Now
                                </button>
                              </div>
                            </div>
                          )
                        )}
                    </Slider>
                  )}
                  <Modal
                    centered
                    size="md"
                    show={showPaymentForm}
                    onHide={handleCloseShowPaymentForm}
                    className="popup-more-detail"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Add Your Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={handleSubmit}>
                        <div className="row">
                          {/* Name Field */}
                          <div className="col-12 mb-3">
                            <TextField
                              size="small"
                              className="w-100 more-detail-input"
                              type="text"
                              placeholder="Name/Company name"
                              label="Name/Company name"
                              value={formData.name}
                              onBlur={handleFullName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              isInvalid={!formError.name.status}
                              error={!formError.name.status}
                            />
                            {!formError.name.status && (
                              <small className="text-danger">
                                {formError.name.message}
                              </small>
                            )}
                          </div>

                          {/* Email Field */}
                          <div className="col-12 mb-3">
                            <TextField
                              size="small"
                              className="w-100 more-detail-input"
                              type="email"
                              placeholder="Email"
                              label="Email"
                              value={formData.email}
                              onBlur={handleEmail}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              isInvalid={!formError.email.status}
                              error={!formError.email.status}
                            />
                            {!formError.email.status && (
                              <small className="text-danger">
                                {formError.email.message}
                              </small>
                            )}
                          </div>
                          <div className="col-12 mb-3">
                            <div className="col __wa_column __wa_column_phone ">
                              <TextField
                                value={formData.phone}
                                onBlur={handlePhone}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                  })
                                }
                                isInvalid={!formError.phone.status}
                                className="w-100"
                                label="Mobile No."
                                error={!formError.phone.status}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <span className="fs-14 font-weight-normal">
                                        +91
                                      </span>
                                    </InputAdornment>
                                  ),
                                }}
                                variant="outlined"
                              />

                              {!formError.phone.status && (
                                <small className="text-danger error">
                                  {formError.phone.message}
                                </small>
                              )}
                            </div>
                            {/* <Form.Control
                                          type="tel"
                                          placeholder="Mobile"
                                          value={formData.phone}
                                          onBlur={handlePhone}
                                          onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                          }
                                          isInvalid={!formError.phone.status}
                                        />
                                        {!formError.phone.status && (
                                          <small className="text-danger">
                                            {formError.phone.message}
                                          </small>
                                        )} */}
                          </div>

                          {/* State Name Field */}
                          <div className="col-12 mb-3">
                            <TextField
                              size="small"
                              className="w-100 more-detail-input"
                              label="State"
                              type="text"
                              placeholder="State"
                              value={formData.state}
                              onBlur={handleState}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  state: e.target.value,
                                })
                              }
                              error={!formError.state.status}
                              isInvalid={!formError.state.status}
                            />
                            {!formError.state.status && (
                              <small className="text-danger">
                                {formError.state.message}
                              </small>
                            )}
                          </div>
                          <div className="col-12 mb-3 d-flex flex-column">
                            <div className="d-flex">
                              <FormControlLabel
                                className="me-0"
                                control={
                                  <Checkbox
                                    className="p-1"
                                    checked={isAgreed}
                                    onChange={(e) => {
                                      setIsAgreed(e.target.checked);
                                      setCheckboxError(false); // clear error when user checks
                                    }}
                                  />
                                }
                              />
                              <label
                                className="form-check-label d-flex align-items-center"
                                htmlFor="defaultCheck1"
                              >
                                I agree to{" "}
                                <a
                                  className="ms-1 btn btn-text-link"
                                  target="_blank"
                                  href={`${BASE_URL_WEB}/terms_conditions`}
                                >
                                  Terms &amp; Conditions
                                </a>
                              </label>
                            </div>
                            {checkboxError && (
                              <div
                                className="text-danger"
                                style={{
                                  fontSize: "0.875rem",
                                  marginTop: "4px",
                                  display: "block",
                                }}
                              >
                                You must agree to the Terms & Conditions
                              </div>
                            )}
                          </div>

                          {/* Submit Button */}
                          <div className="col-12 mb-3">
                            <button
                              type="submit"
                              className="btn btn-black w-blk-bg"
                            >
                              Proceed to Checkout
                            </button>
                          </div>
                        </div>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  {/* <Modal
                    centered
                    size="md"
                    show={showPaymentForm}
                    onHide={handleCloseShowPaymentForm}
                    className="popup-more-detail"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title></Modal.Title>
                    </Modal.Header>
                    {/* <Modal.Body>
                      <div className="row">
                        <div className="col-12 mb-3">
                          <Form.Control type="text" placeholder="Name" />
                        </div>
                        <div className="col-12 mb-3">
                          <Form.Control type="email" placeholder="Email" />
                        </div>

                        <div className="col-12 mb-3">
                          <Form.Control type="tel" placeholder="Mobile" />
                        </div>
                        <div className="col-12 mb-3">
                          <button className="btn btn-black w-blk-bg">Submit</button>
                        </div>
                      </div>
                    </Modal.Body> 
                    <Modal.Body>
                      <Form onSubmit={handleSubmit}>
                        <div className="row">
                        
                          <div className="col-12 mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Name/Company name"
                              value={formData.name}
                              onBlur={handleFullName}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              isInvalid={!formError.name.status}
                            />
                            {!formError.name.status && (
                              <small className="text-danger">{formError.name.message}</small>
                            )}
                          </div>

                          <div className="col-12 mb-3">
                            <Form.Control
                              type="email"
                              placeholder="Email"
                              value={formData.email}
                              onBlur={handleEmail}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              isInvalid={!formError.email.status}
                            />
                            {!formError.email.status && (
                              <small className="text-danger">{formError.email.message}</small>
                            )}
                          </div>

                          <div className="col-12 mb-3">
                            <Form.Control
                              type="tel"
                              placeholder="Mobile"
                              value={formData.phone}
                              onBlur={handlePhone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                              isInvalid={!formError.phone.status}
                            />
                            {!formError.phone.status && (
                              <small className="text-danger">{formError.phone.message}</small>
                            )}
                          </div>

                          {/* <div className="col-12 mt-1 mb-3">
                            <Autocomplete
                              className="inputFieldSp input-common"
                              size="small"
                              value={formData.location_id}
                              id="combo-box-demo"
                              onChange={handleLocationChange}
                              options={
                                location
                                  ? location?.map(
                                    (res) => {
                                      return `${res.city}, ${res.state}, ${res.country}`;
                                    }
                                  )
                                  : ["No Data"]
                              }
                              ListboxProps={MenuPropsAutoCompleteNoCheckBox.PaperProps}
                              renderInput={(params) => {
                                return (
                                  <TextField
                                    {...params}
                                    name="location_id"
                                    label="Location"
                                  />
                                );
                              }}
                            />
                          </div> 

                          <div className="col-12 mb-3">
                            <Form.Control
                              type="text"
                              placeholder="State"
                              value={formData.state}
                              onBlur={handleState}
                              onChange={(e) =>
                                setFormData({ ...formData, state: e.target.value })
                              }
                              isInvalid={!formError.state.status}
                            />
                            {!formError.state.status && (
                              <small className="text-danger">{formError.state.message}</small>
                            )}
                          </div>

                          {/* <div className="col-12 mb-3">
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Address (optional)"
                              value={formData.address || ""}
                              onBlur={handleAddress}
                              onChange={(e) =>
                                setFormData({ ...formData, address: e.target.value })
                              }
                            />
                          </div> 
                          {/* <div className="col-12 mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Pincode (optional)"
                              value={formData.pincode || ""}
                              onBlur={handlePin}
                              onChange={(e) =>
                                setFormData({ ...formData, pincode: e.target.value })
                              }
                              isInvalid={!formError.pincode.status}
                            />
                            {!formError.pincode.status && (
                              <small className="text-danger">{formError.pincode.message}</small>
                            )}
                          </div> 

                          {/* <div className="col-12 mb-3">
                            <Form.Control
                              type="text"
                              placeholder="PAN (optional)"
                              value={formData.pan || ""}
                              onBlur={handleGstin}
                              onChange={(e) =>
                                setFormData({ ...formData, pan: e.target.value })
                              }
                              isInvalid={!formError.pan.status}
                            />
                            {!formError.pan.status && (
                              <small className="text-danger">{formError.pan.message}</small>
                            )}
                          </div> 

                          {/* <div className="col-12 mb-3">
                            <Form.Control
                              type="text"
                              placeholder="GSTIN (optional)"
                              value={formData.gstin || ""}
                              onBlur={handlePan}
                              onChange={(e) =>
                                setFormData({ ...formData, gstin: e.target.value })
                              }
                              isInvalid={!formError.gstin.status}
                            />
                            {!formError.gstin.status && (
                              <small className="text-danger">{formError.gstin.message}</small>
                            )}
                          </div> 

                          <div className="col-12 mb-3">
                            <button type="submit" className="btn btn-black w-blk-bg">Submit</button>  
                          </div>
                        </div>
                      </Form>
                    </Modal.Body>
                  </Modal> */}
                </div>
                <div className="ribbon-container">
                  <div className="ribbon-left"></div>
                  <div className="ribbon-center">Our Bestsellers</div>
                  <div className="ribbon-right"></div>
                </div>
                <div className="ribbon-both">Our Bestsellers</div>
                {/* <div className="ribbon1">Our Bestsellers</div> */}
              </div>
              {/* <div className="ribbon">Our Bestsellers</div> */}
            </section>
            <section className="">
              <div className="container">
                <h1>
                  It's faster than you think!
                  <span>Connect with 80,000+ Influencers</span>
                  <span>Go Live in less than 30 minutes!</span>
                </h1>
                <div className="punchline-slide">
                  <strong className="pb-2 pb-xxl-3 d-block">
                    For Brands & Advertisers
                  </strong>
                  {HomeBannerData.HomeBannerSlider.map((bannerData) => {
                    return bannerData.brands?.map((brandData) => {
                      return (
                        <React.Fragment key={brandData.id}>
                          <div className="banner-caption">
                            <div className="banner-caption-right">
                              <div className="banner-caption-center">
                                <span className="triangle-border triangle-border-inner"></span>
                                <strong>
                                  {brandData.bannerCaptionCenterTitle}
                                </strong>
                              </div>
                              <div className="banner-caption-bottom">
                                <span className="banner-caption-bottom-desc-mob">
                                  {brandData.bannerCaptionBottomTitle}&nbsp;
                                </span>
                                <Link to="/our_business_models/1">
                                  {brandData.bannerCaptionBottomAnchor}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    });
                  })}
                  <div className="d-flex mt-2 banner-bottom-btn ">
                    <Link
                      target="_blank"
                      to="https://app.clanconnect.ai/request-a-demo"
                      className="btn btn-outline-black fs-16"
                    >
                      Request a demo
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            {/* <section className="">
              <div className="container">
                <h1>
                  It's faster than you think!
                  <span>Connect with 80,000+ Influencers</span>
                  <span>Go Live in less than 30 minutes!</span>
                </h1>

                <div className="punchline-slide">
                  <strong className="pb-2 pb-xxl-3 d-block">
                    For Influencers & Talent Partners
                  </strong>
                  {HomeBannerData.HomeBannerSlider.map((bannerData) => {
                    return bannerData.influencers?.map((brandData) => {
                      return (
                        <div key={brandData.id} className="banner-caption">
                          <div className="banner-caption-right">
                            <div className="banner-caption-center">
                              <span className="triangle-border triangle-border-inner"></span>
                              <strong>
                                {brandData.bannerCaptionCenterTitle}
                              </strong>
                            </div>
                            <div className="banner-caption-bottom">
                              <span className="banner-caption-bottom-desc-mob">
                                {brandData.bannerCaptionBottomTitle}&nbsp;
                              </span>
                              <a href="/our_business_models">
                                {brandData.bannerCaptionBottomAnchor}
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })}
                  <div className="banner-bottom-btn d-flex mt-2 mb-3">
                    <Link
                      target="_blank"
                      to="https://app.clanconnect.ai"
                      className="btn btn-outline-black fs-16"
                    >
                      Sign Up Now
                    </Link>
                  </div>
                </div>
              </div>
            </section>   */}
            
          </Slider>
        </div>
      </section>
    </>
  );
};

export default NewBannerMob;
