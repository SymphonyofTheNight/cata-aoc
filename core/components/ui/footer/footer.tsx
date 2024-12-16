import { Fragment, ReactNode } from 'react';

import { BcImage } from '~/components/bc-image';
import { Link as CustomLink } from '~/components/link';
import { cn } from '~/lib/utils';

import { Locale } from './locale';

interface Image {
  altText: string;
  src: string;
}

interface Link {
  href: string;
  label: string;
}

interface Section {
  title?: string;
  links: Link[];
}

interface SocialMediaLink {
  href: string;
  icon: ReactNode;
}

interface ContactInformation {
  address?: string;
  phone?: string;
}

interface Props {
  className?: string;
  contactInformation?: ContactInformation;
  copyright?: string;
  logo?: string | Image;
  paymentIcons?: ReactNode[];
  sections: Section[];
  socialMediaLinks?: SocialMediaLink[];
}

const Footer = ({
  className,
  contactInformation,
  copyright,
  logo,
  paymentIcons,
  sections,
  socialMediaLinks,
  ...props
}: Props) => (
  <footer className={cn('2xl:container 2xl:mx-auto', className, 'bg-[#4D4D4F] !mx-0 !max-w-[100%] text-white')} {...props}>

    <section className="flex flex-col-reverse gap-8 py-10 md:flex-row lg:gap-4 2xl:px-0 mb-[35px] max-w-[1440px] w-[92%] mx-auto">

      <nav className={cn('grid flex-auto auto-cols-fr md:gap-[9rem] sm:grid-flow-col', 'gap-[3rem]')}>
        {sections.map((section) => (
          <div className='text-left md:text-right' key={section.title}>
            <h3 className="mb-4 text-lg uppercase !text-[15px] !font-[400]">{section.title}</h3>
            <ul className="flex flex-col gap-4">
              {section.links.map((link) => (
                <li className='text-left md:text-right' key={link.href}>
                  <CustomLink className='font-[200] text-[14px] hover:text-[#AD1A2E]' href={link.href}>{link.label}</CustomLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className={cn('grid items-center justify-center md:items-start md:justify-start md:flex md:flex-col gap-4 md:order-first md:grow')}>
        {Boolean(logo) && (
          <h3>
            {typeof logo === 'object' ? (
              // <BcImage
              //   alt={logo.altText}
              //   className="max-h-16 object-contain"
              //   height={32}
              //   priority
              //   src={logo.src}
              //   width={155}
              // />
              <img className='h-auto w-[350px] object-contain' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/stormy-kromer-logo-footer-2x.png?t=1731048060' />
            ) : (
              <span className="truncate text-2xl font-black">{logo}</span>
            )}
          </h3>
        )}
        {/* {Boolean(contactInformation) && (
          <>
            <address className="not-italic">
              {contactInformation?.address?.split('\n').map((line) => (
                <Fragment key={line}>
                  {line}
                  <br />
                </Fragment>
              ))}
            </address>
            {Boolean(contactInformation?.phone) && (
              <a
                className="hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                href={`tel:${contactInformation?.phone}`}
              >
                <p>{contactInformation?.phone}</p>
              </a>
            )}
          </>
        )} */}
        {Boolean(socialMediaLinks) && (
          <nav aria-label="Social media links" className="block mt-[25px] md:mt-[28vh]">
            <ul className="flex gap-3 justify-center md:justify-start">
              {socialMediaLinks?.map((link) => (
                <li className='social-container' key={link.href}>
                  <CustomLink className="inline-block bg-[#58595B] px-[10px] py-[10px] hover:text-[#AD1A2E]" href={link.href} target="_blank">
                    {link.icon}
                  </CustomLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

    </section>

    <section className="flex flex-col gap-10 border-t border-gray-200 px-4 py-8 sm:gap-8 sm:px-10 sm:py-6 lg:hidden lg:px-12 2xl:px-0">
      <Locale />

      <div className={cn('flex w-full flex-col justify-between gap-10 sm:flex-row sm:gap-8', 'text-center md:text-left')}>
        {/* <div className="flex gap-6">{paymentIcons}</div> */}
        <p className={cn('text-gray-500 sm:order-first', 'text-white text-[14px] font-[200]')}>{copyright}</p>
      </div>
    </section>

    <section className="hidden justify-between gap-8 border-t border-gray-200 px-4 py-6 sm:px-10 lg:flex lg:px-12 2xl:px-0 max-w-[1440px] w-[92%] mx-auto">
      <p className={cn('text-gray-500 sm:order-first', 'text-white text-[14px] font-[200]')}>{copyright}</p>
      <div className="flex gap-8">
        <Locale />
        {/* <div className="flex gap-6">{paymentIcons}</div> */}
      </div>
    </section>

  </footer>
);

Footer.displayName = 'Footer';

export { Footer };
