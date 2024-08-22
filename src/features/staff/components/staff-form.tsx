import type { FormConfig } from '@/components/form-wrapper'
import FormWrapper from '@/components/form-wrapper'
import Link from '@/components/link'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import type React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  personalEmail: z.string().email().min(1),
  jobTitleId: z.number({ coerce: true }),
  salary: z.number({ coerce: true }),
  identityCard: z.string(),
})

export type Data = z.infer<typeof formSchema>

const formConfig: FormConfig<Data> = {
  type: 'root',
  children: [
    {
      type: 'container',
      key: 'root-container',
      props: {
        className: 'grid grid-cols-2 gap-4',
      },
      children: [
        {
          type: 'input',
          key: 'identityCard',
          label: 'ID Card (Passport, Driver License, etc)',
          placeholder: '987xxxx',
        },
        {
          type: 'input',
          key: 'name',
          label: 'Full name',
          placeholder: 'John Doe',
        },
        {
          type: 'input',
          key: 'email',
          label: 'Company email',
          placeholder: 'john@company.com',
        },
        {
          label: 'Job Title',
          type: 'select',
          key: 'jobTitleId',
          placeholder: 'Select Job Title',
          options: [
            {
              label: 'CEO',
              value: '1',
            },
            {
              label: 'Senior Software Engineer',
              value: '2',
            },
          ],
        },
        {
          type: 'input',
          key: 'salary',
          label: 'Salary',
          placeholder: '50.000.000',
        },
        {
          type: 'input',
          key: 'personalEmail',
          label: 'Personal Email',
          placeholder: 'john@gmail.com',
        },
      ],
    },
  ],
}

interface Props {
  mode?: 'new' | 'edit'
  defaultValue?: Partial<Data>
}

const StaffForm: React.FC<Props> = ({ defaultValue, mode = 'new' }) => {
  const form = useForm<Data>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  })

  return (
    <>
      <FormWrapper config={formConfig} form={form} />
      <div className="flex justify-end items-center gap-4">
        <Button className="mt-5" variant="outline" asChild>
          <Link to="/staff">Cancel</Link>
        </Button>
        <Button className="mt-5">
          {mode === 'new' ? 'Add Employee' : 'Edit Employee'}
        </Button>
      </div>
    </>
  )
}

export default StaffForm
