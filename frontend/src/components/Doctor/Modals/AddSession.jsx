import { Form, Input, InputNumber, TimePicker } from "antd";
import Modal from "antd/es/modal/Modal";
import React, { useState } from "react";
import dayjs from "dayjs";
import { createSession } from "../../../services/session";

export default function AddSession({
  onSessionCreated,
  editing = false,
  open,
  onCancel,
  session,
  date,
  ...rest
}) {
  const [editingSession, setEditingSession] = useState(
    session || {
      name: "Session ?",
      from: new Date().getTime(),
      to: new Date().getTime(),
      maxAllowed: 25,
    }
  );

  const [submitting, setSubmitting] = useState(false);

  const submitHandler = () => {
    setSubmitting(true);

    // for creating
    if (!editing) {
      createSession({
        name: editingSession.name,
        date: date,
        fromTime: editingSession.from,
        toTime: editingSession.to,
        maxPatients: editingSession.maxAllowed,
      })
        .then((session) => {
          onSessionCreated(session);
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  return (
    <Modal
      title={(session ? "Edit the" : "Create a") + " Session"}
      open={open}
      onCancel={onCancel}
      okText={"Add"}
      okButtonProps={{ loading: submitting }}
      {...rest}
      destroyOnClose
      onOk={submitHandler}
    >
      {/* {new Date().toLocaleString('en-us',{month:"long", day:"numeric", year:"numeric"})} */}
      <p>
        Session on{" "}
        {date.toLocaleString("en-us", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
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
                  from:
                    e && e.length > 0
                      ? e[0].toDate().getTime()
                      : new Date().getTime(),
                  to:
                    e && e.length > 0
                      ? e[1].toDate().getTime()
                      : new Date().getTime(),
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
          <InputNumber
            value={editingSession.maxAllowed}
            onChange={(e) =>
              setEditingSession((prev) => {
                return {
                  ...prev,
                  maxAllowed: Number.parseInt(e),
                };
              })
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
