import Logo from '../../../public/assets/logo-footer.svg';

export default function Footer() {
  return (
    <div className="bg-foreground p-5 text-background">
      <div className="flex flex-col justify-center items-center">
        <Logo width={100} height={50} />
      </div>
    </div>
  );
}
