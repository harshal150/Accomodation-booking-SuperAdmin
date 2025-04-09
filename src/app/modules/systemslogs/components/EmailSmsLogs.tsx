import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import { BsSearch, BsEye, BsTrash, BsArrowRepeat } from "react-icons/bs";

interface Log {
  id: number;
  tenant: string;
  type: "Email" | "SMS";
  recipient: string;
  subject?: string; // Only for Email
  content: string;
  sentTime: string;
  status: "Success" | "Failed" | "Pending";
  message?: string;  // ✅ Add this property to fix the error

}

const EmailSmsLogs: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [filterTenant, setFilterTenant] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showLogModal, setShowLogModal] = useState(false);
const [selectedLog, setSelectedLog] = useState<Log | null>(null); // Store selected log details


  useEffect(() => {
    const logData: Log[] = [
      {
        id: 1,
        tenant: "Hotel Blue",
        type: "Email",
        recipient: "user1@example.com",
        subject: "Booking Confirmation",
        content: "Dear User, your booking is confirmed...",
        sentTime: "2024-02-20 12:30 PM",
        status: "Success",
        message: "Your booking has been confirmed. Thank you for choosing us!", 

      },
      {
        id: 2,
        tenant: "Co-Work Hub",
        type: "SMS",
        recipient: "+919876543210",
        content: "Your slot booking is successful.",
        sentTime: "2024-02-20 01:00 PM",
        status: "Pending",
        message: "Your payment is pending. Please try again.",
      },
      {
        id: 3,
        tenant: "Hotel Blue",
        type: "Email",
        recipient: "user2@example.com",
        subject: "Payment Failed",
        content: "We noticed a payment failure. Please try again.",
        sentTime: "2024-02-19 04:00 PM",
        status: "Failed",
        message: "Your payment has failed. Please try again.",
      },
    ];
    setLogs(logData);
    setFilteredLogs(logData);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredLogs(
      logs.filter(
        (log) =>
          log.recipient.toLowerCase().includes(query.toLowerCase()) ||
          (log.subject && log.subject.toLowerCase().includes(query.toLowerCase()))
      )
    );
  };

  const handleViewLog = (log: Log) => {
    setSelectedLog(log);
    setShowLogModal(true);
  };
  

  const handleDeleteConfirm = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true); // Open confirmation modal
  };
  
  const handleDelete = () => {
    if (deleteId !== null) {
      setLogs(logs.filter((log) => log.id !== deleteId));
      setFilteredLogs(filteredLogs.filter((log) => log.id !== deleteId));
    }
    setShowDeleteModal(false);
  };
  
  

  const handleResend = (id: number) => {
    alert(`Resending message with ID ${id}`);
  };


  const filterLogs = () => {
    let filtered = logs;
  
    if (searchQuery) {
      filtered = filtered.filter(
        (log) =>
          log.recipient?.toLowerCase().includes(searchQuery.toLowerCase()) ||  // ✅ Fix: Optional chaining
          log.subject?.toLowerCase().includes(searchQuery.toLowerCase())       // ✅ Fix: Optional chaining
      );
    }
  
    if (filterTenant !== "All") {
      filtered = filtered.filter((log) => log.tenant === filterTenant);
    }
  
    if (filterType !== "All") {
      filtered = filtered.filter((log) => log.type === filterType);
    }
  
    if (filterStatus !== "All") {
      filtered = filtered.filter((log) => log.status === filterStatus);
    }
  
    setFilteredLogs(filtered);
  };
  
  // Ensure filter runs when dependencies change
  useEffect(() => {
    filterLogs();
  }, [searchQuery, filterTenant, filterType, filterStatus, logs]);  // ✅ Ensure logs is in dependencies
  
  
  // Call this function whenever filters change
  useEffect(() => {
    filterLogs();
  }, [searchQuery, filterTenant, filterType, filterStatus]);
  

  return (
    <div className="app-main flex-column flex-row-fluid">
      <div className="d-flex flex-column flex-column-fluid py-2">
        <div className="card card-flush">
          <div className="card-header align-items-center py-3 gap-2 gap-md-12">
            <h3 className="card-title fw-bold">Automated Email/SMS Logs</h3>
          </div>

          {/* Filters & Search */}
      {/* Filters & Search */}
<div className="card-header align-items-center gap-2 flex-wrap d-flex">
  <InputGroup style={{ maxWidth: "230px" }}>
    <InputGroup.Text><BsSearch /></InputGroup.Text>
    <FormControl
      type="text"
      placeholder="Search by recipient or subject..."
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
    />
  </InputGroup>

  <div className="d-flex flex-wrap gap-2 ms-3">
    <Form.Select value={filterTenant} onChange={(e) => setFilterTenant(e.target.value)} style={{ width: "180px" }}>
      <option value="All">All Tenants</option>
      <option value="Hotel Blue">Hotel Blue</option>
      <option value="Co-Work Hub">Co-Work Hub</option>
    </Form.Select>

    <Form.Select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ width: "150px" }}>
      <option value="All">All Types</option>
      <option value="Email">Email</option>
      <option value="SMS">SMS</option>
    </Form.Select>

    <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ width: "150px" }}>
      <option value="All">All Status</option>
      <option value="Success">Success</option>
      <option value="Pending">Pending</option>
      <option value="Failed">Failed</option>
    </Form.Select>
  </div>
