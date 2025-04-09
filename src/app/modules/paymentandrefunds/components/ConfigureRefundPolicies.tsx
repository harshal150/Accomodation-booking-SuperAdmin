import React, { useState, useEffect } from "react";
import { Table, Form, Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { BsPencil, BsTrash, BsPlus, BsFilter, BsSearch } from "react-icons/bs";

interface RefundPolicy {
  id: number;
  tenant: string;
  refundType: string;
  approvalType: string;
  refundPercentage: number;
  cancellationWindow: string;
  thresholdAmount: number;
  status: string;
}

const ConfigureRefundPolicies: React.FC = () => {
  const [refundPolicies, setRefundPolicies] = useState<RefundPolicy[]>([]);
  const [filteredPolicies, setFilteredPolicies] = useState<RefundPolicy[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<RefundPolicy | null>(null);
  const [newPolicy, setNewPolicy] = useState<RefundPolicy>({
    id: 0,
    tenant: "Hotel Blue",
    refundType: "Full Refund",
    approvalType: "Automatic",
    refundPercentage: 100,
    cancellationWindow: "24 Hours",
    thresholdAmount: 1000,
    status: "Active",
  });

  useEffect(() => {
    const policyData = [
      { id: 1, tenant: "Hotel Blue", refundType: "Partial Refund", approvalType: "Manual", refundPercentage: 50, cancellationWindow: "48 Hours", thresholdAmount: 500, status: "Active" },
      { id: 2, tenant: "Co-Work Hub", refundType: "Full Refund", approvalType: "Automatic", refundPercentage: 100, cancellationWindow: "24 Hours", thresholdAmount: 2000, status: "Inactive" },
    ];
    setRefundPolicies(policyData);
    setFilteredPolicies(policyData);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredPolicies(
      refundPolicies.filter(
        (policy) =>
          policy.tenant.toLowerCase().includes(query.toLowerCase()) ||
          policy.refundType.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleAddPolicy = () => {
    setRefundPolicies([...refundPolicies, { ...newPolicy, id: refundPolicies.length + 1 }]);
    setFilteredPolicies([...filteredPolicies, { ...newPolicy, id: refundPolicies.length + 1 }]);
    setShowAddModal(false);
  };

  const handleEdit = (policy: RefundPolicy) => {
    setSelectedPolicy(policy);
    setShowEditModal(true);
  };

  const handleUpdatePolicy = () => {
    setRefundPolicies(refundPolicies.map((p) => (p.id === selectedPolicy?.id ? selectedPolicy : p)));
    setFilteredPolicies(filteredPolicies.map((p) => (p.id === selectedPolicy?.id ? selectedPolicy : p)));
    setShowEditModal(false);
  };

  const handleDeleteConfirm = (policy: RefundPolicy) => {
    setSelectedPolicy(policy);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setRefundPolicies(refundPolicies.filter((p) => p.id !== selectedPolicy?.id));
    setFilteredPolicies(filteredPolicies.filter((p) => p.id !== selectedPolicy?.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid py-2">
        <div className="card card-flush">
          <div className="card-header align-items-center py-3 gap-2 gap-md-12">
            <h3 className="card-title fw-bold">Configure Refund Policies</h3>
            <Button variant="success" onClick={() => setShowAddModal(true)}>
              <BsPlus /> Add Refund Policy
            </Button>
          </div>

          {/* Filters & Search */}
          <div className="card-header align-items-center gap-2 flex-wrap d-flex">
  {/* Search Input */}
  <InputGroup style={{ maxWidth: "230px" }}>
    <InputGroup.Text><BsSearch /></InputGroup.Text>
    <FormControl
      type="text"
      placeholder="Search by Tenant or Refund Type..."
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
    />
  </InputGroup>
</div>

          {/* Table */}
          <div className="card-body pt-0">
          <Table striped bordered hover responsive className="shadow-sm">
  <thead style={{ backgroundColor: "#F1FAFF" }}>
    <tr className="fw-bold fs-7 text-center">
      <th>ID</th>
      <th>Tenant</th>
      <th>Refund Type</th>
      <th>Approval Type</th>
      <th>Refund %</th>
      <th>Cancellation Window</th>
      <th>Threshold Amount</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredPolicies.map((policy) => (
      <tr key={policy.id} className="text-center">
        <td className="fw-bold">{policy.id}</td>
        <td className="fw-bold">{policy.tenant}</td>
        <td className="fw-bold">{policy.refundType}</td>
        <td className="fw-bold">{policy.approvalType}</td>
        <td className="fw-bold">{policy.refundPercentage}%</td>
        <td className="fw-bold">{policy.cancellationWindow}</td>
        <td className="fw-bold">₹{policy.thresholdAmount.toLocaleString()}</td> {/* ₹ instead of $ */}
        <td>
          <span className={`badge ${policy.status === "Active" ? "badge-success" : "badge-danger"}`}>
            {policy.status}
          </span>
        </td>
        <td>
          <Button variant="light" size="sm" className="me-2 text-gray" onClick={() => handleEdit(policy)}>
            <BsPencil />
          </Button>
          <Button variant="light" size="sm" className="text-gray" onClick={() => handleDeleteConfirm(policy)}>
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
    </div>
  );
};

export default ConfigureRefundPolicies;
