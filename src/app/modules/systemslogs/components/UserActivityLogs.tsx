import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import { BsSearch, BsEye, BsTrash, BsArrowClockwise } from "react-icons/bs";

interface UserActivity {
  id: number;
  user: string;
  role: string;
  email: string;
  action: string;
  timestamp: string;
  status: string;
  details: string;
  deleted: boolean;
}

const UserActivityLogs: React.FC = () => {
  const [logs, setLogs] = useState<UserActivity[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<UserActivity[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState<UserActivity | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  useEffect(() => {
    const logData: UserActivity[] = [
      {
        id: 1,
        user: "Harshal Patil",
        role: "Super Admin",
        email: "admin@example.com",
        action: "Updated Tenant Module Access",
        timestamp: "2024-02-21 10:30 AM",
        status: "Success",
        details: "Modified access permissions for Hotel XYZ",
        deleted: false,
      },
      {
        id: 2,
        user: "Tejas Khadke",
        role: "Property Admin",
        email: "jane@example.com",
        action: "Approved Refund",
        timestamp: "2024-02-20 04:00 PM",
        status: "Pending",
        details: "Approved refund for guest ID #1234",
        deleted: false,
      },
      {
        id: 3,
        user: "Vineet Mishra",
        role: "Tenant",
        email: "mark@co-work.com",
        action: "Cancelled Booking",
        timestamp: "2024-02-19 06:15 PM",
        status: "Failed",
        details: "Cancellation request denied due to policy restrictions",
        deleted: false,
      },
    ];
    setLogs(logData);
    setFilteredLogs(logData);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterLogs(query, statusFilter, roleFilter, fromDate, toDate);
  };

  const handleApplyFilters = (status: string) => {
    let filtered = logs;
  
    if (searchQuery) {
      filtered = filtered.filter(
        (log) =>
          log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    if (status !== "all") {
      filtered = filtered.filter((log) => log.status.toLowerCase() === status.toLowerCase());
    }
  
    setFilteredLogs(filtered);
  };
  

  const filterLogs = (search: string, status: string, role: string, from: string, to: string) => {
    let filtered = logs;

    if (search) {
      filtered = filtered.filter(
        (log) =>
          log.user.toLowerCase().includes(search.toLowerCase()) ||
          log.email.toLowerCase().includes(search.toLowerCase()) ||
          log.role.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "all") {
      filtered = filtered.filter((log) => log.status.toLowerCase() === status.toLowerCase());
    }

    if (role !== "all") {
      filtered = filtered.filter((log) => log.role.toLowerCase() === role.toLowerCase());
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((log) => {
        const logDate = new Date(log.timestamp);
        return logDate >= fromDate && logDate <= toDate;
      });
    }

    setFilteredLogs(filtered);
  };

  const handleDeleteConfirm = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleSoftDelete = () => {
    setLogs(logs.map((log) => (log.id === deleteId ? { ...log, deleted: true } : log)));
    setFilteredLogs(filteredLogs.map((log) => (log.id === deleteId ? { ...log, deleted: true } : log)));
    setShowDeleteModal(false);
  };

  const handleViewLog = (log: UserActivity) => {
    setSelectedLog(log);
    setShowLogModal(true);
  };

  return (
    <div className="app-main flex-column flex-row-fluid">
      <div className="d-flex flex-column flex-column-fluid py-2">
        <div className="card card-flush">
          <div className="card-header align-items-center py-3 gap-2 gap-md-12">
            <h3 className="card-title fw-bold">User Activity Logs</h3>
          </div>

          <div className="card-header align-items-center gap-2 flex-wrap">
  <InputGroup style={{ maxWidth: "250px" }}>
    <InputGroup.Text><BsSearch /></InputGroup.Text>
    <FormControl
      type="text"
      placeholder="Search by name, email, or role..."
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
    />
  </InputGroup>

  <Form.Select value={statusFilter} onChange={(e) => {
      setStatusFilter(e.target.value);
      handleApplyFilters(e.target.value);
    }} 
    className="ms-2" 
    style={{ maxWidth: "150px" }}>
    <option value="all">All Status</option>
    <option value="Success">Success</option>
    <option value="Pending">Pending</option>
    <option value="Failed">Failed</option>
  </Form.Select>
</div>



          <div className="card-body pt-0">
            <Table striped bordered hover responsive className="shadow-sm">
            <thead style={{ backgroundColor: "#F1FAFF" }}>
  <tr>
    <th className="fw-bold">ID</th>
    <th className="fw-bold">User</th>
    <th className="fw-bold">Role</th>
    <th className="fw-bold">Action</th>
    <th className="fw-bold">Timestamp</th>
    <th className="fw-bold">Status</th>
    <th className="fw-bold">Actions</th>
  </tr>
</thead>
<tbody>
  {filteredLogs.map((log) => (
    <tr key={log.id}>
      <td className="fw-bold">{log.id}</td>
      <td className="fw-bold">{log.user}</td>
      <td className="fw-bold">{log.role}</td>
      <td className="fw-bold">{log.action}</td>
      <td className="fw-bold">{log.timestamp}</td>
      <td>
        <span className={`badge ${log.status === "Success" ? "badge-success" : log.status === "Failed" ? "badge-danger" : "badge-warning"}`}>
          {log.status}
        </span>
      </td>
      <td>
        <Button variant="light" size="sm" onClick={() => handleViewLog(log)}><BsEye /></Button>
        <Button variant="light" size="sm" className="ms-2" onClick={() => handleDeleteConfirm(log.id)}><BsTrash /></Button>
      </td>
    </tr>
  ))}
</tbody>

            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActivityLogs;
