
import { Toast, ToastClose, ToastDescription, ToastTitle } from "./toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} id={id} {...props}>
            <div className="d-flex">
              <div className="toast-body">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose />
            </div>
          </Toast>
        )
      })}
    </div>
  )
}
