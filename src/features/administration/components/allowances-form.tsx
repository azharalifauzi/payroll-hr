import type { FormConfig } from '@/components/form-wrapper'
import FormWrapper from '@/components/form-wrapper'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  title: z.string().min(1),
  amount: z.string().transform((amount, ctx) => {
    const parsed = Number(amount.split('.').join('').split(',').join('.'))

    if (isNaN(parsed)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Amount not a valid number',
      })
      return z.never
    }

    return parsed
  }),
})

type Data = z.infer<typeof formSchema>

interface Props {
  children?: React.ReactNode
  initialData?: Partial<Data>
}

const formConfig: FormConfig<Data> = {
  type: 'root',
  props: {
    className: 'grid gap-4',
  },
  children: [
    {
      type: 'input',
      key: 'title',
      label: 'Allowance',
      placeholder: 'Meal Allowance',
    },
    {
      type: 'input',
      key: 'amount',
      isNumeric: true,
      placeholder: '1.000.000',
      label: 'Amount',
    },
  ],
}

const AllowancesForm: React.FC<Props> = ({ children, initialData }) => {
  const form = useForm<Data>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Allowance</DialogTitle>
        </DialogHeader>
        <FormWrapper config={formConfig} form={form} />
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AllowancesForm
