import { Terminal } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertRCB() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Your recipe is ready!</AlertTitle>
      <AlertDescription>
      Check description button in top-right corner!
      </AlertDescription>
    </Alert>
  )
}
