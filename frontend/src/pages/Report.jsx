import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetPatient, GetReports, WriteAReport } from "../services/patient";

import dayjs from "dayjs";

import { Button, Card, Input, notification } from "antd";

import "./Style/Report.scss";
export default function Report() {
  const params = useParams();

  const [reports, setReports] = useState([]);
  const [patient, setPatient] = useState(null);
  const [newReportContent, setNewReportContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onWriteReport = () => {
    setSubmitting(true);
    WriteAReport(params.id, newReportContent)
      .then((res) => {
        if (res) {
          notification.open({ message: "Report added successfully!" });
          setNewReportContent("");
          setReports((prev) => [res, ...prev]);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  useEffect(() => {
    GetPatient(params.id).then((res) => {
      if (res) {
        setPatient(res.data);
      }
    });
    GetReports(params.id).then((res) => {
      if (res) {
        setReports(res.data);
      }
    });
  }, []);
  return (
    <div id="report-page">
      <h2>
        Reports of{" "}
        {patient ? patient.firstname + " " + patient.lastname : <>User</>}
      </h2>
      <div id="report-add">
        <h3>Add a report</h3>
        <Input.TextArea
          id="report-content"
          value={newReportContent}
          onChange={(e) => {
            setNewReportContent(e.target.value);
          }}
          disabled={submitting}
        />
        <Button
          type="primary"
          block
          onClick={onWriteReport}
          loading={submitting}
        >
          Add report
        </Button>
      </div>
      <div id="report-list">
        {reports && reports.length > 0 ? (
          reports.map((report) => {
            return (
              <div id="report-wrap">
                <Card>
                  <div id="content">{report.content}</div>
                  <div id="footer">
                    <div id="by">
                      Dr. {report.by.firstname} {report.by.lastname} -{" "}
                      {report.by.doctorData.specialization}
                    </div>
                    <div id="time">
                      {new dayjs(report.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </div>
                  </div>
                </Card>
              </div>
            );
          })
        ) : (
          <>No report!</>
        )}
      </div>
    </div>
  );
}
