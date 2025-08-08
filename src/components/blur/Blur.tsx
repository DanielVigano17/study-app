import { cn } from "@/lib/utils";

interface BlurProps {
    className?: string;
}

export function Blur({ className }: BlurProps) {
    return (
        <div className={cn("absolute w-56 h-48 bg-blue-500 opacity-25 blur-2xl", className)}>
        </div>
    )
}