import Swal from "sweetalert2";

const BaseSwal = Swal.mixin({
  background: "#27272a",
  color: "#ffffff",
  showConfirmButton: false,
  timer: 1800,
  timerProgressBar: true,
  customClass: {
    popup: "rounded-xl",
    title: "text-lg font-semibold",
  },
});

export const showSuccess = (message) => {
  BaseSwal.fire({
    icon: "success",
    title: message,
    iconColor: "#f59e0b",
  });
};

export const showError = (message) => {
  BaseSwal.fire({
    icon: "error",
    title: message,
    iconColor: "#ef4444",
  });
};
