import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { BcImage } from '~/components/bc-image';
import { Link as CustomLink } from '~/components/link';
import { cn } from '~/lib/utils';

import { type Locale, LocaleSwitcher } from './locale-switcher';
import { MobileNav } from './mobile-nav';

interface Link {
  label: string;
  href: string;
}

interface Group {
  label: string;
  href: string;
  links?: Link[];
}

interface Image {
  src: string;
  altText: string;
}

interface Links {
  label: string;
  href: string;
  groups?: Group[];
}

interface Props extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
  account?: ReactNode;
  activeLocale?: string;
  locales: Locale[];
  cart?: ReactNode;
  links: Links[];
  locale?: ReactNode;
  logo?: string | Image;
  search?: ReactNode;
}

const Header = ({
  account,
  activeLocale,
  cart,
  className,
  links,
  locales,
  logo,
  search,
}: Props) => (
  <div className='sticky top-0 z-20'>
    <div className='bg-secondary-bg-color h-[36px] w-full flex align-center items-center'>
      <div className='m-auto w-full 2xl:max-w-[1440px] sm:max-w-[95%] h-[36px] flex items-center justify-center md:justify-between'>
        <div className='hidden md:flex flex-row items-center justify-center'>
          <img className='w-auto h-[15px] object-contain' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/phone-2x.png?t=1730273122' />
          <span className='text-white font-[400] ml-[7px] text-[13px]'>888 455 2253</span>
        </div>
        <div className='flex flex-row items-center justify-center'>
          <span className='text-white font-[400] ml-[7px] text-[13px]'>FREE SHIPPING OVER $75.<span className='underline ml-[2px]'>Offer Details</span></span>
        </div>
        <div className='hidden md:flex flex-row items-center justify-center'>
          <img className='w-auto h-[15px] object-contain' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/gift-2x.png?t=1730273123' />
          <span className='text-white font-[400] ml-[7px] text-[13px]'>Gift Certificates</span>
        </div>
      </div>
    </div>
    <div className={cn('bg-primary-bg-color', className)}>
      <header className={cn('flex h-[80px] items-center justify-between gap-1 overflow-y-visible px-4 2xl:container sm:px-10 lg:gap-8 lg:px-12 2xl:mx-auto 2xl:px-0 lg:max-w-[1440px]')}>
        <CustomLink className="overflow-hidden text-ellipsis py-3" href="/">
          {typeof logo === 'object' ? (
            // <BcImage
            //   alt={logo.altText}
            //   className="max-h-16 object-contain"
            //   height={32}
            //   priority
            //   src={logo.src}
            //   width={155}
            // />
            <BcImage
              alt={logo.altText}
              className="max-h-16 scale-125 object-contain"
              height={32}
              priority
              src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/stormy-kromer-logo-header-2x.png?t=1730185685'
              width={155}
            />
          ) : (
            <span className="truncate text-2xl font-black">{logo}</span>
          )}
        </CustomLink>

        {/* nav */}
        <NavigationMenuPrimitive.Root className="hidden lg:block relative">
          <NavigationMenuPrimitive.List className="flex items-center gap-2 lg:gap-4">
            {links.map((link) =>
              link.groups && link.groups.length > 0 ? (
                <NavigationMenuPrimitive.Item key={link.href}>

                  <NavigationMenuPrimitive.Trigger className="group/button flex items-center font-semibold hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20">
                    <CustomLink className="p-3 text-white font-[400] text-[15px]" href={link.href}>
                      {link.label}
                    </CustomLink>
                    <ChevronDown
                      aria-hidden="true"
                      className="cursor-pointer transition duration-200 group-data-[state=open]/button:-rotate-180 text-white"
                    />
                  </NavigationMenuPrimitive.Trigger>

                  {/* dropdown parent nav */}
                  <NavigationMenuPrimitive.Content
                    className={cn('flex gap-20 2xl:container data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 sm:px-10 lg:px-12 2xl:mx-auto 2xl:px-0',
                      '!max-w-[1000px]', '!px-[40px]')}>

                    {link.label === 'Bases' ?
                      <div>
                        <div className='mb-15px'>
                          <h2 className='text-[#222] font-[800] uppercase text-[28px]'
                          >
                            {link.label}
                          </h2>
                        </div>
                        <div className="flex flex-col">
                          {link.groups.map((group) => (
                            <ul className="flex flex-col" key={group.href}>
                              <li key={group.href}>
                                <NavigationMenuPrimitive.Link asChild>
                                  <CustomLink className="block p-3 font-semibold pl-0" href={group.href}>
                                    {group.label}
                                  </CustomLink>
                                </NavigationMenuPrimitive.Link>
                              </li>
                              {group.links &&
                                group.links.length > 0 &&
                                group.links.map((nestedLink) => (
                                  <li key={nestedLink.href}>
                                    <NavigationMenuPrimitive.Link asChild>
                                      <CustomLink className="block p-3" href={nestedLink.href}>
                                        {nestedLink.label}
                                      </CustomLink>
                                    </NavigationMenuPrimitive.Link>
                                  </li>
                                ))}
                            </ul>
                          ))}
                        </div>
                      </div>
                      :
                      <div>
                        <div className='mb-15px'>
                          <h2 className='text-[#222] font-[800] uppercase text-[28px]'
                          >
                            {link.label}
                          </h2>
                        </div>
                        <div className="flex flex-col">
                          {link.groups.map((group) => (
                            <ul className="flex flex-col" key={group.href}>
                              <li key={group.href}>
                                <NavigationMenuPrimitive.Link asChild>
                                  <CustomLink className="block p-3 font-semibold pl-0" href={group.href}>
                                    {group.label}
                                  </CustomLink>
                                </NavigationMenuPrimitive.Link>
                              </li>
                              {group.links &&
                                group.links.length > 0 &&
                                group.links.map((nestedLink) => (
                                  <li key={nestedLink.href}>
                                    <NavigationMenuPrimitive.Link asChild>
                                      <CustomLink className="block p-3" href={nestedLink.href}>
                                        {nestedLink.label}
                                      </CustomLink>
                                    </NavigationMenuPrimitive.Link>
                                  </li>
                                ))}
                            </ul>
                          ))}
                        </div>
                      </div>
                    }

                    <div className='h-auto w-auto !flex !justify-end'>
                      <img className='h-[250px] w-[80%] object-contain' src='https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/original/image-manager/caps-banner-aug2024.png?t=1724220853' />
                    </div>

                  </NavigationMenuPrimitive.Content>

                </NavigationMenuPrimitive.Item>
              ) : (
                <NavigationMenuPrimitive.Item key={link.href}>
                  <NavigationMenuPrimitive.Link asChild>
                    <CustomLink className="p-3 font-[400] text-[15px] text-white" href={link.href}>
                      {link.label}
                    </CustomLink>
                  </NavigationMenuPrimitive.Link>
                </NavigationMenuPrimitive.Item>
              ),
            )}
          </NavigationMenuPrimitive.List>

          <NavigationMenuPrimitive.Viewport className="absolute bg-white start-0 top-full z-50 w-full pb-12 pt-6 shadow-xl duration-200 animate-in slide-in-from-top-5 !py-[24px]" />
        </NavigationMenuPrimitive.Root>

        <div className={cn('flex items-center gap-2 lg:gap-4', '!text-white')}>
          {search}
          <nav className="flex gap-2 lg:gap-4 text-white">
            {account}
            {cart}
          </nav>

          {activeLocale && locales.length > 0 ? (
            <LocaleSwitcher activeLocale={activeLocale} locales={locales} />
          ) : null}

          <MobileNav links={links} logo={logo} />
        </div>
      </header>
    </div>
  </div>
);

Header.displayName = 'Header';

export { Header, type Links };
