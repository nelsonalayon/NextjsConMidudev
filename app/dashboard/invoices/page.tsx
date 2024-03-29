import search from '@/app/ui/search' 
import { CreateInvoice } from '@/app/ui/invoices/buttons'
import { lusitana } from '@/app/ui/fonts'
import Pagination from '@/app/ui/invoices/pagination'
import Table from '@/app/ui/invoices/table'
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'
import { Suspense } from 'react'
import Search from '@/app/ui/search'
import { fetchInvoicesPages } from '@/app/lib/data'

// las paginas de nextjs reciben los parametros de busqueda y pagina como props, en este caso se desestructura el objeto searchParams para obtener los valores de query y page, si no hay valores por defecto se asigna un string vacio y 1 respectivamente
export default async function Page({
    searchParams
}:{  
    searchParams?: {
    query?: string 
    page?: string
}
}) {
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1

    const totalPages = await fetchInvoicesPages(query)

    return (
<div className='w-full'>
    <div className='flex w-full items-center justify-normal flex-col'>
        <h1 className={`${lusitana.className} text-2xl`}> Invoices </h1>
        <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
            <Search placeholder='Search invoices...'/>
            <CreateInvoice/>
        </div>
        <Suspense key={query + currentPage} fallback = {<InvoicesTableSkeleton/>}>
            <Table query={query} currentPage={currentPage}/>

        </Suspense>
        <div className='mt-5 flex w-full jusrify-center'>
            <Pagination totalPages={totalPages} />
            
        </div>
    </div>
</div>

    )
}