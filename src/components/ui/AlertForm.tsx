import { CircleCheckBig } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "./alert"

type AlertFormProps = {
  title: string
  description?: string
}

export default function AlertForm({ title, description }: AlertFormProps) {
  return (
    <Alert variant="success">
      <div className="flex items-center gap-2">
        <CircleCheckBig className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
      </div>
      <AlertDescription className="mt-2">{description}</AlertDescription>
    </Alert>
  )
}
