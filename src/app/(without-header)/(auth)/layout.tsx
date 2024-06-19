export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative overflow-hidden flex items-center justify-center w-screen h-screen p-10">
      <div className="border rounded-2xl overflow-hidden grid grid-cols-2 flex-grow h-full">
        <div className="lg:flex flex-col h-full bg-neutral-900 p-10">
          <div className="text-lg font-bold">EDUPLA</div>
          <div className="mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg text-neutral-50">“Chtělo se mě experimentovat, udělat něco neobvyklého, ale zároveň užitečného.”</p>
              <footer className="text-sm text-neutral-400">Author EDUPLA</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:flex flex-col h-full p-10 justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}