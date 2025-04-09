import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, InputGroup, FormControl, Badge } from "react-bootstrap";
import { BsSearch, BsPencil, BsTrash, BsPlus, BsCheckCircleFill } from "react-icons/bs";




interface Tenant {
  location: string;
  id: number;
  name: string;
  businessType: string;
  totalProperties: number;
  totalAdmins: number;
  status: string;
  bookingType: string;
  clientAdmin?: {
    mid: string;
    fullName: string;
    uid: {
      email: string;
      phoneNumber: string;
      fullName: string;
    };
  };
}


const ManageTenants: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [filteredTenants, setFilteredTenants] = useState<Tenant[]>(tenants);
  useEffect(() => {
    setFilteredTenants(tenants);
  }, [tenants]);
  

  // const [newTenant, setNewTenant] = useState<Tenant>({
  //   id: 0, name: "", businessType: "", totalProperties: 0, totalAdmins: 0, status: "Active", bookingType: "",
  // });



  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  
    const filtered = tenants.filter(
      (tenant) =>
        tenant.name.toLowerCase().includes(query.toLowerCase()) ||
        tenant.businessType.toLowerCase().includes(query.toLowerCase()) ||
        tenant.status.toLowerCase().includes(query.toLowerCase()) ||
        tenant.bookingType.toLowerCase().includes(query.toLowerCase())
    );
  
    setFilteredTenants(filtered);
  };
  

  const handleEdit = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setShowEditModal(true);
  };
  

  const handleUpdateTenant = () => {
    setTenants(tenants.map((t) => (t.id === selectedTenant?.id ? selectedTenant : t)));
    setShowEditModal(false);
  };
  

  const handleDeleteConfirm = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };
  

  const handleDelete = () => {
    setTenants(tenants.filter((tenant) => tenant.id !== deleteId));
    setShowDeleteModal(false);
  };
  

  // const handleNextStep = () => {
  //   if (!newTenant.bookingType) {
  //     alert("Please select a booking type.");
  //     return;
  //   }
  //   setStep(2);
  // };

  // const handleAddTenant = () => {
  //   if (!newTenant.name || !newTenant.businessType || !newTenant.totalProperties || !newTenant.totalAdmins) {
  //     alert("Please fill all fields before adding a tenant.");
  //     return;
  //   }
  
  //   setTenants([...tenants, { ...newTenant, id: tenants.length + 1 }]);
  //   setShowAddModal(false);
  //   setStep(1);
  
  //   // Reset form after adding
  //   // setNewTenant({
  //   //   id: 0, name: "", businessType: "", totalProperties: 0, totalAdmins: 0, status: "Active", bookingType: "",
  //   // });
  // };
  

  const ACCESS_TOKEN = "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzYWdhciIsInN1YiI6ImFkbWluQGFkbWluLmNvbSIsImV4cCI6MTc0NDA5NzkxOSwiaWF0IjoxNzQ0MDk3MDE5LCJzY29wZSI6IiJ9.ahFNke4hlDi9_Nnsc_Wjj8BHOqXrDMO_2UGAzWK_qgMr2H_FLiTPKOxEJCgi_uq3Rh3qc3h4_vATj9jVgZ12_CcdvyZ7IdOpDdLETaqBhgOWUU03vNOyM719qjypIjxndHuDbpsgDjQrTyWKnQ1gKqZVOiZF9C627r6M61PiltspQ-HppmjSoxqla0vA_bcHqfG0e6pOt4PeK-61ItyF9SDX-BnritF6NN9TTSRsnVgYoAVa5JrzNyQpHCBSMgiLwYMyR-_NGJaGIDkPSLnCb6yAFdUAxm23vUTBpdCFwOBqekAJKHkjhyk1-y12BBCp4AwvMj4mRxwFF8cIYAbfIQ";

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://uat.api.payplatter.in:8080/accommodation/properties/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refreshToken")}`, // or however you store it
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
  
        const data = await response.json();
  
        // Transform the property data to match Tenant type temporarily
        const transformed: Tenant[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          businessType: item.propertyType,
          totalProperties: 0, // Not used here, dummy value
          totalAdmins: 0,     // Not used here, dummy value
          status: item.status,
          bookingType: "",    // Not used here, dummy value
          clientAdmin: item.clientAdmin,
        }));
  
        setTenants(transformed);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
  
    fetchProperties();
  }, []);
  
  

  return (
    <div className="app-main flex-column flex-row-fluid">
      <div className="d-flex flex-column flex-column-fluid py-2">
        <div className="card card-flush">
          <div className="card-header align-items-center py-3 gap-2 gap-md-12">
            <h3 className="card-title fw-bold">Manage Tenants</h3>
            <Button variant="success" onClick={() => setShowAddModal(true)}>
               Add Tenant
            </Button>
          </div>

          <div className="card-header align-items-center gap-2 flex-wrap">
            <InputGroup style={{ maxWidth: "300px" }}>
              <InputGroup.Text><BsSearch /></InputGroup.Text>
              <FormControl
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="card-body pt-0">
            <Table striped bordered hover responsive className="shadow-sm">
            <thead style={{ backgroundColor: "#F1FAFF" }}>
  <tr className="fw-bold fs-7">
    <th>Name</th>
    <th>Property Type</th>
    <th>Status</th>
    <th>MID</th>
    <th>Location</th>
    <th>Admin Name</th>
    <th>Email</th>
    <th>Phone Number</th>
  </tr>
</thead>

              <tbody>
  {filteredTenants.map((tenant) => (
    <tr key={tenant.id}>
      <td className="fw-bold">{tenant.name}</td>
      <td>{tenant.businessType}</td>
      <td>{tenant.status}</td>
      <td>{tenant.clientAdmin?.mid}</td>
      <td>{tenant.location || "—"}</td>
      <td>{tenant.clientAdmin?.uid.fullName}</td>
      <td>{tenant.clientAdmin?.uid.email}</td>
      <td>{tenant.clientAdmin?.uid.phoneNumber}</td>
    </tr>
  ))}
</tbody>


            </Table>
          </div>
        </div>
      </div>

{/* 
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Delete</Modal.Title>
  </Modal.Header>
  <Modal.Body>Are you sure you want to delete this tenant?</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
  </Modal.Footer>
</Modal> */}


      {/* ✅ Add Tenant Modal */}
      {/* <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{step === 1 ? "Select Booking Type" : "Enter Tenant Details"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step === 1 ? (
            <div className="d-flex gap-4 mb-8">
              <Button
                variant={newTenant.bookingType === "Accommodation" ? "primary" : "outline-primary"}
                className="w-50 p-3"
                onClick={() => setNewTenant({ ...newTenant, bookingType: "Accommodation" })}
              >
                Accommodation
              </Button>
              <Button
                variant={newTenant.bookingType === "Slot-Based" ? "primary" : "outline-primary"}
                className="w-50 p-3"
                onClick={() => setNewTenant({ ...newTenant, bookingType: "Slot-Based" })}
              >
                Slot-Based
              </Button>
            </div>
          ) : (
            <Form>
            <Form.Group controlId="tenantName">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                value={newTenant.name} 
                onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })} 
              />
            </Form.Group>
    
            <Form.Group controlId="businessType">
              <Form.Label>Business Type</Form.Label>
              <Form.Control 
                type="text" 
                value={newTenant.businessType} 
                onChange={(e) => setNewTenant({ ...newTenant, businessType: e.target.value })} 
              />
            </Form.Group>
    
            <Form.Group controlId="totalProperties">
              <Form.Label>Total Properties</Form.Label>
              <Form.Control 
                type="number" 
                value={newTenant.totalProperties} 
                onChange={(e) => setNewTenant({ ...newTenant, totalProperties: Number(e.target.value) })} 
              />
            </Form.Group>
    
            <Form.Group controlId="totalAdmins">
              <Form.Label>Total Admins</Form.Label>
              <Form.Control 
                type="number" 
                value={newTenant.totalAdmins} 
                onChange={(e) => setNewTenant({ ...newTenant, totalAdmins: Number(e.target.value) })} 
              />
            </Form.Group>
    
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select 
                value={newTenant.status} 
                onChange={(e) => setNewTenant({ ...newTenant, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
    
            <Button variant="success" className="mt-3 float-end" onClick={handleAddTenant}>
              Add Tenant
            </Button>
          </Form>
          )}
          {step === 1 && <Button className="mt-3 float-end" onClick={handleNextStep}>Next</Button>}
        </Modal.Body>
      </Modal> */}


      {/* <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Tenant</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="editTenantName">
        <Form.Label>Name</Form.Label>
        <Form.Control 
          type="text" 
          value={selectedTenant?.name || ''} 
          onChange={(e) => setSelectedTenant({ ...selectedTenant!, name: e.target.value })}
        />
      </Form.Group>

      <Form.Group controlId="editBusinessType">
        <Form.Label>Business Type</Form.Label>
        <Form.Control 
          type="text" 
          value={selectedTenant?.businessType || ''} 
          onChange={(e) => setSelectedTenant({ ...selectedTenant!, businessType: e.target.value })}
        />
      </Form.Group>

      <Form.Group controlId="editTotalProperties">
        <Form.Label>Total Properties</Form.Label>
        <Form.Control 
          type="number" 
          value={selectedTenant?.totalProperties || ''} 
          onChange={(e) => setSelectedTenant({ ...selectedTenant!, totalProperties: Number(e.target.value) })}
        />
      </Form.Group>

      <Form.Group controlId="editTotalAdmins">
        <Form.Label>Total Admins</Form.Label>
        <Form.Control 
          type="number" 
          value={selectedTenant?.totalAdmins || ''} 
          onChange={(e) => setSelectedTenant({ ...selectedTenant!, totalAdmins: Number(e.target.value) })}
        />
      </Form.Group>

      <Form.Group controlId="editStatus">
        <Form.Label>Status</Form.Label>
        <Form.Select 
          value={selectedTenant?.status || ''} 
          onChange={(e) => setSelectedTenant({ ...selectedTenant!, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" className="mt-3 float-end" onClick={handleUpdateTenant}>
        Update Tenant
      </Button>
    </Form>
  </Modal.Body>
</Modal> */}

    </div>
  );
};

export default ManageTenants;
