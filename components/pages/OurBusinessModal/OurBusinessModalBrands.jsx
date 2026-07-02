'use client';
import React, { Fragment, useEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Helmet } from "@/lib/helmet";
import { Link, useLocation } from "@/lib/router";
import { useParams } from "@/lib/router";
import {Tab, Nav, Modal, Form } from "react-bootstrap";
import Slider from "react-slick";
import RetinaImage from '@/lib/RetinaImage';

const nanoImage = '/assets/images/nano.png';
const socialSurgeImage = '/assets/images/socialSurge.png';
const influenceUnlockedImage = '/assets/images/influenceUnlocked.png';
const trendsetterImage = '/assets/images/trendsetter.png';
const viralSensationImage = '/assets/images/viralSensation.png';
const hometownImage = '/assets/images/hometown.png';
const mostPopularImage = '/assets/images/ribbon-most-popular.svg';
const bestValueImage = '/assets/images/ribbon-best-value.svg';
const bestSellerImage = '/assets/images/ribbon-best-seller.svg';
import Skeleton from "react-loading-skeleton";
import { PackageService } from "../../../core/services/package.service";
import * as gtUtil from "../../../core/utility/constant"
import { Methods } from "../../../core/utility/methods";
import { PublicService } from "../../../core/services/public.service";
import { makeRazorpayPayment } from '../../../core/services/PaymentService';
import { MenuPropsAutoCompleteNoCheckBox, MenuPropsSelect, MenuPropsSelectSmall } from "../../../core/utility/style";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { FormValidation } from "../../../core/utility/formValidation";
import { BASE_URL_WEB, CAPTCHA_SITE_KEY } from "../../../config/config";
import { CaptchaService } from "../../../core/services/captcha.service";
import { LocalService } from "../../../core/services/local.service";
import { Button, Checkbox, FormControlLabel, IconButton, InputAdornment, TextareaAutosize, Tooltip } from "@mui/material";
import OtpField from "../../otp/otp.jsx";
const verifiedImage = '/assets/images/verified.svg';
import { caseStudyData } from "../../../data/data";

const packageService = new PackageService();
const methods = new Methods();
const publicService = new PublicService();
const localService = new LocalService();
const captchaService = new CaptchaService();

