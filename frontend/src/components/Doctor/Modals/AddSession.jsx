import { Form, Input, TimePicker } from "antd";
import Modal from "antd/es/modal/Modal";
import React, { useState } from "react";
import dayjs from "dayjs";

export default function AddSession({ open, onCancel, session, ...rest }) {
  const [editingSession, setEditingSession] = useState(
    session || {
      name: "Session ?",
      from: new Date().getTime(),
      to: new Date().getTime(),
      maxAllowed: 25,
    }
  );

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      okText={"Add"}
      okButtonProps={{ loading: true }}
      {...rest}
      destroyOnClose
    >
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          sessionName: editingSession.name,
          time: [dayjs(editingSession.from), dayjs(editingSession.to)],
          maxPatients: editingSession.maxAllowed,
        }}
      >
        <Form.Item
          label={"Session name"}
          name="sessionName"
          rules={[{ required: true }]}
        >
          <Input
            value={editingSession.name}
            onChange={(e) =>
              setEditingSession((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
          />
        </Form.Item>
        <Form.Item label={"Time"} name="time" rules={[{ required: true }]}>
          <TimePicker.RangePicker
            format={"h:mm a"}
            use12Hours
            minuteStep={15}
            showSecond={false}
            value={[editingSession.from, editingSession.to]}
            onChange={(e) => {
              setEditingSession((prev) => {
                return {
                  ...prev,
                  from: e[0].toDate().getTime(),
                  to: e[1].toDate().getTime(),
                };
              });
            }}
          />
        </Form.Item>

        <Form.Item
          label={"Max. Patients"}
          name="maxPatients"
          rules={[{ required: true }, { type: "number" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
