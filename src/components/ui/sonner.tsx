
import { toast as sonnerToast } from "sonner"

// Simple wrapper for sonner toast to maintain compatibility
export const toast = sonnerToast

export function Toaster() {
  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
      {/* Sonner will handle the rendering */}
    </div>
  )
}
