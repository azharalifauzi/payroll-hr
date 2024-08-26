import { useFormContext, type UseFormReturn } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input, type InputProps } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import type React from 'react'

interface ItemBase {
  label?: React.ReactNode
  description?: React.ReactNode
  placeholder?: string
}

interface Container<T extends Record<string, any>> {
  type: 'container'
  key: keyof T | (string & {})
  props?: React.HTMLAttributes<HTMLDivElement>
  children?: Item<T>[]
}

interface Input<T> extends ItemBase {
  type: 'input'
  key: keyof T | (string & {})
  props?: InputProps
  formItemProps?: React.HTMLAttributes<HTMLDivElement>
  isNumeric?: boolean
}

interface Select<T> extends ItemBase {
  type: 'select'
  key: keyof T | (string & {})
  options: { value: string; label: string }[]
  formItemProps?: React.HTMLAttributes<HTMLDivElement>
}

interface Custom<T extends Record<string, any>> {
  type: 'custom'
  key: keyof T | (string & {})
  render: (form: UseFormReturn<T>) => React.ReactNode
}

type Item<T extends Record<string, any>> =
  | Input<T>
  | Container<T>
  | Custom<T>
  | Select<T>

export interface FormConfig<T extends Record<string, any>> {
  type: 'root'
  children?: Item<T>[]
  props?: React.HTMLAttributes<HTMLDivElement>
}

interface Props<T extends object> {
  form: UseFormReturn<any>
  config: FormConfig<T>
}

const ItemComponent = (
  props: Item<Record<string, any>> & { formKey: string }
) => {
  const form = useFormContext()
  const { control } = form

  if (props.type === 'container') {
    return (
      <div key={props.formKey} {...props.props}>
        {props.children?.map((childItem) => (
          <ItemComponent {...childItem} formKey={childItem.key} />
        ))}
      </div>
    )
  }

  if (props.type === 'input') {
    const { isNumeric } = props

    return (
      <FormField
        control={control}
        name={props.formKey}
        render={({ field }) => (
          <FormItem {...props.formItemProps}>
            {props.label && <FormLabel>{props.label}</FormLabel>}
            <FormControl>
              <Input
                placeholder={props.placeholder}
                {...field}
                {...props.props}
                onChange={(e) => {
                  const { value } = e.target

                  if (!isNumeric) {
                    field.onChange(value)
                    return
                  }

                  if (value.endsWith(',') && value.split(',').length < 3) {
                    field.onChange(value)
                    return
                  }

                  const normalizedValue = value
                    .split('.')
                    .join('')
                    .split(',')
                    .join('.')
                  const valueAsNum = Number(normalizedValue)

                  if (isNaN(valueAsNum)) {
                    return
                  }

                  if (
                    normalizedValue.endsWith('0') &&
                    normalizedValue.includes('.')
                  ) {
                    field.onChange(value)
                    return
                  }

                  const parsed = new Intl.NumberFormat('id-ID', {
                    maximumFractionDigits: 100,
                  }).format(valueAsNum)
                  field.onChange(parsed)
                }}
              />
            </FormControl>
            {props.description && (
              <FormDescription>{props.description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  if (props.type === 'select') {
    return (
      <FormField
        control={control}
        name={props.formKey}
        render={({ field }) => (
          <FormItem {...props.formItemProps}>
            {props.label && <FormLabel>{props.label}</FormLabel>}
            <FormControl>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder={props.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {props.options.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            {props.description && (
              <FormDescription>{props.description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  if (props.type === 'custom') {
    return props.render(form)
  }

  return null
}

function FormWrapper<T extends Record<string, any>>({
  config,
  form,
}: Props<T>) {
  return (
    <Form {...form}>
      <div {...config.props}>
        {config.children?.map((item) => {
          if (item.type === 'container') {
            return (
              <div key={item.key as string} {...item.props}>
                {item.children?.map((childItem) => (
                  // @ts-ignore
                  <ItemComponent
                    {...childItem}
                    key={childItem.key as string}
                    formKey={childItem.key as string}
                  />
                ))}
              </div>
            )
          }

          return (
            // @ts-ignore
            <ItemComponent
              {...item}
              key={item.key as string}
              formKey={item.key as string}
            />
          )
        })}
      </div>
    </Form>
  )
}

export default FormWrapper
