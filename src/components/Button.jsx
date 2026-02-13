export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
}) {
  const baseStyle =
    "w-full py-2 font-semibold rounded transition cursor-pointer";

  const variants = {
    primary: "bg-amber-500 text-black hover:bg-amber-400",
    danger: "bg-red-500 text-white hover:bg-red-400",
    secondary: "bg-zinc-700 text-white hover:bg-zinc-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? "opacity-50" : ""}`}
    >
      {children}
    </button>
  );
}
