'use client';
import { TextField } from "@mui/material";
import React, { useState, useRef, ChangeEvent } from "react";
import "./otp.scss";


const initializeState = {
  otp1: "",
  otp2: "",
  otp3: "",
  otp4: "",
};

const OtpField = (props) => {
  const [otp, setOtp] = useState(initializeState);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleOtp = (field, value) => {
    setOtp((prevOtp) => ({ ...prevOtp, [field]: value }));

    if (value !== "") {
      const index = inputRefs.findIndex(
        (ref) => ref.current === document.activeElement
      );
      if (index >= 0 && index < inputRefs.length - 1) {
        const nextInput = inputRefs[index + 1].current;
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else {
      const index = inputRefs.findIndex(
        (ref) => ref.current === document.activeElement
      );
      if (index > 0) {
        const previousInput = inputRefs[index - 1].current;
        if (previousInput) {
          previousInput.focus();
        }
      }
    }
  };
  const handleBackspace = (
    field,
    e
  ) => {
    if (
      e.key === "Backspace" &&
      field !== "otp1" &&
      e.currentTarget.value === ""
    ) {
      const index = inputRefs.findIndex(
        (ref) => ref.current === document.activeElement
      );
      if (index > 0) {
        const previousInput = inputRefs[index - 1].current;
        if (previousInput) {
          previousInput.focus();
        }
      }
    }
  };

  const inputfocus = () => {
    props.handleOtp(Object.values(otp).join(""));
  };

  return (
    <div className="row">
      <div className="col otp-fields">
        <TextField
          className="otpcolumn input-common"
          inputRef={inputRefs[0]}
          placeholder="0"
          onChange={(e) =>
            handleOtp("otp1", e.target.value)
          }
          onKeyUp={inputfocus}
          onKeyDown={(e) =>
            handleBackspace("otp1", e)
          }
          type="number"
          inputProps={{ maxLength: 1, tabIndex: 1 }}
          label=""
          variant="outlined"
        />
        <TextField
          className="otpcolumn input-common"
          inputRef={inputRefs[1]}
          placeholder="0"
          onChange={(e) =>
            handleOtp("otp2", e.target.value)
          }
          onKeyUp={inputfocus}
          onKeyDown={(e) =>
            handleBackspace("otp2", e)
          }
          type="number"
          inputProps={{ maxLength: 1, tabIndex: 2 }}
          label=""
          variant="outlined"
        />
        <TextField
          className="otpcolumn input-common"
          inputRef={inputRefs[2]}
          placeholder="0"
          onChange={(e) =>
            handleOtp("otp3", e.target.value)
          }
          onKeyUp={inputfocus}
          onKeyDown={(e) =>
            handleBackspace("otp3", e)
          }
          type="number"
          inputProps={{ maxLength: 1, tabIndex: 3 }}
          label=""
          variant="outlined"
        />
        <TextField
          className="otpcolumn input-common"
          inputRef={inputRefs[3]}
          placeholder="0"
          onChange={(e) =>
            handleOtp("otp4", e.target.value)
          }
          onKeyUp={inputfocus}
          onKeyDown={(e) =>
            handleBackspace("otp4", e)
          }
          type="number"
          inputProps={{ maxLength: 1, tabIndex: 4 }}
          label=""
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default OtpField;
