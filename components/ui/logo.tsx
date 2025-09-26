interface LogoProps {
  className?: string
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`size-14 rounded-full overflow-hidden ${className}`}>
      <img src="\images\Logo.png" alt="Logo" className="w-full h-full" />
    </div>
  )
}
