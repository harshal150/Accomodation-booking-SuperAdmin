import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import { BsSearch, BsExclamationTriangle, BsTrash, BsArrowRepeat } from "react-icons/bs";

interface BookingIssue {
  id: number;
  tenant: string;
  user: string;
  bookingType: string;
  issueType: string;
  issueDetails: string;
  timestamp: string;
  status: string;
  deleted: boolean;
}

const BookingIssueAlerts: React.FC = () => {
  const [issues, setIssues] = useState<BookingIssue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<BookingIssue[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<BookingIssue | null>(null);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const issueData: BookingIssue[] = [
      {
        id: 1,
        tenant: "Hotel Blue",
        user: "Harshal Patil",
        bookingType: "Accommodation",
        issueType: "Payment Failure",
        issueDetails: "Payment gateway error. Transaction declined.",
        timestamp: "2024-02-22 10:30 AM",
        status: "Pending",
        deleted: false,
      },
      {
        id: 2,
        tenant: "Co-Work Hub",
        user: "Tejas Khadake",
        bookingType: "Slot-Based",
        issueType: "Overbooking",
        issueDetails: "Slot already assigned. No available slots.",
        timestamp: "2024-02-21 03:45 PM",
        status: "Failed",
        deleted: false,
      },
      {
        id: 3,
        tenant: "Hotel Blue",
        user: "Amit Sharma",
        bookingType: "Accommodation",
        issueType: "System Delay",
        issueDetails: "Booking confirmation delayed due to server timeout.",
        timestamp: "2024-02-20 05:15 PM",
        status: "Success",
        deleted: false,
      },
    ];
    setIssues(issueData);
    setFilteredIssues(issueData);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterIssues(query, statusFilter, fromDate, toDate);
  };

  const filterIssues = (search: string, status: string, from: string, to: string) => {
    let filtered = [...issues]; // Copy original list
  
    if (search) {
      filtered = filtered.filter(
        (issue) =>
          issue.user.toLowerCase().includes(search.toLowerCase()) ||
          issue.tenant.toLowerCase().includes(search.toLowerCase()) ||
          issue.issueType.toLowerCase().includes(search.toLowerCase())
      );
    }
  
    if (status !== "all") {
      filtered = filtered.filter((issue) => issue.status.toLowerCase() === status.toLowerCase());
    }
  
    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((issue) => {
        const issueDate = new Date(issue.timestamp);
        return issueDate >= fromDate && issueDate <= toDate;
      });
    }
  
    setFilteredIssues(filtered);
  };
  

  const handleApplyFilters = () => {
    filterIssues(searchQuery, statusFilter, fromDate, toDate);
  };

  const handleDeleteConfirm = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true); // Opens the delete confirmation modal
  };
  
  const handleSoftDelete = () => {
    setIssues(issues.map((issue) => 
      issue.id === deleteId ? { ...issue, deleted: true } : issue
    ));
    setFilteredIssues(filteredIssues.map((issue) => 
      issue.id === deleteId ? { ...issue, deleted: true } : issue
    ));
    setShowDeleteModal(false);
  };
  

  const handleViewIssue = (issue: BookingIssue) => {
    setSelectedIssue(issue);
    setShowIssueModal(true);
  };

  return (
    <div className="app-main flex-column flex-row-fluid">
      <div className="d-flex flex-column flex-column-fluid py-2">
        <div className="card card-flush">
          <div className="card-header align-items-center py-3 gap-2 gap-md-12">
            <h3 className="card-title fw-bold">Booking Issue Alerts</h3>
          </div>

          {/* Filters */}
          <div className="card-header align-items-center gap-2 flex-wrap d-flex justify-content-between">
  <InputGroup style={{ maxWidth: "250px" }}>
    <InputGroup.Text><BsSearch /></InputGroup.Text>
    <FormControl
      type="text"
      placeholder="Search by user, tenant, or issue type..."
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
    />
  </InputGroup>

  <Form.Select
  value={statusFilter}
  onChange={(e) => {
    setStatusFilter(e.target.value);
    filterIssues(searchQuery, e.target.value, fromDate, toDate); // Calls filter function directly
  }}
  style={{ maxWidth: "150px" }}
>
  <option value="all">All Status</option>
  <option value="Pending">Pending</option>
  <option value="Failed">Failed</option>
  <option value="Success">Success</option>
</Form.Select>

</div>

          {/* Table */}
         <div className="card-body pt-0">
  <Table striped bordered hover responsive className="shadow-sm">
    <thead style={{ backgroundColor: "#F1FAFF" }}>
      <tr>
        <th className="fw-bold">ID</th>
        <th className="fw-bold">Tenant</th>
        <th className="fw-bold">User</th>
        <th className="fw-bold">Booking Type</th>
        <th className="fw-bold">Issue Type</th>
        <th className="fw-bold">Timestamp</th>
        <th className="fw-bold">Status</th>
        <th className="fw-bold">Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredIssues.map((issue) => (
        <tr key={issue.id}>
          <td className="fw-bold">{issue.id}</td>
          <td className="fw-bold">{issue.tenant}</td>
          <td className="fw-bold">{issue.user}</td>
          <td className="fw-bold">{issue.bookingType}</td>
          <td className="fw-bold">{issue.issueType}</td>
          <td className="fw-bold">{issue.timestamp}</td>
          <td className="fw-bold">
            <span className={`badge ${issue.status === "Pending" ? "badge-warning" : issue.status === "Failed" ? "badge-danger" : "badge-success"}`}>
              {issue.status}
            </span>
          </td>
          <td>
            <Button variant="light" size="sm" onClick={() => handleViewIssue(issue)}><BsExclamationTriangle /></Button>
            <Button variant="light" size="sm" className="ms-2" onClick={() => handleDeleteConfirm(issue.id)}>
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Deletion</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Are you sure you want to soft delete this booking issue?</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
      Cancel
    </Button>
    <Button variant="danger" onClick={handleSoftDelete}>
      Yes, Delete
    </Button>
  </Modal.Footer>
</Modal>



<Modal show={showIssueModal} onHide={() => setShowIssueModal(false)} centered size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Issue Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedIssue ? (
      <div>
        <p><strong>Tenant:</strong> {selectedIssue.tenant}</p>
        <p><strong>User:</strong> {selectedIssue.user}</p>
        <p><strong>Booking Type:</strong> {selectedIssue.bookingType}</p>
        <p><strong>Issue Type:</strong> {selectedIssue.issueType}</p>
        <p><strong>Timestamp:</strong> {selectedIssue.timestamp}</p>
        <p><strong>Status:</strong> 
          <span className={`badge ${selectedIssue.status === "Pending" ? "badge-warning" 
            : selectedIssue.status === "Failed" ? "badge-danger" : "badge-success"}`}>
            {selectedIssue.status}
          </span>
        </p>
        <hr />
        <h6 className="fw-bold">Issue Details:</h6>
        <div className="border p-3 bg-light" style={{ maxHeight: "250px", overflowY: "auto" }}>
          {selectedIssue.issueDetails}
        </div>
      </div>
    ) : (
      <p>Loading issue details...</p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowIssueModal(false)}>Close</Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default BookingIssueAlerts;
