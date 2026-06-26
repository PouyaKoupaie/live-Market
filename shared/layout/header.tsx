import { ThemeToggle } from "../theme/theme-toggle";

export default function Header() {
  return (
    <div className='flex justify-between uppercase pb-3'>
        <ThemeToggle/>
        live market
    </div>
  )
}
