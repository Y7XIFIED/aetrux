import { useState } from "react";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}

const SmartImage = ({ src, alt, className = "", loading = "lazy" }: SmartImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-all duration-500 ${loaded ? "blur-0 scale-100" : "blur-sm scale-[1.02]"}`}
    />
  );
};

export default SmartImage;
