import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export function useMobileNavigation({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleResize = () => {
      if (isOpen && window.innerWidth >= 768) {
        onClose();
      }
    };

    const handleRouteChange = () => {
      if (isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("resize", handleResize);
      router.subscribe("onBeforeNavigate", handleRouteChange);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      router.subscribers.clear();
    };
  }, [isOpen, onClose, router]);
}
