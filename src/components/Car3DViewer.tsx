import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Car3DViewerProps {
  className?: string;
  /** Shows camera drag/zoom controls and the color swatch picker. Off for pure background/ambient use. */
  interactive?: boolean;
  defaultVariant?: string;
}

interface ModelViewerMaterial {
  name: string;
  pbrMetallicRoughness: {
    setBaseColorFactor: (rgba: [number, number, number, number]) => void;
  };
}

interface ModelViewerElement extends HTMLElement {
  variantName?: string;
  model?: { materials: ModelViewerMaterial[] };
}

const MODEL_SRC =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CarConcept/glTF-Binary/CarConcept.glb";

// Named variants baked into the model via KHR_materials_variants.
const NAMED_VARIANTS = [
  { name: "Carmine Candy", swatch: "#9b1c1c" },
  { name: "Pearly Swirly", swatch: "#e8e6e1" },
  { name: "Torched Graphite", swatch: "#2b2b2e" },
] as const;

// Colors not baked into the model: painted on top of the "Carmine Candy" paint slots at runtime.
const CUSTOM_COLORS = [
  { name: "Violeta", hex: "#7c3aed" },
  { name: "Verde", hex: "#16a34a" },
  { name: "Azul", hex: "#2563eb" },
] as const;

const PAINT_MATERIALS: Record<string, [number, number, number, number]> = {
  "Paint 1 Carmine": [0.666, 0, 0, 1],
  "Paint 2 Carmine": [0.0378, 0.0378, 0.0378, 1],
};

const hexToRgba = (hex: string): [number, number, number, number] => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b, 1];
};

export const Car3DViewer = ({
  className,
  interactive = true,
  defaultVariant = NAMED_VARIANTS[0].name,
}: Car3DViewerProps) => {
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<string>(defaultVariant);
  const mvRef = useRef<ModelViewerElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("@google/model-viewer").then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectVariant = (name: string) => {
    const el = mvRef.current;
    if (el) {
      el.variantName = name;
      // Restore the factory paint in case a custom color was painted over it earlier.
      el.model?.materials.forEach((m) => {
        const original = PAINT_MATERIALS[m.name];
        if (original) m.pbrMetallicRoughness.setBaseColorFactor(original);
      });
    }
    setSelected(name);
  };

  const selectCustomColor = (name: string, hex: string) => {
    const el = mvRef.current;
    if (el) {
      el.variantName = "Carmine Candy";
      const rgba = hexToRgba(hex);
      el.model?.materials.forEach((m) => {
        if (m.name in PAINT_MATERIALS) m.pbrMetallicRoughness.setBaseColorFactor(rgba);
      });
    }
    setSelected(name);
  };

  if (!ready) {
    return <div className={cn("w-full h-full", className)} aria-hidden />;
  }

  return (
    <div className={cn("relative overflow-hidden w-full h-full", className)}>
      <model-viewer
        ref={mvRef as never}
        src={MODEL_SRC}
        alt="Vista 3D ilustrativa de un auto deportivo"
        variant-name={defaultVariant}
        camera-orbit="auto auto 60%"
        auto-rotate
        auto-rotate-delay="0"
        rotation-per-second="18deg"
        shadow-intensity="1"
        exposure="0.9"
        interaction-prompt="none"
        {...(interactive ? { "camera-controls": true } : {})}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          pointerEvents: interactive ? "auto" : "none",
        }}
      />
      {interactive && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 backdrop-blur-sm">
          {NAMED_VARIANTS.map((v) => (
            <button
              key={v.name}
              type="button"
              aria-label={`Color ${v.name}`}
              title={v.name}
              onClick={() => selectVariant(v.name)}
              className={cn(
                "h-6 w-6 rounded-full border-2 transition-transform",
                selected === v.name ? "border-white scale-110" : "border-white/40"
              )}
              style={{ backgroundColor: v.swatch }}
            />
          ))}
          <div className="mx-1 h-5 w-px bg-white/30" />
          {CUSTOM_COLORS.map((c) => (
            <button
              key={c.name}
              type="button"
              aria-label={`Color ${c.name}`}
              title={c.name}
              onClick={() => selectCustomColor(c.name, c.hex)}
              className={cn(
                "h-6 w-6 rounded-full border-2 transition-transform",
                selected === c.name ? "border-white scale-110" : "border-white/40"
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
