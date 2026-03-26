import type { CSSProperties } from "react";

export interface ButtonType {
    style?:CSSProperties
    title: string;
    onClick: ()=>void;
}
