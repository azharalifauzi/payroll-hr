import { cn } from '@/utils'
import { ArrowDown, ArrowUp, Banknote } from 'lucide-react'
import React from 'react'

interface Props {
  amount: string
  title: string
  diff: number
  color: 'yellow' | 'blue' | 'purple' | 'orange' | 'green'
}

const Card: React.FC<Props> = ({ amount, color, diff, title }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{amount}</div>
          <div className="text-xs text-gray-500">{title}</div>
        </div>
        <div
          className={cn(
            'flex items-center justify-center h-8 w-8 rounded-full',
            {
              'bg-green-100': color === 'green',
              'bg-yellow-100': color === 'yellow',
              'bg-blue-100': color === 'blue',
              'bg-purple-100': color === 'purple',
              'bg-orange-100': color === 'orange',
            }
          )}
        >
          <Banknote
            className={cn('h-4 w-4', {
              'text-green-500': color === 'green',
              'text-yellow-500': color === 'yellow',
              'text-purple-500': color === 'purple',
              'text-blue-500': color === 'blue',
              'text-orange-500': color === 'orange',
            })}
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        {diff > 0 ? (
          <ArrowUp className="text-green-600 h-4 w-4" />
        ) : (
          <ArrowDown className="text-red-600 h-4 w-4" />
        )}
        <div className="text-xs">
          {diff}% {diff > 0 ? 'more' : 'less'} than last month
        </div>
      </div>
    </div>
  )
}

export default Card
