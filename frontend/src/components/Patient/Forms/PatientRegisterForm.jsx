import React, { useContext, useState } from "react";

import { Button, Form, Input, DatePicker, Select, Divider, Alert } from "antd";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { server_uri } from "../../../utils/constants/config";

export default function PatientRegisterForm() {
  const [form] = useForm();
  const { setToken } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onFinishHandler = (data) => {
    setSubmitting(true);
    data.userType = "patient";
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
          navigate("/patient/app");
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
    <div id="patient-register-form-wrapper" className="form-wrapper">
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
            <GeneralDetailsForm />

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

            <div
              className="form-buttons"
              style={{ display: "flex", justifyContent: "center", gap: "8px" }}
            >
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
