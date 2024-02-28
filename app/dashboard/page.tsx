import { fetchLatestInvoices, fetchRevenue } from "@/app/lib/data"
import { lusitana } from "../ui/fonts"
import RevenueChart from "../ui/dashboard/revenue-chart"
import LatestInvoices from "../ui/dashboard/latest-invoices"
import { Suspense } from "react"
import { RevenueChartSkeleton } from "../ui/skeletons"

export default async function customersPage() {
    // esto solo funcionaria en los react server Components, no en el cliente 
//    const res = await fetch('https://api.example.com/revenue')
//    const json = await res.json()
//    console.log(json)

    
    const latestInvoices = await fetchLatestInvoices()

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton/>}>
                      <RevenueChart />
                </Suspense>

                <Suspense fallback={<RevenueChartSkeleton/>}>
              
                <LatestInvoices latestInvoices={latestInvoices} />
                </Suspense>
            </div>
        </main>
    )
}