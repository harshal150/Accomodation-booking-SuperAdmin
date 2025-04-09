import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import { BsSearch, BsEye, BsFilter } from "react-icons/bs";

interface Transaction {
  id: number;
  tenant: string;
  amount: number;
  date: string;
  status: string;
  paymentMethod: string;
  transactionType: string;
  referenceId: string;
}

const TransactionMonitoring: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  useEffect(() => {
    // Mock data (Replace with API later)
    setTransactions([
      { id: 1, tenant: "Hotel Blue", amount: 1500, date: "2025-02-15", status: "Success", paymentMethod: "Credit Card", transactionType: "Payment", referenceId: "TXN12345" },
      { id: 2, tenant: "Co-Work Hub", amount: 750, date: "2025-02-16", status: "Pending", paymentMethod: "UPI", transactionType: "Refund", referenceId: "TXN67890" },
      { id: 3, tenant: "Hotel Blue", amount: 2100, date: "2025-02-14", status: "Failed", paymentMethod: "Net Banking", transactionType: "Payment", referenceId: "TXN54321" },
    ]);
    setFilteredTransactions([
      { id: 1, tenant: "Hotel Blue", amount: 1500, date: "2025-02-15", status: "Success", paymentMethod: "Credit Card", transactionType: "Payment", referenceId: "TXN12345" },
      { id: 2, tenant: "Co-Work Hub", amount: 750, date: "2025-02-16", status: "Pending", paymentMethod: "UPI", transactionType: "Refund", referenceId: "TXN67890" },
      { id: 3, tenant: "Hotel Blue", amount: 2100, date: "2025-02-14", status: "Failed", paymentMethod: "Net Banking", transactionType: "Payment", referenceId: "TXN54321" },
    ]);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterTransactions(query, statusFilter, dateRange);
  };

  const handleFilterChange = () => {
    filterTransactions(searchQuery, statusFilter, dateRange);
  };

  const filterTransactions = (query: string, status: string, dateRange: { from: string; to: string }) => {
    let filtered = transactions;

    if (query) {
      filtered = filtered.filter(
        (txn) =>
          txn.tenant.toLowerCase().includes(query.toLowerCase()) ||
          txn.referenceId.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (status !== "all") {
      filtered = filtered.filter((txn) => txn.status === status);
    }

    if (dateRange.from && dateRange.to) {
      const from = new Date(dateRange.from);
      const to = new Date(dateRange.to);
      filtered = filtered.filter((txn) => {
        const txnDate = new Date(txn.date);
        return txnDate >= from && txnDate <= to;
      });
    }

    setFilteredTransactions(filtered);
  };

  return (
    <div className="app-main flex-column flex-row-fluid">
      <div className="d-flex flex-column flex-column-fluid py-2">
        <div className="card card-flush">
          <div className="card-header align-items-center py-3 gap-2 gap-md-12">
            <h3 className="card-title fw-bold">Transaction Monitoring</h3>
          </div>

          {/* Filters & Search */}
      {/* Filters & Search (All in One Row) */}
{/* Filters & Search (Compact in One Row) */}
<div className="card-header align-items-center gap-2 flex-wrap d-flex">
  {/* Search Input */}
  <InputGroup style={{ maxWidth: "230px" }}>
    <InputGroup.Text><BsSearch /></InputGroup.Text>
    <FormControl
      type="text"
      placeholder="Search Tenant or Ref ID..."
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
    />
  </InputGroup>

  {/* Status Dropdown */}
  <Form.Select
    className="form-select-sm ms-2"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    style={{ width: "140px" }}
  >
    <option value="all">All Status</option>
    <option value="Success">Success</option>
    <option value="Pending">Pending</option>
    <option value="Failed">Failed</option>
  </Form.Select>

  {/* Date Filters */}
  <Form.Control 
    type="date" 
    className="form-control-sm ms-2" 
    value={dateRange.from} 
    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
    style={{ width: "150px" }}
  />
  <span className="mx-1">to</span>
  <Form.Control 
    type="date" 
    className="form-control-sm ms-1" 
    value={dateRange.to} 
    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
    style={{ width: "150px" }}
  />

  {/* Apply Button */}
  <Button variant="primary" className="ms-2" onClick={handleFilterChange}>
    <BsFilter /> Apply
  </Button>
</div>



          {/* Table */}
          <div className="card-body pt-0">
            <Table striped bordered hover responsive className="shadow-sm">
              <thead style={{ backgroundColor: "#F1FAFF" }}>
                <tr className="fw-bold fs-7 text-center">
                  <th>ID</th>
                  <th>Tenant</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Payment Method</th>
                  <th>Transaction Type</th>
                  <th>Reference ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
  {filteredTransactions.map((txn) => (
    <tr key={txn.id} className="text-center">
      <td className="fw-bold">{txn.id}</td>
      <td className="fw-bold">{txn.tenant}</td>
      <td className="fw-bold">₹ {txn.amount.toLocaleString()}</td>
      <td className="fw-bold">{txn.date}</td>
      <td>
        <span className={`badge ${txn.status === "Success" ? "badge-success" : txn.status === "Pending" ? "badge-warning" : "badge-danger"}`}>
          {txn.status}
        </span>
      </td>
      <td className="fw-bold">{txn.paymentMethod}</td>
      <td className="fw-bold">{txn.transactionType}</td>
      <td className="fw-bold">{txn.referenceId}</td>
      <td>
        <Button variant="light" size="sm" className="me-2 text-gray" onClick={() => { setSelectedTransaction(txn); setShowDetailsModal(true); }}>
          <BsEye />
        </Button>
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

export default TransactionMonitoring;
