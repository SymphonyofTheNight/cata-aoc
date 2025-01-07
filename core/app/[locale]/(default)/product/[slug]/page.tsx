import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { Breadcrumbs } from '~/components/breadcrumbs';

import { Description } from './_components/description';
import { Details } from './_components/details';
import { Gallery } from './_components/gallery';
import { ProductViewed } from './_components/product-viewed';
import { RelatedProducts } from './_components/related-products';
import { Reviews } from './_components/reviews';
import { Warranty } from './_components/warranty';
import { getProduct } from './page-data';

//! custom 
import dynamic from 'next/dynamic';
const AccordionComponent = dynamic(() => import('./ClientTemplate/Accordion'), {
  ssr: true,
});

interface Props {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function getOptionValueIds({ searchParams }: { searchParams: Awaited<Props['searchParams']> }) {
  const { slug, ...options } = searchParams;

  return Object.keys(options)
    .map((option) => ({
      optionEntityId: Number(option),
      valueEntityId: Number(searchParams[option]),
    }))
    .filter(
      (option) => !Number.isNaN(option.optionEntityId) && !Number.isNaN(option.valueEntityId),
    );
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const productId = Number(params.slug);
  const optionValueIds = getOptionValueIds({ searchParams });

  const product = await getProduct({
    entityId: productId,
    optionValueIds,
    useDefaultOptionSelections: true,
  });

  if (!product) {
    return {};
  }

  const { pageTitle, metaDescription, metaKeywords } = product.seo;
  const { url, altText: alt } = product.defaultImage || {};

  return {
    title: pageTitle || product.name,
    description: metaDescription || `${product.plainTextDescription.slice(0, 150)}...`,
    keywords: metaKeywords ? metaKeywords.split(',') : null,
    openGraph: url
      ? {
        images: [
          {
            url,
            alt,
          },
        ],
      }
      : null,
  };
}

export default async function Product(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { locale, slug } = params;

  setRequestLocale(locale);

  const t = await getTranslations('Product');

  const productId = Number(slug);

  const optionValueIds = getOptionValueIds({ searchParams });

  const product = await getProduct({
    entityId: productId,
    optionValueIds,
    useDefaultOptionSelections: true,
  });

  if (!product) {
    return notFound();
  }

  const category = removeEdgesAndNodes(product.categories).at(0);

  const getDescription = product;

  const videos = removeEdgesAndNodes(product.videos);

  return (
    <>
      {category && <Breadcrumbs category={category} />}

      <div className='w-full h-[50px] text-center flex items-center justify-center mt-[10px]'>
        <span>You are $75.00 away from free ground shipping.</span>
      </div>
      <div className="mb-12 lg:grid lg:grid-cols-2 lg:gap-8 w-[92%] max-w-[1440px] mx-auto">
        <Gallery product={product} />
        <Details product={product} getDescription={getDescription} videos={videos} />
        {/* client template here */}
      </div>

      <div className="lg:col-span-2 w-[92%] max-w-[1440px] mx-auto">
        {/* <Description product={product} /> */}
        <Warranty product={product} />
        <Suspense fallback={t('loading')}>
          <Reviews productId={product.entityId} />
        </Suspense>
      </div>
      {/* <Suspense fallback={t('loading')}>
        <RelatedProducts productId={product.entityId} />
      </Suspense> */}

      <ProductViewed product={product} />
    </>
  );
}

export const runtime = 'edge';
