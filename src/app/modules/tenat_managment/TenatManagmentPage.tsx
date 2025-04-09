import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import PropertyAdmins from './components/PropertyAdmins'
import ModuleAccess from './components/ModuleAccess'
import ManageTenants from './components/ManageTenants'
const invoicesBreadCrumbs: Array<PageLink> = [
    {
        title: 'Tenant Management',
        path: '/tenatmanage',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]

const TenatManagmentPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    path='propertyadmins'
                    element={
                        <>
                            {/* <PageTitle breadcrumbs={invoicesBreadCrumbs}>Tables</PageTitle> */}
                            <PropertyAdmins />
                        </>
                    }
                />
                <Route
                    path='moduleaccess'
                    element={
                        <>
                            {/* <PageTitle breadcrumbs={invoicesBreadCrumbs}>Tables</PageTitle> */}
                            <ModuleAccess />
                        </>
                    }
                />
                <Route
                    path='managetenants'
                    element={
                        <>
                            {/* <PageTitle breadcrumbs={invoicesBreadCrumbs}>Tables</PageTitle> */}
                            <ManageTenants />
                        </>
                    }
                />
            </Route>
        </Routes>
    )
}

export default TenatManagmentPage
