import Link from "next/link";

interface FooterLinkProps {
    text: string;
    linkText: string;
    href: string;
}

const FooterLink = ({ text, linkText, href }: FooterLinkProps) => {
    return (
        <div className="text-center pt-4">
            <p className="text-sm text-gray-500">
                {text}{" "}
                <Link href={href} className="footer-link text-blue-600 hover:underline">
                    {linkText}
                </Link>
            </p>
        </div>
    );
};

export default FooterLink;
