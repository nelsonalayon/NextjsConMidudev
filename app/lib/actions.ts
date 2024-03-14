'use server'

// todas las funciones en este archivo son funciones de servidor, por lo que no se pueden ejecutar en el cliente.
import { z } from 'zod'
import { Invoice } from './definitions'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/dist/server/api-utils'

const CreateInvoiceSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['draft', 'pending', 'paid']),
    date: z.string()
})

const CreateInvoiceFromSchema = CreateInvoiceSchema.omit({ id: true, date: true })
 
export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoiceFromSchema.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    })

    const amountInCents = amount * 100
    const [ date ] = new Date().toISOString().split('T')

    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `

    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}