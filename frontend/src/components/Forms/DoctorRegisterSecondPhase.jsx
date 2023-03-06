import React, { useState } from "react";

import { Button, Steps, Form, Input, DatePicker, Select } from "antd";

export default function DoctorRegisterSecondPhase() {
  const steps = [
    {
      title: "General",
      content: <GeneralDetailsForm />,
    },
    {
      title: "Medical",
      content: <MedicalDetailsForm />,
    },
    {
      title: "Clinic",
      content: <ClinicDetailsForm />,
    },
  ];
  const items = steps.map((item) => {
    return { key: item.title, title: item.title };
  });

  const NextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const PreviousStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div id="doctor-register-second-phase">
      <Steps items={items} current={currentStep} size="small" />

      <div className="form">
        <Form
          name="basic"
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
          autoComplete="off"
        >
          {steps[currentStep].content}
        </Form>
      </div>
      <Button onClick={() => NextStep()}>Next</Button>
      <Button onClick={() => PreviousStep()}>Previous</Button>
    </div>
  );
}

function GeneralDetailsForm() {
  return (
    <>
      <Form.Item
        label="Phone number"
        name="phone-number"
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
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Medical registration no."
        name="medical-reg-no"
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
        name="medical-reg-year"
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
        name="medical-council"
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
      <Form.Item
        label="Clinic name"
        name="clinic-name"
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
        name="clinic-street"
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
        name="clinic-city"
        rules={[
          {
            required: true,
            message: "Please input your clinc city!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="State"
        name="clinic-state"
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
        name="clinic-country"
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
        name="clinic-pincode"
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
