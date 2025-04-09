import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import EmailSmsLogs from './components/EmailSmsLogs'
import UserActivityLogs from './components/UserActivityLogs'
import BookingIssueAlerts from './components/BookingIssueAlerts'
const invoicesBreadCrumbs: Array<PageLink> = [
    {
        title: 'Systems Logs ',
        path: '/systemlogs',
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

const SystemsLogsPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    path='emailsmslogs'
                    element={
                        <>
                            {/* <PageTitle breadcrumbs={invoicesBreadCrumbs}>Tables</PageTitle> */}
                            <EmailSmsLogs />
                        </>
                    }
                />
                <Route
                    path='useractivitylogs'
                    element={
                        <>
                            {/* <PageTitle breadcrumbs={invoicesBreadCrumbs}>Tables</PageTitle> */}
                            <UserActivityLogs />
                        </>
                    }
                />
                <Route
                    path='bookingissuealert'
                    element={
                        <>
                            {/* <PageTitle breadcrumbs={invoicesBreadCrumbs}>Tables</PageTitle> */}
                            <BookingIssueAlerts />
                        </>
                    }
                />
            </Route>
        </Routes>
    )
}

export default SystemsLogsPage