</div>


          {/* Table */}
          <div className="card-body pt-0">
            <Table striped bordered hover responsive className="shadow-sm">
              <thead style={{ backgroundColor: "#F1FAFF" }}>
                <tr className="fw-bold fs-7 text-center">
                  <th>ID</th>
                  <th>Tenant</th>
                  <th>Type</th>
                  <th>Recipient</th>
                  <th>Subject</th>
                  <th>Sent Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="text-center">
                    <td className="fw-bold">{log.id}</td>
                    <td className="fw-bold">{log.tenant}</td>
                    <td className="fw-bold">{log.type}</td>
                    <td className="fw-bold">{log.recipient}</td>
                    <td className="fw-bold">{log.subject || "N/A"}</td>
                    <td className="fw-bold">{log.sentTime}</td>
                    <td>
                      <span className={`badge ${log.status === "Success" ? "badge-success" : log.status === "Pending" ? "badge-warning" : "badge-danger"}`}>
                        {log.status}
                      </span>
                    </td>
                    <td>
                    <Button variant="light" size="sm" className="me-2 text-gray" onClick={() => handleViewLog(log)}>
  <BsEye />
</Button>

                      <Button variant="light" size="sm" className="me-2 text-gray" onClick={() => handleResend(log.id)}>
                        <BsArrowRepeat />
                      </Button>
                      <Button
  variant="light"
  size="sm"
  className="text-gray"
  onClick={() => handleDeleteConfirm(log.id)}
>
  <BsTrash />
</Button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <Modal show={showLogModal} onHide={() => setShowLogModal(false)} size="lg">
  <Modal.Header closeButton className="">
    <Modal.Title>
      <strong>{selectedLog?.type === "Email" ? "📧 Email Log" : "📩 SMS Log"}</strong>
    </Modal.Title>
  </Modal.Header>

  <Modal.Body className="p-4">
    {selectedLog ? (
      <div>
        {/* Basic Information */}
        <div className="mb-3">
          <p><strong>📌 Tenant:</strong> {selectedLog.tenant}</p>
          <p><strong>🎯 Recipient:</strong> {selectedLog.recipient}</p>
          {selectedLog.type === "Email" && <p><strong>✉️ Subject:</strong> {selectedLog.subject || "N/A"}</p>}
          <p><strong>📅 Sent Time:</strong> {selectedLog.sentTime}</p>
          <p>
            <strong>🟢 Status:</strong> 
            <span className={`badge ${selectedLog.status === "Success" ? "badge-success" : "badge-danger"} ms-2`}>
              {selectedLog.status}
            </span>
          </p>
        </div>

        <hr />

        {/* Message Content */}
        <h6 className="fw-bold text-primary">📝 Message Content:</h6>
        <div className="border p-3 bg-light rounded shadow-sm" style={{ maxHeight: "250px", overflowY: "auto" }}>
          {selectedLog.content || "No message content available."}
        </div>

        <hr />

        {/* Footer Actions */}
        <div className="d-flex justify-content-between">
          <Button variant="outline-primary" onClick={() => alert("Resend Feature Coming Soon!")}>
            🔄 Resend
          </Button>
          <Button variant="danger" onClick={() => alert("Deleting Feature Coming Soon!")}>
            🗑 Delete Log
          </Button>
        </div>
      </div>
    ) : (
      <p>Loading details...</p>
    )}
  </Modal.Body>

  <Modal.Footer className="d-flex justify-content-end">
    <Button variant="secondary" onClick={() => setShowLogModal(false)}>❌ Close</Button>
  </Modal.Footer>
</Modal>




<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
  <Modal.Header closeButton className="">
    <Modal.Title>⚠️ Confirm Deletion</Modal.Title>
  </Modal.Header>
  <Modal.Body className="text-center">
    <p className="fw-bold">Are you sure you want to delete this log?</p>
    <p className="text-muted">This action cannot be undone.</p>
  </Modal.Body>
  <Modal.Footer className="d-flex justify-content-between">
    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
      ❌ Cancel
    </Button>
    <Button variant="danger" onClick={handleDelete}>
      🗑 Delete
    </Button>
  </Modal.Footer>
</Modal>


    </div>
  );
};

export default EmailSmsLogs;
