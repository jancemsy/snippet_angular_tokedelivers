import { Variant } from './variant.model';

export interface Product {
    id: number;
    company_id: number;
    category_id: number;
    sub_category_id: number;
    image_id: number;
    name: string;
    producer: string;
    supplier_name: string;
    supplier_license_number: string;
    cannabis_type: string;
    medical_only: boolean;
    strain: string;
    description: string;
    cbd: number;
    thc: number;
    variants: Variant[];
}