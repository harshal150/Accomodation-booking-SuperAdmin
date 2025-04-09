import React, { useState, useEffect } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";

interface Permission {
  view: boolean;
  edit: boolean;
  delete: boolean;
}

interface TenantModule {
  id: number;
  name: string;
  accommodation: boolean;
  slotBooking: boolean;
  subModules: {
    [category: string]: { [subModule: string]: Permission };
  };
}

const ModuleAccess: React.FC = () => {
  const [tenants, setTenants] = useState<TenantModule[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<TenantModule | null>(null);
  const [showModal, setShowModal] = useState(false); // Manage Access Modal

  useEffect(() => {
    setTenants([
      {
        id: 1,
        name: "Hotel XYZ",
        accommodation: true,
        slotBooking: false,
        subModules: {
          "Accommodation Management": {
            "Room Categories": { view: true, edit: true, delete: false },
            "Room Inventory": { view: true, edit: true, delete: true },
            "Booking Calendar": { view: true, edit: false, delete: false },
          },
          "Financial & Billing": {
            "Generate Invoices": { view: true, edit: true, delete: false },
            "Refund Processing": { view: true, edit: false, delete: false },
          },
        },
      },
      {
        id: 2,
        name: "Co-Working Hub",
        accommodation: false,
        slotBooking: true,
        subModules: {
          "Slot Booking Management": {
            "Available Slots": { view: true, edit: false, delete: false },
            "Slot Booking": { view: true, edit: true, delete: false },
          },
          "Access Control": {
            "Grant Access": { view: true, edit: false, delete: false },
            "Audit Logs": { view: true, edit: true, delete: true },
          },
        },
      },
    ]);
  }, []);

  const handleToggle = (id: number, type: "accommodation" | "slotBooking") => {
    setTenants((prevTenants) =>
      prevTenants.map((tenant) =>
        tenant.id === id ? { ...tenant, [type]: !tenant[type] } : tenant
      )
    );
  };

  const handlePermissionChange = (
    category: string,
    moduleName: string,
    permissionType: keyof Permission
  ) => {
    if (!selectedTenant) return;
  
    // Create a deep copy to ensure React detects the state change
    const updatedTenant = { ...selectedTenant, subModules: { ...selectedTenant.subModules } };
    updatedTenant.subModules[category] = { ...updatedTenant.subModules[category] };
    updatedTenant.subModules[category][moduleName] = { ...updatedTenant.subModules[category][moduleName] };
  
    // Toggle the selected permission
    updatedTenant.subModules[category][moduleName][permissionType] =
      !updatedTenant.subModules[category][moduleName][permissionType];
  
    setSelectedTenant(updatedTenant); // Update state
  };
  
  

  const handleOpenModal = (tenant: TenantModule) => {
    setSelectedTenant(tenant);
    setShowModal(true);
  };

  return (
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid py-2">
        <div className="card card-flush">
          <div className="card-header align-items-center py-3 gap-2 gap-md-12">
            <h3 className="card-title fw-bold">Module Access Management</h3>
          </div>

          <div className="card-body pt-0">
            <Table striped bordered hover responsive className="shadow-sm">
              <thead style={{ backgroundColor: "#F1FAFF" }}>
                <tr className="fw-bold fs-7 text-center">
                  <th className="fw-bold text-center" style={{ width: "80px" }}>ID</th>
                  <th className="fw-bold text-center" style={{ width: "200px" }}>Tenant Name</th>
                  <th className="fw-bold text-center" style={{ width: "100px" }}>Accommodation</th>
                  <th className="fw-bold text-center" style={{ width: "100px" }}>Slot-Based</th>
                  <th className="fw-bold text-center" style={{ width: "350px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant) => (
                  <tr key={tenant.id} className="text-center align-middle">
                    <td className="fw-bold align-middle">{tenant.id}</td>
                    <td className="fw-bold align-middle">{tenant.name}</td>
                    <td className="align-middle">
                      <Form.Check
                        type="switch"
                        checked={tenant.accommodation}
                        onChange={() => handleToggle(tenant.id, "accommodation")}
                      />
                    </td>
                    <td className="align-middle">
                      <Form.Check
                        type="switch"
                        checked={tenant.slotBooking}
                        onChange={() => handleToggle(tenant.id, "slotBooking")}
                      />
                    </td>
                    <td className="align-middle">
                      <Button variant="primary" size="sm" onClick={() => handleOpenModal(tenant)}>
                        Manage Access
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* ✅ Manage Access Modal ✅ */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Manage Access for {selectedTenant?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTenant && Object.keys(selectedTenant.subModules).map((category) => (
            <div key={category} className="mb-3">
              <h6 className="fw-bold text-primary">{category}</h6>
              <Table striped bordered className="small">
                <thead>
                  <tr>
                    <th>Sub-Module</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(selectedTenant.subModules[category]).map((moduleName) => (
                    <tr key={moduleName}>
                      <td>{moduleName}</td>
                      <td>
                      <Form.Check
  type="checkbox"
  checked={selectedTenant.subModules[category][moduleName].view}
  onChange={() => handlePermissionChange(category, moduleName, "view")}
/>
                      </td>
                      <td>
                      <Form.Check
  type="checkbox"
  checked={selectedTenant.subModules[category][moduleName].edit}
  onChange={() => handlePermissionChange(category, moduleName, "edit")}
/>
                      </td>
                      <td>
                      <Form.Check
  type="checkbox"
  checked={selectedTenant.subModules[category][moduleName].delete}
  onChange={() => handlePermissionChange(category, moduleName, "delete")}
/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="success" onClick={() => setShowModal(false)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModuleAccess;
