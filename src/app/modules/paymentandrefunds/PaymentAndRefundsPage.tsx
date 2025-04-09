import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import TransactionMonitoring from './components/TransactionMonitoring'
import ConfigureRefundPolicies from './components/ConfigureRefundPolicies'
const invoicesBreadCrumbs: Array<PageLink> = [
    {
        title: 'Payment and Refunds ',
        path: '/paymentandrefund',
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

const PaymentAndRefundsPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    path='transactionmonitoring'
                    element={
                        <>
                            {/* <PageTitle breadcrumbs={invoicesBreadCrumbs}>Tables</PageTitle> */}
                            <TransactionMonitoring />
                        </>
                    }
                />
                <Route
                    path='refundpolicies'
                    element={
                        <>
                            {/* <PageTitle breadcrumbs={invoicesBreadCrumbs}>Tables</PageTitle> */}
                            <ConfigureRefundPolicies />
                        </>
                    }
                />
               
            </Route>
        </Routes>
    )
}

export default PaymentAndRefundsPage
