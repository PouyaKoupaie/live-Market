import { ThemeToggle } from "../theme/theme-toggle";

export default function Header() {
  return (
    <div className='flex justify-between uppercase'>
        <ThemeToggle/>
        live market
    </div>
  )
}