const OurBusinessModalBrands = () => {
  const formValidation = new FormValidation();



  const location_path = useLocation();
  const { param } = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");

  // const [packageTypes, setPackageTypes] = useState([{package_type: 'Kickstart', net_amount: 50000}, {package_type: 'Social Surge', net_amount: 75000}, {package_type: 'Influence Unlocked', net_amount: 100000}, {package_type: 'Trendsetter', net_amount: 150000}, {package_type: 'Viral Sensation', net_amount: 250000}, {package_type: 'Hometown Hero', net_amount: null}]);
  const [packageTypes, setPackageTypes] = useState(null);
  const [packagePlans, setPackagePlans] = useState(null);
  const [selectedPackagePlan, setSelectedPackagePlan] = useState(null);
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showotpBox, setOtpBox] = useState(false);
  const [isEditButtonDisabled, setIsEditButtonDisabled] = useState(false);
  const [isResendButtonDisabled, setIsResendButtonDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const [isTimerDisabled, setIsTimerDisabled] = useState(true);
  const [isNumberDisabled, setIsNumberDisabled] = useState(false);
  const [showResendEdit, setShowResendEdit] = useState(false);
  const phoneRef = useRef(null);

  const [formData, setFormData] = useState({name: '', email: '', phone: '', address: '', pincode: '', gstin: '', pan: '', state: '', message: '', purpose: 'package_help_query'});
  const [formError, setFormError] = useState({
    name: { status: true, message: "" },
    email: { status: true, message: "" },
    phone: { status: true, message: "" },
    address: { status: true, message: "" },
    pincode: { status: true, message: "" },
    gstin: { status: true, message: "" },
    pan: { status: true, message: "" },
    state: { status: true, message: "" },
    message: { status: true, message: "" }
  })
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showQueryForm, setShowQueryForm] = useState(false);
  const handleCloseShowPaymentForm = () => {
    setShowPaymentForm(false);
    setShowQueryForm(false);
    setFormData({name: '', email: '', phone: '', address: '', pincode: '', gstin: '', pan: '', state: '', message: '', purpose: 'package_help_query'});
    setFormError({
      name: { status: true, message: "" },
      email: { status: true, message: "" },
      phone: { status: true, message: "" },
      address: { status: true, message: "" },
      pincode: { status: true, message: "" },
      gstin: { status: true, message: "" },
      pan: { status: true, message: "" },
      state: { status: true, message: "" },
      message: { status: true, message: "" }
    });
    setVerifiedWAfield(false);
    setWhatsAppNumber("");
    setIsAgreed(false);
    setCheckboxError(false);
  };
  const [isAgreed, setIsAgreed] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  
  const [whatsappnumber, setWhatsAppNumber] = useState("");
  const [verifiedWAfield, setVerifiedWAfield] = useState(false);
  //validations
  const [errorwhatsapp, setErrorWhatsApp] = useState();
  
  // For Disabling ...........................

  const [disableWhatsappfield, setDisableWhatsAppField] = useState(true);



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

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setTimer(0);
      setIsResendButtonDisabled(false);
    }

    return () => clearInterval(countdown);
  }, [timer]);

  const handleSendOtpButton = (e) => {
    let isValid = formValidation.GetMobileControlIsValid(whatsappnumber);
    // if (`${whatsappnumber}`.length === 10){
    if (isValid.status) {
      setErrorWhatsApp(isValid);

      PublicService.sendOtp({ mobile: +whatsappnumber, request_demo: "true" })
        .then((res) => {
          if (res.status === gtUtil.Constants.SUCCESS) {
            setShowResendEdit(true);
            setIsResendButtonDisabled(true);
            setTimer(30);
            setIsTimerDisabled(true);
            setIsEditButtonDisabled(true);
            setOtpBox(res.status === gtUtil.Constants.SUCCESS);
            setDisableWhatsAppField(res.status === gtUtil.Constants.SUCCESS);
            localService.toastify(res.info, "success", 1000);
          } else {
            localService.toastify(res.info, "error", 1000);
          }
          // setLoading(false);
        })  
        .catch((error) => {
          // setLoading(false);
          console.warn(`Otp Response Error :: ${error}`);
        });
    } else {
      setErrorWhatsApp(isValid);
    }
  };
  const handleChangePhone = () => {
    setVerifiedWAfield(false);
    setOtpBox(false);
    setShowResendEdit(false);
    if (phoneRef.current) {
      phoneRef.current.focus();
    }
  };
  // const handleWhatsApp = (e) => {
  //   setErrorWhatsApp(formValidation.GetMobileControlIsValid(e.target.value));
  // }
  const handleWhatsAppOtp = (otp) => {
    if (otp.length === 4) {
      PublicService.verifyOtp({ mobile: +whatsappnumber, otp: otp })
        .then((res) => {
          if (res.status === gtUtil.Constants.SUCCESS) {
            setOtpBox(false);
            setDisableWhatsAppField(true);
            setShowResendEdit(false);
            setVerifiedWAfield(true);
            localService.toastify(res.info, "success", 1000);
          } else {
            localService.toastify(res.info, "error", 1000);
          }
        })
        .catch((error) => {
          throw new Error("VerifyOtp Error ::: " + error);
        });
    }
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
      state: { status: false, message: "This field is required" },
      message: { status: true, message: "" }
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
    // else if (!emailRegex.test(formData.email)) {
    //   errors.email = { status: true, message: "Invalid email format" };
    //   hasError = true;
    // }

    // Phone validation (basic 10-digit)
    errors.phone = formValidation.GetMobileControlIsValid(`${formData.phone}`);
    // const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      errors.phone = { status: false, message: "Phone number is required" };
      // hasError = true;
    } 
    // else if (!phoneRegex.test(formData.phone)) {
    //   errors.phone = { status: true, message: "Invalid phone number" };
    //   hasError = true;
    // }

    if (formData.address.trim()) {
      errors.address = formValidation.GetNameValidate(formData.address);
    } else {
      errors.address = { status: true, message: "" }
    }

    if (formData.pincode.trim()) {
      errors.pincode = formValidation.GetPincodeValid(formData.pincode);
    } else {
      errors.pincode = { status: true, message: "" }
    }

    if (formData.gstin.trim()) {
      errors.gstin = formValidation.getgstIsValid(formData.gstin);
    } else {
      errors.gstin = { status: true, message: "" }
    }

    if (formData.pan.trim()) {
      errors.pan = formValidation.getPANisValid(formData.pan);
    } else {
      errors.pan = { status: true, message: "" }
    }

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

  const verifyCaptcha = async () => {
    try {
      const res = await captchaService.verifyCaptcha({ token: captchaToken });
      if (res?.data?.rows?.message === "Captcha verified successfully!"){
        return true;
      } else {
        setCaptchaToken("");
        return false;
      }
    } catch (error) {
      setCaptchaToken("");
      console.error(`verifyCaptcha Error :: ${JSON.stringify(error)}`);
      return false;
    }
  };

  const handleQuerySubmit = async (e) => {
    try {
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
        state: { status: true, message: "" },
        message: { status: true, message: "" }
      };

      // Name validation
      errors.name = formValidation.GetNameValidate(`${formData.name}`);
      if (!formData.name.trim()) {
        errors.name = { status: false, message: "Name/Company name is required" };
      }

      // Email validation
      errors.email = formValidation.GetEmailControlIsValid(`${formData.email}`);
      if (!formData.email.trim()) {
        errors.email = { status: false, message: "Email is required" };
      }

      // Phone validation (basic 10-digit)
      errors.phone = formValidation.GetMobileControlIsValid(`${formData.phone}`);
      if (!formData.phone.trim()) {
        errors.phone = { status: false, message: "Phone number is required" };
      }

      // if (formData.message.trim()) {
      //   errors.message = formValidation.GetNameValidate(formData.message);
      // } else {
      //   errors.message = { status: true, message: "" }
      // }

      // Check if CAPTCHA is verified
      if (!captchaToken) {
        localService.toastify("Please complete CAPTCHA verification.", "error", 1000);
        return;
      }

      setFormError(errors);

      if (await verifyCaptcha) {
        if (errors.name.status && errors.phone.status && errors.email.status) {
          // Proceed with API call or logic
          // console.log("Form submitted:", formData);
          const response = await packageService.packageHelpQuery(formData);
          if (response.data?.rows?.status){
            localService.toastify(response.data.rows.message, "success", 1000);
            handleCloseShowPaymentForm();
          } else {
            localService.toastify(response.data.rows.message, "error", 1000);
            handleCloseShowPaymentForm();
          }
          // Example: handleCloseShowPaymentForm();
          // or call API here
        }
      } else {
        localService.toastify("Please complete CAPTCHA verification.", "error", 1000);
      }
    } catch (error) {
      localService.toastify("Something went wrong!", "error", 1000);
      console.error('Error handleQuerySubmit:', error);
    }
  }

  useEffect(() => {
    const addClass = document.querySelector("body");
    addClass.classList.add("common-bg-page");

    // Cleanup function to remove the class when the component is unmounted
    return () => {
      addClass.classList.remove("common-bg-page");
    };
  }, []);

  useEffect(() => {
    setActiveTab(['1', '2', '3', '4','5'].includes(param) ? Number(param) : 1)
  }, [location_path.pathname]);

  // Construct the dynamic canonical URL based on the route parameter
  const canonicalUrl = `https://www.clanconnect.ai/our_business_models/${param}`;
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 2.25,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    centerMode: false,
    speed: 1000,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

   const tabContainerRef = useRef(null);


  const updateButtonState = () => {
    if (tabContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabContainerRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  useEffect(() => {
    if (tabContainerRef.current) {
      tabContainerRef.current.addEventListener("scroll", updateButtonState);
      updateButtonState();
    }
    return () => {
      if (tabContainerRef.current) {
        tabContainerRef.current.removeEventListener(
          "scroll",
          updateButtonState
        );
      }
    };
  }, []);

  const smoothScroll = (element, direction, amount, duration) => {
    let start = element.scrollLeft;
    let target = direction === "next" ? start + amount : start - amount;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      let timeElapsed = currentTime - startTime;
      let progress = Math.min(timeElapsed / duration, 1);
      element.scrollLeft = start + (target - start) * progress;
      if (progress < 1) {
        window.requestAnimationFrame(animation);
      }
    }

    window.requestAnimationFrame(animation);
  };

  const scroll = (direction) => {
    if (tabContainerRef.current) {
      smoothScroll(tabContainerRef.current, direction, 200, 400);
    }
  };

  const [atPackageStart, setAtPackageStart] = useState(true);
  const [atPackageEnd, setAtPackageEnd] = useState(false);

  const scrollRef = useRef(null);

  // const scrollPackage = (direction) => {
  //   const { current } = scrollRef;
  //   if (current) {
  //     const scrollAmount = 300;
  //     current.scrollBy({
  //       left: direction === "left" ? -scrollAmount : scrollAmount,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  const checkScrollPosition = () => {
    const el = scrollRef.current;
    if (!el) return;

    setAtPackageStart(el.scrollLeft === 0);
    setAtPackageEnd(el.scrollLeft + el.offsetWidth >= el.scrollWidth - 1); // -1 to avoid rounding issues
  };

  const scrollPackage = (direction) => {
    const el = scrollRef.current;
    if (el) {
      const scrollAmount = 300;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition(); // run once on mount
    }

    return () => {
      if (el) el.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);
  
  const [activePackage, setActivePackage] = useState(null);
  // const [activePackageTab, SetActivePackageTab] = useState(null);
  // const [activeAccordion, setActiveAccordion] = useState("Kickstart");
  const [activeKey, setActiveKey] = useState("Kickstart");
  const [tabLoading, setTabLoading] = useState(false);

  // const handleTabChange = (key) => {
  //   if (key !== activeKey) {
  //     setTabLoading(true);
  //     setActiveKey(key);
  //     const selectedPackage = packageTypes.find(
  //       (pkg) => pkg.package_type === key
  //     );
  //     setActivePackage(selectedPackage);
  //     setTimeout(() => {
  //       setTabLoading(false);
  //     }, 400); // simulate loading
  //   }
  // };

  const handleTabChange = (key) => {
  if (key === activePackage?.package_type) {
    // Toggle off (close accordion)
    setActivePackage(null);
    setActiveKey(null); // also reset Tab.Container key if you're using it
  } else {
    setTabLoading(true);
    setActiveKey(key);
    const selectedPackage = packageTypes.find((pkg) => pkg.package_type === key);
    setActivePackage(selectedPackage);
    setTimeout(() => {
      setTabLoading(false);
    }, 400); // simulate loading
  }
};

  useEffect(() => {
    if (packageTypes && packageTypes.length) {
      setActivePackage(packageTypes[0]);
    }
  }, [packageTypes]);

  // const handleAccordionClick = (eventKey) => {
  //   setActiveAccordion(eventKey);
  // };

  // const [show, setShow] = useState(false);

  // const handleCloseMoreDetail = () => setShow(false);
  const handleMoreDetail = () => setShowQueryForm(true);

  // To get the packageTypes
  const getPackageTypes = async () => {
    try {
      const response = await packageService.packageTypes();
      if (response.status === gtUtil.Constants.SUCCESS) {
        setPackageTypes(response.data.rows);
        setActivePackage(response.data.rows[0]);
        // getPackagePlans(response.data?.rows[0]?.package_type);
      }
    } catch (error) {
      console.error('Error getPackageTypes:', error);
    }
  };

  // To get the packagePlans
  const getPackagePlans = async () => {
    try {
      const response = await packageService.getPackagePlanDetails();
      if (response.status === gtUtil.Constants.SUCCESS) {
        setPackagePlans(response.data.rows);
      }
    } catch (error) {
      console.error('Error getPackagePlans:', error);
    }
  };

  useEffect(() => {
    getPackageTypes();
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

  const [caseStudyCategory, setcaseStudyCategory] = useState('All');
  

  const handleTabClick = (category) => {
    setcaseStudyCategory(category);
  };
  useEffect(() => {
    const addClass = document.querySelector('body');
    addClass.classList.add('common-bg-page');

    // Cleanup function to remove the class when the component is unmounted
    return () => {
      addClass.classList.remove('common-bg-page');
    };
  }, []);
  const filteredCategories =
    caseStudyCategory === 'All'
      ? caseStudyData.caseStudyList
      : caseStudyData.caseStudyList.filter(
          (caseStudy) => caseStudy.category === caseStudyCategory
        );

  return (
    <>
      <Helmet>
        <title>ClanConnect - Our Business Models</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="ClanConnect - Our Business Models" />
        <meta
          property="og:description"
          content="Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers."
        />
        <meta
          property="og:image"
          content="https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/our-business-models.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
      </Helmet>
      <div className="homeBanner homeBannerLatest inner news">
        <div className="container">
          <div className="banner-content">
            <h1 className="banner-innerpage-heading mb-2">
              Our Business Models
            </h1>
            <span className="color-2b2b2b text-center mb-5 fs-18 d-block">
              We offer flexible business models for{" "}
              <strong>Brands and Agencies</strong> to suit your
              <br className="d-none d-md-block" /> influencer marketing needs.
              Choose the one that fits your goals.
            </span>
          </div>
        </div>
      </div>

      <section className="sec-accordion sec-our-business">
        <div className="our-business-models">
          <div className="container">
            <div className="our-business-models-content">
              <div className="business-models-wrapper">
                <button
                  className={`d-lg-none prev-btn ${
                    isAtStart ? "disabled" : ""
                  }`}
                  onClick={() => !isAtStart && scroll("prev")}
                  disabled={isAtStart}
                >
                  <span className="material-symbols-rounded">chevron_left</span>
                </button>
                <div
                  className="our-business-models-buttons"
                  ref={tabContainerRef}
                >
                  <Link
                    to="/our_business_models/1"
                    // className={`self-served ${activeTab === 1 ? "active" : ""}`}
                    // onClick={() => setActiveTab(1)}
                    className={`d-flex align-items-center self-served ${
                      activeTab === 1 ? "active" : ""
                    }`}
                  >
                    <strong className="material-symbols-rounded me-2">box</strong>
                    Prepaid Packages
                  </Link>

                  <Link
                    to="/our_business_models/2"
                    // className={`self-served ${activeTab === 1 ? "active" : ""}`}
                    // onClick={() => setActiveTab(1)}
                    className={`d-flex align-items-center self-served ${
                      activeTab === 2 ? "active" : ""
                    }`}
                  >
                    <strong className="material-symbols-rounded me-2">
                      featured_seasonal_and_gifts
                    </strong>
                    Self - served Free of Cost (FOC)
                  </Link>

                  <Link
                    to="/our_business_models/3"
                    // className={`barter ${activeTab === 2 ? "active" : ""}`}
                    // onClick={() => setActiveTab(2)}
                    className={`d-flex align-items-center barter ${
                      activeTab === 3 ? "active" : ""
                    }`}
                  >
                    <strong className="material-symbols-rounded me-2">
                      handshake
                    </strong>
                    Barter
                  </Link>

                  <Link
                    to="/our_business_models/4"
                    // className={`premium ${activeTab === 3 ? "active" : ""}`}
                    // onClick={() => setActiveTab(3)}
                    className={`d-flex align-items-center premium ${
                      activeTab === 4 ? "active" : ""
                    }`}
                  >
                    <strong className="material-symbols-rounded me-2">
                      workspace_premium
                    </strong>
                    Premium
                  </Link>

                  <Link
                    to="/our_business_models/5"
                    className={`managed-services d-flex align-items-center ${
                      activeTab === 5 ? "active" : ""
                    }`}
                  >
                    <strong className="material-symbols-rounded me-2">
                      manage_accounts
                    </strong>
                    Managed Services
                  </Link>
                </div>
                <button
                  className={`d-lg-none  next-btn ${isAtEnd ? "disabled" : ""}`}
                  onClick={() => !isAtEnd && scroll("next")}
                  disabled={isAtEnd}
                >
                  <span className="material-symbols-rounded">chevron_right</span>
                </button>
              </div>

              {activeTab === 1 && (
                <Fragment>
                  <div className="d-flex flex-column align-items-start">
                    <div className="second-heading fs-18">
                      Choose the Perfect Package for Your Influencer Marketing
                      Campaign
                    </div>
                    <span className="d-block">
                      Get the best engagement at the lowest CPV!
                    </span>

                    <span className="pb-3">
                      {" "}
                      Select from our tailored plans based on your budget and
                      influencer preferences.
                    </span>
                  </div>
                  <Tab.Container
                    defaultActiveKey="Kickstart"
                    activeKey={activeKey}
                    onSelect={handleTabChange}
                  >
                    <Nav
                      variant="pills"
                      className="tab-package d-none d-md-flex"
                    >
                      {packageTypes &&
                        packageTypes.map(
                          ({ package_type, net_amount }, index) => (
                            <Nav.Item key={package_type}>
                              <Nav.Link
                                className="btn btn-rounded"
                                eventKey={package_type}
                              >
                                {package_type}{" "}
                                {package_type === "Hometown Hero" ? (
                                  <span
                                    style={{
                                      color: "#5d5d5d",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    (Regional Focus)
                                  </span>
                                ) : (
                                  <span>
                                    @ ₹
                                    {net_amount
                                      ? net_amount.toLocaleString("en-IN")
                                      : "N/A"}
                                  </span>
                                )}
                              </Nav.Link>
                            </Nav.Item>
                          )
                        )}
                    </Nav>
                    <Tab.Content mountOnEnter unmountOnExit transition={false}>
                      {/* {tabLoading ? ( */}
                      {/* <div>
                          <Skeleton
                            height={485}
                            style={{ marginBottom: "-4px" }}
                          />
                        </div> */}

                      <>
                        {packageTypes &&
                          packageTypes.map(
                            (
                              {
                                package_type,
                                net_amount,
                                package_description,
                                package_image,
                              },
                              index
                            ) => (
                              <>
                                <Nav.Item className="d-md-none">
                                  <Nav.Link
                                    eventKey={package_type}
                                    className={`btn btn-accordion ${
                                      activePackage?.package_type ===
                                      package_type
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      handleTabChange(package_type)
                                    }
                                  >
                                    {/* {package_type} <span>@ ₹{net_amount ? net_amount.toLocaleString("en-IN") : "N/A"}</span> */}
                                    {package_type}{" "}
                                    {package_type === "Hometown Hero" ? (
                                      <span className="hometown-hero">
                                        (Regional Focus)
                                      </span>
                                    ) : (
                                      <span>
                                        @ ₹
                                        {net_amount
                                          ? net_amount.toLocaleString("en-IN")
                                          : "N/A"}
                                      </span>
                                    )}
                                  </Nav.Link>
                                </Nav.Item>

                                {activePackage?.package_type ===
                                  package_type && (
                                  <Tab.Pane eventKey={package_type}>
                                    <div className="tab-content-package-details">
                                      <strong className="tab-content-package-title">
                                        {package_type}{" "}
                                        {package_type === "Hometown Hero" ? (
                                          <span>(Regional Focus)</span>
                                        ) : (
                                          <span>
                                            @ ₹
                                            {net_amount
                                              ? net_amount.toLocaleString(
                                                  "en-IN"
                                                )
                                              : "N/A"}
                                          </span>
                                        )}
                                      </strong>
                                      <span className="tab-content-package-desc">
                                        {
                                          package_description
                                        }
                                      </span>
                                      <div className="row">
                                        <div className="tab-content-package-slide-sec ">
                                          <div className="tab-content-package-carousel">
                                            <Slider {...settings}>
                                              {/* {packagePlans && packagePlans.map(({ plan_name, net_amount, description, nano, micro, macro, mega, total_influencers, committed_views, campaign_cpv, best_value, best_seller, most_popular }, index) => ( */}
                                              {packagePlans &&
                                                packagePlans
                                                  .filter(
                                                    (plan) =>
                                                      plan.package_type ===
                                                      package_type
                                                  )
                                                  .map((packagePlan, index) => (
                                                    <Fragment key={index}>
                                                      {tabLoading ? (
                                                        <Skeleton
                                                          height={400}
                                                          width={280}
                                                          style={{
                                                            marginRight: "10px",
                                                            borderRadius: "8px",
                                                            marginTop: "10px",
                                                          }}
                                                        />
                                                      ) : (
                                                        <div className="tab-content-package-carousel-detail">
                                                          {/* <span className="ribbon-new ribbon-most-popular">
                                                  Most Popular
                                                </span> */}

                                                          {packagePlan.best_value ===
                                                            "true" && (
                                                            <span className="ribbon-image-container best-value">
                                                              <img
                                                                src={
                                                                  bestValueImage
                                                                }
                                                                alt="best-value"
                                                              />
                                                            </span>
                                                          )}
                                                          {packagePlan.best_seller ===
                                                            "true" && (
                                                            <span className="ribbon-image-container best-seller">
                                                              <img
                                                                src={
                                                                  bestSellerImage
                                                                }
                                                                alt="best-seller"
                                                              />
                                                            </span>
                                                          )}
                                                          {packagePlan.most_popular ===
                                                            "true" && (
                                                            <span className="ribbon-image-container most-popular">
                                                              <img
                                                                src={
                                                                  mostPopularImage
                                                                }
                                                                alt="most-popular"
                                                              />
                                                            </span>
                                                          )}
                                                          <strong className="fs-18 tab-content-package-carousel-title">
                                                            {
                                                              packagePlan.plan_name
                                                            }
                                                          </strong>
                                                          <span className="tab-content-package-carousel-subtitle">
                                                            (PAN INDIA)
                                                          </span>
                                                          <span className="tab-content-package-carousel-desc">
                                                            {
                                                              packagePlan.description
                                                            }
                                                          </span>
                                                          {packagePlan.nano !==
                                                            0 &&
                                                          packagePlan.micro ===
                                                            0 &&
                                                          packagePlan.macro ===
                                                            0 &&
                                                          packagePlan.mega ===
                                                            0 ? (
                                                            <span className="tab-content-package-carousel-info  stack">
                                                              <span className="tab-content-package-carousel-count ">
                                                                Total
                                                                Influencers{" "}
                                                                <strong className="ms-1 fs-18">
                                                                  {
                                                                    packagePlan.nano
                                                                  }
                                                                </strong>
                                                              </span>
                                                              <span className="tab-content-package-carousel-subtitle fs-14">
                                                                (Nano)
                                                              </span>
                                                            </span>
                                                          ) : (
                                                            <>
                                                              <span className="tab-content-package-carousel-info pb-0">
                                                                Total
                                                                Influencers{" "}
                                                                <strong className="ms-1">
                                                                  {
                                                                    packagePlan.total_influencers
                                                                  }
                                                                </strong>
                                                              </span>
                                                              <ul className="tab-content-package-infl-type-count">
                                                                {packagePlan.nano !==
                                                                  0 && (
                                                                  <li>
                                                                    <span className="">
                                                                      Nano:{" "}
                                                                      <strong>
                                                                        {
                                                                          packagePlan.nano
                                                                        }
                                                                      </strong>
                                                                    </span>
                                                                  </li>
                                                                )}
                                                                {packagePlan.micro !==
                                                                  0 && (
                                                                  <li>
                                                                    <span className="">
                                                                      Micro:{" "}
                                                                      <strong>
                                                                        {
                                                                          packagePlan.micro
                                                                        }
                                                                      </strong>
                                                                    </span>
                                                                  </li>
                                                                )}
                                                                {packagePlan.macro !==
                                                                  0 && (
                                                                  <li>
                                                                    <span className="">
                                                                      Macro:{" "}
                                                                      <strong>
                                                                        {
                                                                          packagePlan.macro
                                                                        }
                                                                      </strong>
                                                                    </span>
                                                                  </li>
                                                                )}
                                                                {packagePlan.mega !==
                                                                  0 && (
                                                                  <li>
                                                                    <span className="">
                                                                      Mega:{" "}
                                                                      <strong>
                                                                        {
                                                                          packagePlan.mega
                                                                        }
                                                                      </strong>
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
                                                              {
                                                                packagePlan.campaign_cpv
                                                              }{" "}
                                                              paisa
                                                            </strong>
                                                          </span>
                                                          <div className="tab-content-package-carousel-footer">
                                                            <span className=" tab-content-package-carousel-footer-price">
                                                              <span>
                                                                ₹
                                                                {packagePlan.net_amount
                                                                  ? packagePlan.net_amount.toLocaleString(
                                                                      "en-IN"
                                                                    )
                                                                  : "N/A"}
                                                              </span>
                                                              <span
                                                                className="fs-10 fw-400 ms-1 ms-lg-0"
                                                                style={{
                                                                  lineHeight: 0.5,
                                                                }}
                                                              >
                                                                (Excl. Taxes)
                                                              </span>
                                                            </span>
                                                            <button
                                                              className="btn btn-black w-blk-bg mt-0"
                                                              onClick={() =>
                                                                buyNow(
                                                                  packagePlan
                                                                )
                                                              }
                                                            >
                                                              Buy Now
                                                            </button>
                                                          </div>
                                                        </div>
                                                      )}
                                                    </Fragment>
                                                  ))}
                                            </Slider>
                                          </div>
                                          
                                            <div className="tab-content-package-img-sec ">
                                              <img
                                                src={package_image}
                                                alt="nano"
                                              />
                                            </div>
                                        
                                        </div>
                                      </div>
                                    </div>
                                  </Tab.Pane>
                                )}
                              </>
                            )
                          )}
                      </>
                    </Tab.Content>
                  </Tab.Container>
                  <div className="packages-case-studies-sec">
                    <button
                      className="btn btn-text-link mb-2"
                      onClick={handleMoreDetail}
                    >
                      Connect With Us to Know More
                    </button>
                    <span className="pb-2 fs-12 d-block">
                      Terms &amp; Conditions apply*
                    </span>

                    <div className="case-study-package-container">
                      <strong
                        style={{
                          fontSize: "22px",
                          display: "block",
                          marginBottom: "10px",
                        }}
                      >
                        View Campaigns
                      </strong>
                      <ul className="case-study-list">
                        {filteredCategories
                          ?.filter((caseStudy) =>
                            [78, 77].includes(Number(caseStudy?.id))
                          )
                          ?.reverse()
                          .map((caseStudy) => {
                            return (
                              <Fragment key={caseStudy.id}>
                                <li>
                                  <Link
                                    target="_blank"
                                    to={`/case_studies/case_study_detail?case_study_detail_id=${caseStudy.id}`}
                                  >
                                    <div className="case-study-logo-container">
                                      {/* <img className='case-study-logo' src={caseStudy.logoImg} alt={caseStudy.title} /> */}
                                      <RetinaImage
                                        className="case-study-logo"
                                        src={[
                                          caseStudy.logoImg,
                                          caseStudy.logoImg2x,
                                          caseStudy.logoImg3x,
                                        ]}
                                        alt={caseStudy.title}
                                      />
                                    </div>

                                    <div className="case-study-info">
                                      <div
                                        className="case-study-info-top"
                                        style={{
                                          borderBottom: `${
                                            caseStudy.influencersCount
                                              ? "1px solid #00000029"
                                              : ""
                                          }`,
                                        }}
                                      >
                                        {caseStudy.views && (
                                          <div className="case-study-info-top-value">
                                            <strong>{caseStudy.views}</strong>
                                            <span>Views</span>
                                          </div>
                                        )}
                                        {caseStudy.engagementRate && (
                                          <div className="case-study-info-top-value">
                                            <strong>
                                              {caseStudy.engagementRate}
                                            </strong>
                                            <span>ER</span>
                                          </div>
                                        )}
                                        {caseStudy.cpv && (
                                          <div className="case-study-info-top-value">
                                            <strong>
                                              <i className="bi bi-currency-rupee"></i>
                                              {caseStudy.cpv}
                                            </strong>
                                            <span>CPV</span>
                                          </div>
                                        )}

                                        {caseStudy.engagement && (
                                          <div className="case-study-info-top-value">
                                            <strong>
                                              {caseStudy.engagement}
                                            </strong>
                                            <span>Engagement</span>
                                          </div>
                                        )}
                                      </div>
                                      {caseStudy.influencersCount && (
                                        <div className="case-study-info-btm">
                                          <strong>
                                            {caseStudy.influencersCount}{" "}
                                            <span>
                                              {caseStudy.influencersCount > 1
                                                ? "Influencers"
                                                : "Influencer"}
                                            </span>
                                          </strong>
                                        </div>
                                      )}
                                    </div>
                                    {caseStudy.inflImg && (
                                      <>
                                        <div className="case-study-award"></div>
                                        <div className="case-study-infl">
                                          {/* {caseStudy?.inflImg && <div className='case-study-infl-img-cont'>
                                      <img src={caseStudy.inflImg} alt={caseStudy.title} /> 
                                      </div>}
                                      {caseStudy?.inflImg1 && <div className='case-study-infl-img-cont'>
                                      <img src={caseStudy?.inflImg1} alt={caseStudy.title} />
                                      </div>} */}
                                          <div className="page-case-study-banner-right">
                                            {caseStudy?.images
                                              ?.slice(0, 4)
                                              .map((ima, index) => {
                                                return (
                                                  <div
                                                    key={ima.id}
                                                    className={`case-study-banner-img case-study-banner-img${
                                                      index + 1
                                                    }`}
                                                  >
                                                    {!loading && (
                                                      <img
                                                        src={ima.img}
                                                        alt={caseStudy.title}
                                                      />
                                                    )}
                                                    {loading && (
                                                      <Skeleton
                                                        style={{
                                                          borderRadius: "10px",
                                                        }}
                                                        height={300}
                                                      />
                                                    )}
                                                  </div>
                                                );
                                              })}
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </Link>
                                </li>
                              </Fragment>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </Fragment>
              )}
              {activeTab === 2 && (
                <div>
                  <div className="first-heading">
                    Free of Cost (FOC) Campaign:
                  </div>
                  <p>
                    The platform provides one free end-to-end campaign execution
                    per month upon sign-up absolutely free. With the free
                    campaign, you can post a brief, discover influencers,
                    negotiate proposals, receive creative content and give
                    feedback, pay directly to influencers and view campaign
                    analytics without paying any commission to ClanConnect.
                  </p>
                  <div className="second-heading">
                    Free of Cost (FOC) Campaign Features:
                  </div>
                  <p>
                    <ul className="margin-left-25">
                      <li>One free campaign posting per month.</li>
                      <li>5 searches using filters, names, or usernames.</li>
                      <li>
                        15 influencer profile views (Instagram and YouTube
                        included).
                      </li>
                      <li>
                        Create a list of 15 influencer profiles and send a
                        campaign brief directly to these influencers.
                      </li>
                      <li>
                        Negotiate, send feedback and pay directly to 15
                        influencers.
                      </li>
                    </ul>
                  </p>
                  <div className="second-heading">Terms &amp; conditions</div>
                  <ol className="margin-left-25">
                    <li>
                      FOC window of 30 days starts from the day you signup.
                    </li>
                    <li>
                      The next free campaign is available only after completing
                      the previous one.
                    </li>
                    <li>
                      Additional campaigns within the same month require a{" "}
                      <a
                        href="/pricing"
                        style={{
                          textDecoration: "underline",
                          color: "#2b2b2b",
                        }}
                      >
                        premium subscription
                      </a>
                      .
                    </li>
                    <li>
                      Access related to the free campaign will be blocked after
                      the 30-day window.
                    </li>
                  </ol>
                </div>
              )}
              {activeTab === 3 && (
                <div>
                  <div className="first-heading">Barter Campaign:</div>
                  <p>
                    The platform provides Barter campaign execution at ₹2500
                    only. By enabling this, you can post one brief, discover
                    influencers, receive content for approval/give feedback and
                    view campaign analytics.
                  </p>
                  <div className="second-heading">
                    Barter Campaign @ ₹2500 Features:
                  </div>
                  <p>
                    <ul className="margin-left-25">
                      <li>One Barter campaign post.</li>
                      <li>25 searches using filters, names, or usernames.</li>
                      <li>
                        50 influencer profile views (Instagram and YouTube
                        included).
                      </li>
                      <li>
                        Create a list of 50 influencer profiles and send a
                        campaign brief directly to these influencers.
                      </li>
                      <li>
                        View up to 50 influencer proposals, shortlist, get their
                        addresses, send them products, receive and approve
                        content.
                      </li>
                    </ul>
                  </p>
                  <div className="second-heading">Terms &amp; conditions:</div>
                  <ol className="margin-left-25">
                    <li>
                      Additional campaigns within the same month can be executed
                      by publishing a new barter campaign @₹2500 or taking a{" "}
                      <a
                        href="/pricing"
                        style={{
                          textDecoration: "underline",
                          color: "#2b2b2b",
                        }}
                      >
                        premium subscription
                      </a>
                      .
                    </li>
                  </ol>
                </div>
              )}
              {activeTab === 4 && (
                <div>
                  <div className="first-heading">Premium Features:</div>
                  <p>
                    The platform provides unlimited Paid and Barter campaign
                    execution. By subscribing to our premium plan, you can post
                    unlimited briefs, discover influencers, chat with them,
                    negotiate proposals, receive content for approval/give
                    feedback, pay directly to influencers and view campaign
                    analytics.
                  </p>
                  <div className="second-heading">Benefits:</div>
                  <p>
                    <ul className="margin-left-25">
                      <li>Unlimited Paid campaign execution.</li>
                      <li>Unlimited Barter campaign execution.</li>
                      <li>
                        Unlimited searches using filters, names, or usernames.
                      </li>
                      <li>
                        Unlimited influencer profile views (Instagram and
                        YouTube included).
                      </li>
                      <li>
                        Create unlimited lists of up to 100 influencer profiles
                        and send a campaign brief directly to these influencers.
                      </li>
                      <li>
                        Negotiate, send feedback and pay directly to influencers
                        under Paid campaigns.
                      </li>
                      <li>
                        Shortlist influencers, get their addresses, send them
                        products, receive and approve content for Barter
                        campaigns
                      </li>
                    </ul>
                  </p>
                  <Link to="/pricing" className="btn btn-outline-black btn-sm mt-3">
                    View our pricing plans
                  </Link>
                </div>
              )}
              {activeTab === 5 && (
                <div>
                  <div className="second-heading">Commission Model </div>
                  <p>
                    A dedicated team of campaign planners and executioners
                    operates on a fixed commission model, charging 10% of the
                    brand’s campaign budget/layout. This model is ideal for
                    substantial brands and large-scale agencies.
                  </p>
                  <div className="second-heading">Project Model</div>
                  <p>
                    A one-off campaign where the team defines the scope of work
                    and executes it as a single project cost.
                  </p>
                  <div className="second-heading">Retainer Model</div>
                  <p>
                    Designed for brands seeking continuous engagement with
                    influencers on a monthly or long-term basis. The team
                    outlines the scope of work, allocates resources, and
                    operates on a monthly retainer with fixed deliverables.
                  </p>
                  <p>
                    Minimum billing to avail managed services is 1 Lac or above
                    + taxes per month (applies to commission and project model).
                  </p>
                </div>
              )}
            </div>

            {/* <ol className="fs-14 ps-3">
              <li>
                <strong>Campaign Planning:</strong> A briefing call will be held
                on Day 1 to align on campaign guidelines, deliverables,
                platforms, number of influencers, and timelines.
              </li>
              <li>
                <strong>Influencer Scouting:</strong> Influencer names will be
                shortlisted with a 10% buffer:
              </li>
              <ul style={{paddingLeft: '1rem'}}>
                <li>Up to 30 names: within 1 day</li>
                <li>More than 30 names: within 2 days</li>
                <li>
                  For regional campaigns, the timeline may increase by an
                  additional 1 day
                </li>
                <li>
                  Influencer data such as engagement rate, followers, and reach
                  will be shared by ClanConnect team.
                </li>
              </ul>
              <li>
                <strong>Influencer Confirmation:</strong> Finalisation of
                influencer list will be completed within 0.5 days (same day as
                scouting completion). Influencer availability must be confirmed,
                and contracts and addresses locked (for product delivery
                campaigns).
              </li>
              <li>
                <strong>Script Development:</strong> Three sample scripts will
                be provided within 24 hours of influencer shortlisting by the
                influencer or ClanConnect team. ClanConnect will conduct hygiene
                checks for the remaining scripts.
              </li>
              <li>
                <strong>Product Delivery (if applicable):</strong> Products must
                be shipped to influencers by the brand in advance and arrive
                before the shoot.
              </li>
              <li>
                <strong>Shoot:</strong> Content will be shot within:
                <ul style={{paddingLeft: '1rem'}}>
                  <li>
                    24–48 hours post script confirmation (if no product delivery
                    is required)
                  </li>
                  <li>
                    24–48 hours post product delivery and script confirmation
                    (if product delivery is involved)
                  </li>
                </ul>
              </li>
              <li>
                <strong>First Drafts/Creatives:</strong>
                First drafts will be collected and reviewed within 24–48 hours
                post shoot.
                <ul style={{paddingLeft: '1rem'}}>
                  <li>Reshoots are not included in this timeline. </li>
                  <li>
                    Hygiene checks will be conducted to ensure content meets
                    guidelines.
                  </li>
                  <li>Feedback on drafts is required from the brand.</li>
                </ul>
              </li>
              <li>
                <strong>Edits/Reshoots (if any):</strong> Any feedback-based
                edits or reshoots (if required) will be incorporated within 1
                day. Edits should be minimal for faster turnaround.
              </li>
              <li>
                <strong>Final Approval:</strong> Final content should be
                reviewed and approved within 12 hours by the brand. All
                guidelines must be met and signed off by relevant stakeholders.
              </li>
              <li>
                <strong>Campaign Go-Live:</strong> Content will be posted
                immediately after brand’s final approval. Posting times will be
                coordinated with the influencers.
              </li>
              <li>
                <strong>Active Tracking:</strong> Posts will be monitored, and
                metrics tracked for 2 days after go-live using tracking tools.
                Initial data will be collected during this period.
              </li>
              <li>
                <strong>Final Reporting:</strong> A final report will be shared
                by ClanConnect, 15 days after the last post. The report will
                include reach, engagement, conversions, and key campaign
                learnings.
              </li>
            </ol> */}
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
                          setFormData({ ...formData, name: e.target.value })
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
                          setFormData({ ...formData, email: e.target.value })
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
                          setFormData({ ...formData, state: e.target.value })
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
                      <button type="submit" className="btn btn-black w-blk-bg">
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>

            <Modal
              centered
              size="md"
              show={showQueryForm}
              onHide={handleCloseShowPaymentForm}
              className="popup-more-detail"
            >
              <Modal.Header closeButton>
                <Modal.Title>Connect with Us</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ paddingTop: "15px" }}>
                <p className="mb-3 fs-14">
                  Share your details and our team will call you back within one
                  working day.
                </p>
                <div className="package_enq-form _influencer-signup">
                  <Form onSubmit={handleQuerySubmit} className="__signup_form">
                    <div className="row ">
                      {/* Name Field */}
                      <div className="col-12 mb-3">
                        <TextField
                          type="text"
                          className="w-100 more-detail-input"
                          label="Name/Company name"
                          placeholder="Name/Company name"
                          value={formData.name}
                          onBlur={handleFullName}
                          size="small"
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
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
                            setFormData({ ...formData, email: e.target.value })
                          }
                          isInvalid={!formError.email.status}
                          error={!formError.email.status}
                        />
                        {/* <Form.Control
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onBlur={handleEmail}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          isInvalid={!formError.email.status}
                        /> */}
                        {!formError.email.status && (
                          <small className="text-danger">
                            {formError.email.message}
                          </small>
                        )}
                      </div>
                      {/* Phone Field */}
                      <div className=" mb-3">
                        <div className="col __wa_column">
                          <TextField
                            className="w-100  more-detail-input"
                            type="number"
                            size="small"
                            color="primary"
                            inputRef={phoneRef}
                            // onBlur={handleWhatsApp}
                            name="phone"
                            id="whatsappnumber_id"
                            label="WhatsApp No."
                            value={whatsappnumber}
                            isInvalid={!formError.phone.status}
                            error={!formError.phone.status}
                            InputProps={{
                              readOnly: verifiedWAfield,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <span className="fs-14 font-weight-normal">
                                    +91
                                  </span>
                                </InputAdornment>
                              ),
                            }}
                            // onChange={(e) => {
                            //   // Restrict input to 10 digits
                            //   if (e.target.value.length <= 10) {
                            //     setWhatsAppNumber(e.target.value);
                            //     setDisableWhatsAppField(
                            //       e.target.value.length !== 10
                            //     );
                            //   }
                            // }}
                            onChange={(e) => {
                              const value = e.target.value;

                              if (value.length <= 10) {
                                setWhatsAppNumber(value);
                                setFormData((prev) => ({
                                  ...prev,
                                  phone: value,
                                }));
                                setDisableWhatsAppField(value.length !== 10);

                                // Validation logic
                                if (value.length < 10) {
                                  setFormError((prev) => ({
                                    ...prev,
                                    phone: {
                                      status: false,
                                      message:
                                        "Please enter a valid 10-digit WhatsApp number.",
                                    },
                                  }));
                                } else {
                                  setFormError((prev) => ({
                                    ...prev,
                                    phone: {
                                      status: true,
                                      message: "",
                                    },
                                  }));
                                }
                              }
                            }}
                            variant="outlined"
                          />
                          {!verifiedWAfield ? (
                            <Button
                              className={
                                disableWhatsappfield
                                  ? "btn btn-disabled __button send-otp"
                                  : "__button send-otp"
                              }
                              color="success"
                              loadingPosition="start"
                              disabled={disableWhatsappfield}
                              onClick={handleSendOtpButton}
                              variant="contained"
                              startIcon={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-whatsapp"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                </svg>
                              }
                            >
                              Send OTP
                            </Button>
                          ) : (
                            <Tooltip
                              className="icon-verified"
                              title="Verified"
                              arrow
                            >
                              <IconButton size="small" className="p-0">
                                <img src={verifiedImage} alt="verified" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {!formError.phone.status && (
                            <small className="text-danger error">
                              {formError.phone.message}
                            </small>
                          )}

                          {showResendEdit && (
                            <div className="resend-otp">
                              {isEditButtonDisabled && (
                                <p
                                  className="change-phone fs-12 btn btn-text-link mb-0"
                                  onClick={handleChangePhone}
                                >
                                  Change Phone
                                </p>
                              )}
                              <div className="resend-otp-container">
                                <button
                                  className="otp-btn fs-12 btn btn-text-link"
                                  onClick={handleSendOtpButton}
                                  type="button"
                                  disabled={isResendButtonDisabled}
                                >
                                  Resend OTP
                                </button>
                                {isTimerDisabled && (
                                  <p className="otp-time fs-12 mb-0">
                                    &nbsp; 00:{timer < 10 ? `0${timer}` : timer}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          {showotpBox && (
                            <OtpField handleOtp={handleWhatsAppOtp} />
                          )}
                        </div>
                      </div>
                      {/* Phone Field */}
                      {/* <div className="col-12 mb-3">
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
                          <small className="text-danger">
                            {formError.phone.message}
                          </small>
                        )}
                      </div> */}

                      <div className="col-12 mb-3">
                        <TextField
                          type="textarea"
                          className="w-100 package-textarea more-detail-input"
                          placeholder="Type your message (optional)"
                          label="Type your message (optional)"
                          value={formData.message || ""}
                          // onBlur={handlemessage}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-12 mb-3">
                        <ReCAPTCHA
                          sitekey={CAPTCHA_SITE_KEY}
                          onChange={(token) => setCaptchaToken(token)}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="col-12 mb-3">
                        <button
                          type="submit"
                          className="btn btn-black w-blk-bg"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurBusinessModalBrands;