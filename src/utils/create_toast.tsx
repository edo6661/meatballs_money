import { toast } from "sonner"

interface ToastParams {
  title: string,
  description?: string
  duration?: number
  leadingIcon?: React.ReactNode
}
export default function createToast({ title, description, duration = 3000, leadingIcon }: ToastParams) {
  return toast(title, {
    ...(description && { description }),
    position: "bottom-right",
    closeButton: true,
    dismissible: true,
    id: "event-created",
    duration: duration,
    invert: true,
    richColors: true,
    icon: leadingIcon

  })
}