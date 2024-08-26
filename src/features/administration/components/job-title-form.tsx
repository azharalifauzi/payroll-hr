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
  levelId: z.number({ coerce: true }),
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
      label: 'Job Title',
      placeholder: 'Chief of Executive',
    },
    {
      type: 'select',
      key: 'levelId',
      options: [
        {
          label: 'Manager',
          value: '1',
        },
        {
          label: 'Director',
          value: '2',
        },
      ],
      placeholder: 'Select Job Level',
      label: 'Job Level',
    },
  ],
}

const JobTitleForm: React.FC<Props> = ({ children, initialData }) => {
  const form = useForm<Data>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Job Title</DialogTitle>
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

export default JobTitleForm
