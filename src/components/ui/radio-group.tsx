import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioGroupProps {
  value: string
  onValueChange: (value: string) => void
  className?: string
  children: React.ReactNode
  disabled?: boolean
}

function RadioGroup({ value, onValueChange, className, children, disabled }: RadioGroupProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} role="radiogroup">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            checked: (child as React.ReactElement<any>).props.value === value,
            onChange: () => onValueChange((child as React.ReactElement<any>).props.value),
            disabled: disabled || (child as React.ReactElement<any>).props.disabled,
          })
        }
        return child
      })}
    </div>
  )
}

interface RadioGroupItemProps {
  value: string
  id?: string
  className?: string
  checked?: boolean
  onChange?: () => void
  disabled?: boolean
}

function RadioGroupItem({ value, id, className, checked, onChange, disabled }: RadioGroupItemProps) {
  return (
    <input
      type="radio"
      value={value}
      id={id}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={cn(
        "h-4 w-4 shrink-0 accent-primary",
        className
      )}
    />
  )
}

export { RadioGroup, RadioGroupItem }
