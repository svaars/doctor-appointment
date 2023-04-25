import React, { useContext, useState } from "react";

import { Button, Form, Input, DatePicker, Select, Divider, Alert } from "antd";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { server_uri } from "../../../utils/constants/config";

import "../../Style/DoctorRegisterForm.scss";

const generateSelect = (value, label) => {
  return { label, value: value || label.toLoweCase() };
};

export default function DoctorRegisterForm() {
  const [form] = useForm();
  const { setToken } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onFinishHandler = (data) => {
    setSubmitting(true);
    data.dob = data.dob.toDate();
    data.regYear = data.regYear.year();
    data.userType = "doctor";
    // console.log(data);

    axios
      .post(server_uri + "/users/signup", data, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          // Register success
          setSuccess(true);
          // Load the token to context
          setToken(res.data.token);
          form.resetFields();
          // Redirect to next dashboard
          navigate("/doctor/app");
        }
      })
      .catch((err) => {
        // setIsSubmitting(false);
        // console.log(err);
        const data = err.response.data;
        if (data.more.message) {
          setErrorMessage(data.more.message);
        } else {
          setErrorMessage("Unknown");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <div id="doctor-register-form-wrapper" className="form-wrapper">
      <div className="form">
        {success && (
          <Alert
            message="Successfully registered!"
            type="success"
            style={{ maxWidth: "400px", margin: "auto" }}
          />
        )}

        {errorMessage && (
          <Alert
            message="Could not register user!"
            description={errorMessage}
            type="error"
            style={{ maxWidth: "400px", margin: "auto" }}
          />
        )}
        {!success && (
          <Form
            scrollToFirstError
            name="basic"
            form={form}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishHandler}
            onFinishFailed={() => [console.log("err")]}
            autoComplete="off"
          >
            {/* {steps[currentStep].content} */}
            <GeneralDetailsForm />
            <MedicalDetailsForm />
            <ClinicDetailsForm />

            {success && (
              <Alert
                message="Successfully registered!"
                type="success"
                style={{ maxWidth: "400px", margin: "auto" }}
              />
            )}

            {errorMessage && (
              <Alert
                message="Could not register user!"
                description={errorMessage}
                type="error"
                style={{ maxWidth: "400px", margin: "auto" }}
              />
            )}

            <div className="form-buttons">
              <Button type="primary" htmlType="submit" loading={submitting}>
                Submit
              </Button>

              <Button htmlType="reset">Reset</Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}

function GeneralDetailsForm() {
  return (
    <>
      <Divider orientation="left">
        <h5>General</h5>
      </Divider>
      <Form.Item
        label="First name"
        name="firstname"
        rules={[
          {
            required: true,
            message: "Please input your first name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Last name" name="lastname">
        <Input />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please input a valid email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            pattern:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            message:
              "Password should be minimum eight characters, at least one letter, one number and one special character",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Phone number"
        name="phoneNumber"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input addonBefore={<>+91</>} />
      </Form.Item>
      <Form.Item
        label="Date of birth"
        name="dob"
        rules={[
          {
            required: true,
            message: "Please input your date of birth!",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[
          {
            required: true,
            message: "Please input your gender",
          },
        ]}
      >
        <Select>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
}

const med_council = [
  {
    value: "Andhra Pradesh Medical Council",
    label: "Andhra Pradesh Medical Council",
  },
  {
    value: "Arunachal Pradesh Medical Council",
    label: "Arunachal Pradesh Medical Council",
  },
  { value: "Assam Medical Council", label: "Assam Medical Council" },
  { value: "Bihar Medical Council", label: "Bihar Medical Council" },
  {
    value: "Chhattisgarh Medical Council",
    label: "Chhattisgarh Medical Council",
  },
  { value: "Delhi Medical Council", label: "Delhi Medical Council" },
  { value: "Goa Medical Council", label: "Goa Medical Council" },
  { value: "Gujarat Medical Council", label: "Gujarat Medical Council" },
  { value: "Haryana Medical Council", label: "Haryana Medical Council" },
  {
    value: "Himachal Pradesh Medical Council",
    label: "Himachal Pradesh Medical Council",
  },
  {
    value: "Jammu and Kashmir Medical Council",
    label: "Jammu and Kashmir Medical Council",
  },
  { value: "Jharkhand Medical Council", label: "Jharkhand Medical Council" },
  { value: "Karnataka Medical Council", label: "Karnataka Medical Council" },
  { value: "Kerala Medical Council", label: "Kerala Medical Council" },
  {
    value: "Madhya Pradesh Medical Council",
    label: "Madhya Pradesh Medical Council",
  },
  {
    value: "Maharashtra Medical Council",
    label: "Maharashtra Medical Council",
  },
  { value: "Manipur Medical Council", label: "Manipur Medical Council" },
  { value: "Meghalaya Medical Council", label: "Meghalaya Medical Council" },
  { value: "Mizoram Medical Council", label: "Mizoram Medical Council" },
  { value: "Nagaland Medical Council", label: "Nagaland Medical Council" },
  { value: "Odisha Medical Council", label: "Odisha Medical Council" },
  { value: "Punjab Medical Council", label: "Punjab Medical Council" },
  { value: "Rajasthan Medical Council", label: "Rajasthan Medical Council" },
  { value: "Sikkim Medical Council", label: "Sikkim Medical Council" },
  { value: "Tamil Nadu Medical Council", label: "Tamil Nadu Medical Council" },
  { value: "Telangana Medical Council", label: "Telangana Medical Council" },
  { value: "Tripura Medical Council", label: "Tripura Medical Council" },
  {
    value: "Uttar Pradesh Medical Council",
    label: "Uttar Pradesh Medical Council",
  },
  {
    value: "Uttarakhand Medical Council",
    label: "Uttarakhand Medical Council",
  },
  {
    value: "West Bengal Medical Council",
    label: "West Bengal Medical Council",
  },
];

function MedicalDetailsForm() {
  return (
    <>
      <Divider orientation="left">
        <h5>Medical Certification Details</h5>
      </Divider>
      <Form.Item
        label="Specialization"
        name="specialization"
        rules={[
          {
            required: true,
            message: "Please input your specialization!",
          },
        ]}
      >
        <Select
          showSearch
          options={[
            { value: "General medicine", label: "General medicine" },
            { value: "Pediatrics", label: "Pediatrics" },
            { value: "Gynecology", label: "Gynecology" },
            { value: "Dermatology", label: "Dermatology" },
            { value: "Cardiology", label: "Cardiology" },

            { value: "Endocrinology", label: "Endocrinology" },
            { value: "Gastroenterology", label: "Gastroenterology" },
            { value: "Hematology", label: "Hematology" },
            { value: "Immunology", label: "Immunology" },
            { value: "Neurology", label: "Neurology" },
            { value: "Oncology", label: "Oncology" },
            { value: "Ophthalmology", label: "Ophthalmology" },
            { value: "Orthopedics", label: "Orthopedics" },
            { value: "Psychiatry", label: "Psychiatry" },
            { value: "Pulmonology", label: "Pulmonology" },
            { value: "Radiology", label: "Radiology" },
            { value: "Rheumatology", label: "Rheumatology" },
            { value: "Urology", label: "Urology" },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Medical registration no."
        name="regNo"
        rules={[
          {
            required: true,
            message: "Please input medical registration no.!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Year of registration"
        name="regYear"
        rules={[
          {
            required: true,
            message: "Please input medical registration year!.",
          },
        ]}
      >
        <DatePicker picker="year" />
      </Form.Item>

      <Form.Item
        label="State medical council"
        name="stateCouncil"
        rules={[
          {
            required: true,
            message: "Please input your medical council!",
          },
        ]}
      >
        <Select showSearch options={med_council} />
      </Form.Item>

      {/* <Form.Item
        label="State medical council"
        name="medical-council"
        rules={[
          {
            required: true,
            message: "Please input your medical council!",
          },
        ]}
      >
        <Select showSearch options={med_council} />
      </Form.Item> */}

      <Form.Item
        label="Qualification"
        name="qualification"
        rules={[
          {
            required: true,
            message: "Please input your qualification!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="College"
        name="college"
        rules={[
          {
            required: true,
            message: "Please input your college!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
}

function ClinicDetailsForm() {
  return (
    <>
      <Divider orientation="left">
        <h5>Clinical Details</h5>
      </Divider>
      <Form.Item
        label="Clinic name"
        name="clinicName"
        rules={[
          {
            required: true,
            message: "Please input your clinic name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Street"
        name="street"
        rules={[
          {
            required: true,
            message: "Please input your clinc street!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="City"
        name="city"
        rules={[
          {
            required: true,
            message: "Please input your clinc city!",
          },
        ]}
      >
        <Select
          options={[
            generateSelect("Manipal"),
            generateSelect("Udupi"),
            generateSelect("Mangalore"),
          ]}
          searchValue=""
        />
      </Form.Item>

      <Form.Item
        label="State"
        name="state"
        rules={[
          {
            required: true,
            message: "Please input your clinc state!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Country"
        name="country"
        rules={[
          {
            required: true,
            message: "Please input your clinc country!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Pincode"
        name="pincode"
        rules={[
          {
            required: true,
            message: "Please input your clinc pincode!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
