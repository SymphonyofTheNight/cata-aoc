import { ReactNode } from 'react';

import { BcImage } from '~/components/bc-image';
import { Link } from '~/components/link';
import { cn } from '~/lib/utils';

import { Compare } from './compare';

interface Image {
  altText: string;
  src: string;
}

type Price =
  | string
  | {
    type: 'sale';
    currentValue: string;
    previousValue: string;
  }
  | {
    type: 'range';
    minValue: string;
    maxValue: string;
  };

interface Product {
  id: string;
  name: string;
  href: string;
  image?: Image;
  price?: Price;
  subtitle?: string;
  badge?: string;
}

interface Props extends Product {
  addToCart?: ReactNode;
  className?: string;
  imagePriority?: boolean;
  imageSize?: 'square' | 'tall' | 'wide';
  showCompare?: boolean;
  productOptions: any;
}

const ProductCard = ({
  addToCart,
  className,
  image,
  imagePriority = false,
  imageSize,
  href,
  price,
  id,
  showCompare = true,
  subtitle,
  name,
  productOptions,
  ...props
}: Props) => (
  <div className={cn('group relative flex flex-col overflow-visible', className)} {...props}>
    <div className="relative flex justify-center pb-3">
      <div
        className={cn('relative flex-auto bg-white', {
          'aspect-square': imageSize === 'square',
          'aspect-[5/5]': imageSize === 'tall',
          'aspect-[7/5]': imageSize === 'wide',
        })}
      >
        {image ? (
          <BcImage
            alt={image.altText}
            className="object-contain"
            fill
            priority={imagePriority}
            sizes="(max-width: 768px) 50vw, (max-width: 1536px) 25vw, 500px"
            src={image.src}
          />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}
      </div>
    </div>
    <div className={cn('flex flex-1 flex-col gap-1', Boolean(addToCart) && 'justify-end')}>
      {/* {subtitle ? <p className="text-base text-gray-500">{subtitle}</p> : null} */}
      <h3 className={cn('text-xl font-bold lg:text-2xl', '!text-[14px] font-[600] uppercase mx-auto')}>
        <Link
          className="focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-primary/20 focus-visible:ring-0"
          href={href}
        >
          <span aria-hidden="true" className="absolute inset-0 bottom-20" />
          {name}
        </Link>
      </h3>
      <span className='uppercase text-[12px] text-[#888888] font-[400] mx-auto'>{productOptions} color available</span>
      <div className="flex flex-wrap items-end justify-between pt-1">
        {Boolean(price) &&
          (typeof price === 'object' ? (
            <p className="flex flex-col gap-1 mx-auto">
              {price.type === 'range' && (
                <span className='text-[#AD1A2E] font-[600] text-[14px] mx-auto'>
                  {price.minValue} - {price.maxValue}
                </span>
              )}

              {price.type === 'sale' && (
                <>
                  <span className='text-[#AD1A2E] font-[600] text-[14px] mx-auto'>
                    Was: <span className="line-through">{price.previousValue}</span>
                  </span>
                  <span className='text-[#AD1A2E] font-[600] text-[14px] mx-auto'>Now: {price.currentValue}</span>
                </>
              )}
            </p>
          ) : (
            <span className='text-[#AD1A2E] font-[600] text-[14px] mx-auto'>{price}</span>
          ))}

        {showCompare && <Compare id={id} image={image} name={name} />}
      </div>
    </div>
    {addToCart}
  </div>
);

ProductCard.displayName = 'ProductCard';

export { ProductCard, type Price };
