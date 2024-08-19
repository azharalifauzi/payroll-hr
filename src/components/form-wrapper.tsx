import React from 'react'
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

interface ItemBase {
  label?: React.ReactNode
  description?: React.ReactNode
  placeholder?: string
}

interface Container<T extends Record<string, any>> {
  type: 'container'
  key: keyof T | (string & {})
  props?: React.PropsWithoutRef<HTMLDivElement>
  children?: Item<T>[]
}

interface Input<T> extends ItemBase {
  type: 'input'
  key: keyof T | (string & {})
  props?: InputProps
}

interface Select<T> extends ItemBase {
  type: 'select'
  key: keyof T | (string & {})
  options: { value: string; label: string }[]
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
}

interface Props {
  form: UseFormReturn<any>
  config: FormConfig<Record<string, any>>
}

const ItemComponent = (props: Item<Record<string, any>>) => {
  const form = useFormContext()
  const { control } = form

  if (props.type === 'container') {
    return (
      <div key={props.key}>
        {props.children?.map((childItem) => (
          <ItemComponent {...childItem} />
        ))}
      </div>
    )
  }

  if (props.type === 'input') {
    return (
      <FormField
        control={control}
        name={props.key}
        render={({ field }) => (
          <FormItem>
            {props.label && <FormLabel>{props.label}</FormLabel>}
            <FormControl>
              <Input
                placeholder={props.placeholder}
                {...field}
                {...props.props}
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
        name={props.key}
        render={({ field }) => (
          <FormItem>
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

const FormWrapper: React.FC<Props> = ({ form, config }) => {
  return (
    <Form {...form}>
      {config.children?.map((item) => {
        if (item.type === 'container') {
          return (
            <div key={item.key}>
              {item.children?.map((childItem) => (
                <ItemComponent {...childItem} />
              ))}
            </div>
          )
        }

        return <ItemComponent {...item} />
      })}
    </Form>
  )
}

export default FormWrapper
