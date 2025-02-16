import LocaleSwitcher from "./LocaleSwitcher";

export default function Nav() {
  return (
    <header className='flex justify-between items-center p-4'>
      <LocaleSwitcher />
    </header>
  );
}