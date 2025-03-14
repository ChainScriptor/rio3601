
import { cn } from "@/lib/utils";

type PixelProps = {
  className?: string;
  color?: string;
  animationDelay?: string;
};

export const PixelIcon = ({ 
  className, 
  color = "bg-primary", 
  animationDelay 
}: PixelProps) => {
  return (
    <div 
      className={cn(
        "relative h-6 w-6",
        className
      )}
      style={{ animationDelay }}
    >
      <div className={`absolute top-0 left-1/4 w-1/2 h-1/6 ${color}`}></div>
      <div className={`absolute top-1/6 left-1/6 w-2/3 h-1/6 ${color}`}></div>
      <div className={`absolute top-1/3 left-0 w-full h-1/6 ${color}`}></div>
      <div className={`absolute top-1/2 left-0 w-full h-1/6 ${color}`}></div>
      <div className={`absolute top-2/3 left-1/6 w-2/3 h-1/6 ${color}`}></div>
      <div className={`absolute top-5/6 left-1/4 w-1/2 h-1/6 ${color}`}></div>
    </div>
  );
};

export const CodeBlock = ({ 
  className 
}: PixelProps) => {
  return (
    <div
      className={cn(
        "relative h-24 w-24 pixel-corners shadow-pixel border-2 border-border",
        className
      )}
    >
      <div className="absolute top-1 left-1 right-1 h-4 bg-accent/20 flex items-center px-2">
        <div className="h-2 w-2 rounded-full bg-pixel-red mr-1"></div>
        <div className="h-2 w-2 rounded-full bg-pixel-yellow mr-1"></div>
        <div className="h-2 w-2 rounded-full bg-pixel-green"></div>
      </div>
      <div className="pt-6 px-2 font-mono text-[8px] leading-tight tracking-tight overflow-hidden">
        <div className="text-pixel-blue">function <span className="text-pixel-green">init</span>() {`{`}</div>
        <div className="pl-2 text-pixel-purple">return <span className="text-pixel-orange">true</span>;</div>
        <div>{`}`}</div>
      </div>
    </div>
  );
};

export const BlockchainIcon = ({ 
  className 
}: PixelProps) => {
  return (
    <div
      className={cn(
        "relative h-20 w-20 animate-float",
        className
      )}
    >
      <div className="absolute top-0 left-1/4 w-1/2 h-1/5 bg-pixel-blue"></div>
      <div className="absolute top-1/5 left-1/5 w-3/5 h-1/5 bg-pixel-blue"></div>
      <div className="absolute top-2/5 left-0 w-4/5 h-1/5 bg-pixel-blue"></div>
      <div className="absolute top-3/5 left-1/5 w-3/5 h-1/5 bg-pixel-blue"></div>
      <div className="absolute top-4/5 left-1/4 w-1/2 h-1/5 bg-pixel-blue"></div>
      
      <div className="absolute top-0 left-3/4 w-1/8 h-full bg-pixel-purple opacity-80"></div>
      <div className="absolute top-0 left-7/8 w-1/8 h-full bg-pixel-purple opacity-60"></div>
    </div>
  );
};

export const CubeIcon = ({ 
  className 
}: PixelProps) => {
  return (
    <div
      className={cn(
        "relative h-16 w-16 animate-float",
        className
      )}
    >
      {/* Top face */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/4 bg-pixel-purple"></div>
      
      {/* Left face */}
      <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-pixel-blue"></div>
      
      {/* Right face */}
      <div className="absolute top-1/4 left-1/2 w-1/2 h-1/2 bg-pixel-pink"></div>
      
      {/* Shadow */}
      <div className="absolute top-3/4 left-1/4 w-1/2 h-1/4 bg-black opacity-20"></div>
    </div>
  );
};
