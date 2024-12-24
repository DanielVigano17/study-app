import { Toaster } from "@/components/ui/toaster"

const layoutSettings = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="">
        <Toaster />
        {children}
    </div>
  )
}

export default layoutSettings;
