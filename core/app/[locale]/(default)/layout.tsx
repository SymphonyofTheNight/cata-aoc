import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren, Suspense } from 'react';

import { Footer } from '~/components/footer/footer';
import { Header, HeaderSkeleton } from '~/components/header';
import { Cart } from '~/components/header/cart';

// !custom
import { cn } from '~/lib/utils';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

export default async function DefaultLayout({ params, children }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <div>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header cart={<Cart />} />
      </Suspense>

      <main className={cn('flex-1 px-4 2xl:container sm:px-10 lg:px-12 2xl:mx-auto 2xl:px-0', '2xl:mx-0 !max-w-[100%] lg:px-0 sm:px-0 px-0 bg-[#F5F5F5]')}>
        {children}
      </main>

      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
}
