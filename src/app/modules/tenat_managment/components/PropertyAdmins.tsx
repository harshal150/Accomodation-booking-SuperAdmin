import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import { BsSearch, BsPencil, BsTrash, BsPlus } from "react-icons/bs";

interface PropertyAdmin {
  id: number;
  name: string;
  email: string;
  phone: string;
  property: string;
  status: string;
}

const PropertyAdmins: React.FC = () => {
  const [admins, setAdmins] = useState<PropertyAdmin[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<PropertyAdmin[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<PropertyAdmin | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // New Admin State
  const [newAdmin, setNewAdmin] = useState<PropertyAdmin>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    property: "Hotel Blue", // Default selected
    status: "Active", // Default selected
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const adminData = [
      { id: 1, name: "Harshal Patil", email: "Harshal@gmail.com", phone: "9876543210", property: "Hotel Blue", status: "Active" },
      { id: 2, name: "Tejas Khadke", email: "Tejas@gmail.com", phone: "9876543211", property: "Co-Work Hub", status: "Inactive" },
    ];
    setAdmins(adminData);
    setFilteredAdmins(adminData);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredAdmins(
      admins.filter(
        (admin) =>
          admin.name.toLowerCase().includes(query.toLowerCase()) ||
          admin.email.toLowerCase().includes(query.toLowerCase()) ||
          admin.property.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleEdit = (admin: PropertyAdmin) => {
    setSelectedAdmin(admin);
    setShowEditModal(true);
  };

  const handleDeleteConfirm = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setAdmins(admins.filter((admin) => admin.id !== deleteId));
    setFilteredAdmins(filteredAdmins.filter((admin) => admin.id !== deleteId));
    setShowDeleteModal(false);
  };

  const handleAddAdmin = () => {
    setAdmins([...admins, { ...newAdmin, id: admins.length + 1 }]);
    setFilteredAdmins([...filteredAdmins, { ...newAdmin, id: admins.length + 1 }]);
    setShowAddModal(false);
  };


  const handleUpdateAdmin = () => {
    if (!selectedAdmin) return;
  
    setAdmins((prevAdmins) =>
      prevAdmins.map((admin) =>
        admin.id === selectedAdmin.id ? selectedAdmin : admin
      )
    );
  
    setFilteredAdmins((prevAdmins) =>
      prevAdmins.map((admin) =>
        admin.id === selectedAdmin.id ? selectedAdmin : admin
      )
    );
  
    setShowEditModal(false);
  };
  
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredAdmins.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredAdmins.length / rowsPerPage);

  return (
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid py-2">
        <div className="card card-flush">
          <div className="card-header align-items-center py-3 gap-2 gap-md-12">
            <h3 className="card-title fw-bold"> Admins</h3>
            <Button variant="success" onClick={() => setShowAddModal(true)}>
              <BsPlus /> Add Property Admin
            </Button>
          </div>

          {/* Search Bar */}
          <div className="card-header align-items-center gap-2 flex-wrap">
            <div className="position-relative ms-3">
              <InputGroup>
                <InputGroup.Text><BsSearch /></InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Search by name, email, or property..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </InputGroup>
            </div>
          </div>

          {/* Table */}
          <div className="card-body pt-0">
            <div className="table-responsive">
              <Table striped bordered hover responsive className="shadow-sm">
                <thead style={{ backgroundColor: "#F1FAFF" }}>
                  <tr className="fw-bold fs-7">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Tenant</th> {/* Updated column name */}
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((admin) => (
                    <tr key={admin.id} className="fs-7 hover-effect">
                      <td className="fw-bold">{admin.id}</td>
                      <td className="fw-bold">{admin.name}</td>
                      <td className="fw-bold">{admin.email}</td>
                      <td className="fw-bold">{admin.phone}</td>
                      <td className="fw-bold">{admin.property}</td>
                      <td>
                        <span className={`badge ${admin.status === "Active" ? "badge-success" : "badge-danger"}`}>
                          {admin.status}
                        </span>
                      </td>
                      <td>
                        <Button variant="light" size="sm" className="me-2 text-gray" onClick={() => handleEdit(admin)}>
                          <BsPencil />
                        </Button>
                        <Button variant="light" size="sm" className="text-gray" onClick={() => handleDeleteConfirm(admin.id)}>
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

      {/* Delete Confirmation Modal */}
<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title className="fw-bold text-danger">Confirm Deletion</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p className="text-center">
      Are you sure you want to delete this Property Admin? This action cannot be undone.
    </p>
  </Modal.Body>
  <Modal.Footer className="d-flex justify-content-center">
    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
    <Button variant="danger" className="ms-2" onClick={handleDelete}>Delete</Button>
  </Modal.Footer>
</Modal>


      {/* Add Admin Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title className="fw-bold">Add Property Admin</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="adminName" className="mb-3">
        <Form.Label className="fw-bold">Name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter name"
          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })} 
        />
      </Form.Group>

      <Form.Group controlId="adminEmail" className="mb-3">
        <Form.Label className="fw-bold">Email</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email"
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} 
        />
      </Form.Group>

      <Form.Group controlId="adminPhone" className="mb-3">
        <Form.Label className="fw-bold">Phone</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter phone number"
          onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })} 
        />
      </Form.Group>

      {/* Tenant Dropdown */}
      <Form.Group controlId="adminTenant" className="mb-3">
        <Form.Label className="fw-bold">Tenant</Form.Label>
        <Form.Select 
          onChange={(e) => setNewAdmin({ ...newAdmin, property: e.target.value })}
        >
          <option value="Hotel Blue">Hotel Blue</option>
          <option value="Co-Work Hub">Co-Work Hub</option>
        </Form.Select>
      </Form.Group>

      {/* Status Dropdown */}
      <Form.Group controlId="adminStatus" className="mb-3">
        <Form.Label className="fw-bold">Status</Form.Label>
        <Form.Select 
          onChange={(e) => setNewAdmin({ ...newAdmin, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Form.Select>
      </Form.Group>
    </Form>
  </Modal.Body>

  {/* Buttons with Proper Alignment */}
  <Modal.Footer className="d-flex justify-content-end">
    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
    <Button variant="success" className="ms-2" onClick={handleAddAdmin}>Add Property Admin</Button>
  </Modal.Footer>
</Modal>



{/* Edit Admin Modal */}
<Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title className="fw-bold">Edit Property Admin</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="editAdminName" className="mb-3">
        <Form.Label className="fw-bold">Name</Form.Label>
        <Form.Control 
          type="text" 
          value={selectedAdmin?.name || ""}
          onChange={(e) => setSelectedAdmin({ ...selectedAdmin!, name: e.target.value })}
        />
      </Form.Group>

      <Form.Group controlId="editAdminEmail" className="mb-3">
        <Form.Label className="fw-bold">Email</Form.Label>
        <Form.Control 
          type="email" 
          value={selectedAdmin?.email || ""}
          onChange={(e) => setSelectedAdmin({ ...selectedAdmin!, email: e.target.value })}
        />
      </Form.Group>

      <Form.Group controlId="editAdminPhone" className="mb-3">
        <Form.Label className="fw-bold">Phone</Form.Label>
        <Form.Control 
          type="text" 
          value={selectedAdmin?.phone || ""}
          onChange={(e) => setSelectedAdmin({ ...selectedAdmin!, phone: e.target.value })}
        />
      </Form.Group>

      {/* Tenant Dropdown */}
      <Form.Group controlId="editAdminTenant" className="mb-3">
        <Form.Label className="fw-bold">Tenant</Form.Label>
        <Form.Select 
          value={selectedAdmin?.property || ""}
          onChange={(e) => setSelectedAdmin({ ...selectedAdmin!, property: e.target.value })}
        >
          <option value="Hotel Blue">Hotel Blue</option>
          <option value="Co-Work Hub">Co-Work Hub</option>
        </Form.Select>
      </Form.Group>

      {/* Status Dropdown */}
      <Form.Group controlId="editAdminStatus" className="mb-3">
        <Form.Label className="fw-bold">Status</Form.Label>
        <Form.Select 
          value={selectedAdmin?.status || ""}
          onChange={(e) => setSelectedAdmin({ ...selectedAdmin!, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Form.Select>
      </Form.Group>
    </Form>
  </Modal.Body>

  <Modal.Footer className="d-flex justify-content-end">
    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
    <Button variant="success" className="ms-2" onClick={() => handleUpdateAdmin()}>Save Changes</Button>
  </Modal.Footer>
</Modal>


    </div>
  );
};

export default PropertyAdmins;
