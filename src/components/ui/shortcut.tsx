const Shortcut = function ({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <span className="ml-2 text-xs tracking-tight uppercase font-bold text-neutral-400">{children}</span>;
}

export default Shortcut;
