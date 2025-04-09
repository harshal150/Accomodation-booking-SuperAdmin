/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'


import { Row, Col, Card, Table, Badge, Form } from "react-bootstrap";
import Chart from "react-apexcharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsPeople, BsBuilding, BsCurrencyRupee, BsArrowRepeat } from "react-icons/bs";
import { BsPerson, BsShieldLock, BsCheckCircle, BsExclamationCircle } from "react-icons/bs"
import { BsPieChartFill } from "react-icons/bs"


const DashboardPage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [bookingData, setBookingData] = useState<number[]>([15, 30, 20, 40, 25, 35, 20]);
  const [transactionsData, setTransactionsData] = useState<number[]>([60, 25, 15]);

  useEffect(() => {
    toast.success("Dashboard Loaded", { position: "top-right", autoClose: 2000 });
  }, []);

  const bookingChartOptions = {
    chart: {
      id: "booking-overview",
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    colors: ["#0d6efd"],
  };

  const transactionChartOptions: ApexCharts.ApexOptions = {
    labels: ["Success", "Pending", "Failed"],
    colors: ["#198754", "#ffc107", "#dc3545"],
  };
  

  return (
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <ToastContainer />
      <div className="d-flex flex-column flex-column-fluid py-2">
        <div className="card card-flush">
          <div className="card-header py-3">
            <h3 className="card-title fw-bold">Dashboard Overview</h3>
          </div>

          <div className="card-body">
            {/* Summary Cards */}
            <Row className="mb-4 g-4">
  {[
    { title: "Total Tenants", value: 12, icon: <BsBuilding size={28} className="text-primary" /> },
    { title: "Total Property Admins", value: 26, icon: <BsPeople size={28} className="text-success" /> },
    { title: "Total Transactions", value: "₹1.5L", icon: <BsCurrencyRupee size={28} className="text-info" /> },
    { title: "Refunds Processed", value: "₹15K", icon: <BsArrowRepeat size={28} className="text-danger" /> },
  ].map((item, idx) => (
    <Col md={6} xl={3} key={idx}>
      <Card className="shadow-sm border-0 h-100">
        <Card.Body className="d-flex align-items-center justify-content-between">
          <div>
            <h6 className="fw-bold text-muted mb-1">{item.title}</h6>
            <h3 className="fw-bolder text-dark">{item.value}</h3>
          </div>
          <div className="bg-light p-3 rounded-circle d-flex align-items-center justify-content-center">
            {item.icon}
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

            {/* Date Filter + Charts */}
            <Row className="mb-5">
              <Col md={6}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="fw-bold">Booking Overview</h6>
                      <div className="d-flex align-items-center gap-2">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          placeholderText="From"
                          className="form-control form-control-sm"
                        />
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          placeholderText="To"
                          className="form-control form-control-sm"
                        />
                      </div>
                    </div>
                    <Chart
                      options={bookingChartOptions}
                      series={[{ name: "Bookings", data: bookingData }]}
                      type="bar"
                      height={250}
                    />
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <h6 className="fw-bold mb-3">Transaction Status</h6>
                    <Chart
                      options={transactionChartOptions}
                      series={transactionsData}
                      type="donut"
                      height={270}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="g-4">
  {/* 👤 Recent User Activities */}
  <Col md={6}>
    <Card className="shadow-sm h-100 border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold text-dark mb-0">👤 Recent User Activities</h5>
        </div>
        <div className="list-group">
          <div className="list-group-item d-flex align-items-start justify-content-between border-0 px-0 py-3">
            <div className="d-flex align-items-center">
              <BsPerson className="text-primary me-3 fs-4" />
              <div>
                <div className="fw-bold text-dark">Harshal Patil</div>
                <small className="text-muted">Super Admin • Updated Tenant Access</small>
              </div>
            </div>
            <BsCheckCircle className="text-success fs-5" />
          </div>
          <div className="list-group-item d-flex align-items-start justify-content-between border-0 px-0 py-3">
            <div className="d-flex align-items-center">
              <BsPerson className="text-info me-3 fs-4" />
              <div>
                <div className="fw-bold text-dark">Tejas Khadake</div>
                <small className="text-muted">Property Admin • Approved Refund</small>
              </div>
            </div>
            <BsCheckCircle className="text-success fs-5" />
          </div>
        </div>
      </Card.Body>
    </Card>
  </Col>

  {/* ⚠️ Booking Issues */}
  <Col md={6}>
    <Card className="shadow-sm h-100 border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold text-dark mb-0">⚠️ Booking Issues</h5>
        </div>
        <div className="list-group">
          <div className="list-group-item d-flex align-items-start justify-content-between border-0 px-0 py-3">
            <div className="d-flex align-items-center">
              <BsExclamationCircle className="text-danger me-3 fs-4" />
              <div>
                <div className="fw-bold text-dark">Tejas Khadake</div>
                <small className="text-muted">Overbooking • Slot-Based</small>
              </div>
            </div>
            <span className="badge bg-danger rounded-pill px-3">Failed</span>
          </div>
          <div className="list-group-item d-flex align-items-start justify-content-between border-0 px-0 py-3">
            <div className="d-flex align-items-center">
              <BsExclamationCircle className="text-warning me-3 fs-4" />
              <div>
                <div className="fw-bold text-dark">Amit Sharma</div>
                <small className="text-muted">System Delay • Accommodation</small>
              </div>
            </div>
            <span className="badge bg-success rounded-pill px-3">Success</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  </Col>
</Row>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;



const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
