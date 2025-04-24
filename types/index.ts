export {};

declare global {
  type alignmentENUM = "left" | "center" | "right";

  interface Header {
    title?: string;
    key: string;
    align?: alignmentENUM;
    value?: any;
  }

  interface navigationArrow {
    icon: string,
    action: () => void,
    disabled: ComputedRef<boolean>
  }
  
}

