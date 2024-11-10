import { CardPropsStyleData } from "./CardPropsStyleData";

export interface CardProps {
    title?: string;
    styleData?: CardPropsStyleData;
    data?: string | null;
    // loading: boolean; 
    children?: React.ReactNode;
}