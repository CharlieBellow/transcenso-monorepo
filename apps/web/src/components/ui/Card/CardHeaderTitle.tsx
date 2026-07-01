import { cn } from "@/lib/utils"

// Tipagem para aceitar dinamicamente as tags de cabeçalho
interface CardHeaderTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export const CardHeaderTitle = ({
  className,
  tag = "h2",
  ...props
}: CardHeaderTitleProps) => {
  const Component = tag // O React exige letra maiúscula para componentes dinâmicos
  return (
    <Component
      className={cn(
        "text-xl font-semibold tracking-tight text-white",
        className,
      )}
      {...props}
    />
  )
}
CardHeaderTitle.displayName = "Card.HeaderTitle"

