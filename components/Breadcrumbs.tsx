import { ReactNode } from "react";
import Link from "next/link";
// defining the Props
export type CrumbItem = {
    label: ReactNode; // e.g., Python
    path: string; // e.g., /development/programming-languages/python
};
export type BreadcrumbsProps = {
    items: CrumbItem[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <div className="space-x-3 whitespace-nowrap overflow-x-auto">
            {items.map((crumb: any, i: number) => {
                const isLastItem = i === items.length - 1;
                if (!isLastItem) {
                    return (
                        <>
                            <Link
                                href={crumb.path}
                                key={i}
                                className="text-sm"
                            >
                                {crumb.label}
                            </Link>
                            {/* separator */}
                            <span className="text-secondary text-sm"> / </span>
                        </>
                    );
                } else {
                    return (<span className="text-sm" key={i}>{crumb.label}</span>);
                }
            })}
        </div>
    );
};
export default Breadcrumbs;
