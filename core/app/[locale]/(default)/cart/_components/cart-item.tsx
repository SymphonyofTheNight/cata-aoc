import { useFormatter } from 'next-intl';

import { FragmentOf, graphql } from '~/client/graphql';
import { BcImage } from '~/components/bc-image';

import { ItemQuantity } from './item-quantity';
import { RemoveItem } from './remove-item';

const PhysicalItemFragment = graphql(`
  fragment PhysicalItemFragment on CartPhysicalItem {
    name
    brand
    sku
    image {
      url: urlTemplate(lossy: true)
    }
    entityId
    quantity
    productEntityId
    variantEntityId
    extendedListPrice {
      currencyCode
      value
    }
    extendedSalePrice {
      currencyCode
      value
    }
    originalPrice {
      currencyCode
      value
    }
    listPrice {
      currencyCode
      value
    }
    selectedOptions {
      __typename
      entityId
      name
      ... on CartSelectedMultipleChoiceOption {
        value
        valueEntityId
      }
      ... on CartSelectedCheckboxOption {
        value
        valueEntityId
      }
      ... on CartSelectedNumberFieldOption {
        number
      }
      ... on CartSelectedMultiLineTextFieldOption {
        text
      }
      ... on CartSelectedTextFieldOption {
        text
      }
      ... on CartSelectedDateFieldOption {
        date {
          utc
        }
      }
    }
  }
`);

const DigitalItemFragment = graphql(`
  fragment DigitalItemFragment on CartDigitalItem {
    name
    brand
    sku
    image {
      url: urlTemplate(lossy: true)
    }
    entityId
    quantity
    productEntityId
    variantEntityId
    extendedListPrice {
      currencyCode
      value
    }
    extendedSalePrice {
      currencyCode
      value
    }
    originalPrice {
      currencyCode
      value
    }
    listPrice {
      currencyCode
      value
    }
    selectedOptions {
      __typename
      entityId
      name
      ... on CartSelectedMultipleChoiceOption {
        value
        valueEntityId
      }
      ... on CartSelectedCheckboxOption {
        value
        valueEntityId
      }
      ... on CartSelectedNumberFieldOption {
        number
      }
      ... on CartSelectedMultiLineTextFieldOption {
        text
      }
      ... on CartSelectedTextFieldOption {
        text
      }
      ... on CartSelectedDateFieldOption {
        date {
          utc
        }
      }
    }
  }
`);

export const CartItemFragment = graphql(
  `
    fragment CartItemFragment on CartLineItems {
      physicalItems {
        ...PhysicalItemFragment
      }
      digitalItems {
        ...DigitalItemFragment
      }
    }
  `,
  [PhysicalItemFragment, DigitalItemFragment],
);

type FragmentResult = FragmentOf<typeof CartItemFragment>;
type PhysicalItem = FragmentResult['physicalItems'][number];
type DigitalItem = FragmentResult['digitalItems'][number];

export type Product = PhysicalItem | DigitalItem;

interface Props {
  product: Product;
  currencyCode: string;
}

export const CartItem = ({ currencyCode, product }: Props) => {
  const format = useFormatter();

  return (
    <li>

      <div className='bg-red-700 w-full h-[30px] flex flex-row justify-start items-center'>
        <div className='bg-green-200 md:w-[144px] h-[30px] flex items-center justify-center'>
          <span>testing</span>
        </div>
        <div className='h-[30px] min-w-[300px] max-w-[300px]'></div>
      </div>

      <div className="flex justify-start">

        {/* image */}
        <div className="bg-black w-24 flex-none md:w-[144px]">
          {product.image?.url ? (
            <BcImage alt={product.name} height={144} src={product.image.url} width={144} />
          ) : (
            <div className="h-full w-full bg-gray-200" />
          )}
        </div>

        {/* product text */}
        <div className='bg-green-700 w-full h-auto flex items-center justify-start'>
          <div className="flex flex-row items-center justify-center">

            <div className='bg-green-200 grid justify-start'>
              <div className='grid items-center justify-start max-h-[110px] min-h-[100px] min-w-[300px] max-w-[300px] h-auto'>
                <p className="text-base text-gray-500">{product?.brand}</p>
                <p className="text-xl font-bold md:text-2xl">{product.name}</p>
              </div>
            </div>

            <div className='bg-red-200 flex items-center justify-start min-w-[450px] max-w-[450px] max-h-[100px] min-h-[100px] h-auto'>
              <div>
                {product.selectedOptions.length > 0 && (
                  <div>
                    {product.selectedOptions.map((selectedOption) => {
                      switch (selectedOption.__typename) {
                        case 'CartSelectedMultipleChoiceOption':
                          return (
                            <div key={selectedOption.entityId}>
                              <span>{selectedOption.name}:</span>{' '}
                              <span className="font-semibold">{selectedOption.value}</span>
                            </div>
                          );

                        case 'CartSelectedCheckboxOption':
                          return (
                            <div key={selectedOption.entityId}>
                              <span>{selectedOption.name}:</span>{' '}
                              <span className="font-semibold">{selectedOption.value}</span>
                            </div>
                          );

                        case 'CartSelectedNumberFieldOption':
                          return (
                            <div key={selectedOption.entityId}>
                              <span>{selectedOption.name}:</span>{' '}
                              <span className="font-semibold">{selectedOption.number}</span>
                            </div>
                          );

                        case 'CartSelectedMultiLineTextFieldOption':
                          return (
                            <div key={selectedOption.entityId}>
                              <span>{selectedOption.name}:</span>{' '}
                              <span className="font-semibold">{selectedOption.text}</span>
                            </div>
                          );

                        case 'CartSelectedTextFieldOption':
                          return (
                            <div key={selectedOption.entityId}>
                              <span>{selectedOption.name}:</span>{' '}
                              <span className="font-semibold">{selectedOption.text}</span>
                            </div>
                          );

                        case 'CartSelectedDateFieldOption':
                          return (
                            <div key={selectedOption.entityId}>
                              <span>{selectedOption.name}:</span>{' '}
                              <span className="font-semibold">
                                {format.dateTime(new Date(selectedOption.date.utc))}
                              </span>
                            </div>
                          );
                      }

                      return null;
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className='bg-blue-200 min-w-[140px] max-w-[140px]'>
              <div>
                {product.originalPrice.value &&
                  product.originalPrice.value !== product.listPrice.value ? (
                  <p className="text-lg font-bold line-through">
                    {format.number(product.originalPrice.value * product.quantity, {
                      style: 'currency',
                      currency: currencyCode,
                    })}
                  </p>
                ) : null}
                <p className="text-lg font-bold">
                  {format.number(product.extendedSalePrice.value, {
                    style: 'currency',
                    currency: currencyCode,
                  })}
                </p>
              </div>
            </div>

            <div>
              <ItemQuantity product={product} />
            </div>

          </div>
        </div>

        <div className="flex-1">
          {/* <p className="text-base text-gray-500">{product.brand}</p> */}

          <div className="flex flex-col gap-2 md:flex-row">

            {/* <div className="flex flex-1 flex-col gap-2">
              <p className="text-xl font-bold md:text-2xl">{product.name}</p>

              {product.selectedOptions.length > 0 && (
                <div>
                  {product.selectedOptions.map((selectedOption) => {
                    switch (selectedOption.__typename) {
                      case 'CartSelectedMultipleChoiceOption':
                        return (
                          <div key={selectedOption.entityId}>
                            <span>{selectedOption.name}:</span>{' '}
                            <span className="font-semibold">{selectedOption.value}</span>
                          </div>
                        );

                      case 'CartSelectedCheckboxOption':
                        return (
                          <div key={selectedOption.entityId}>
                            <span>{selectedOption.name}:</span>{' '}
                            <span className="font-semibold">{selectedOption.value}</span>
                          </div>
                        );

                      case 'CartSelectedNumberFieldOption':
                        return (
                          <div key={selectedOption.entityId}>
                            <span>{selectedOption.name}:</span>{' '}
                            <span className="font-semibold">{selectedOption.number}</span>
                          </div>
                        );

                      case 'CartSelectedMultiLineTextFieldOption':
                        return (
                          <div key={selectedOption.entityId}>
                            <span>{selectedOption.name}:</span>{' '}
                            <span className="font-semibold">{selectedOption.text}</span>
                          </div>
                        );

                      case 'CartSelectedTextFieldOption':
                        return (
                          <div key={selectedOption.entityId}>
                            <span>{selectedOption.name}:</span>{' '}
                            <span className="font-semibold">{selectedOption.text}</span>
                          </div>
                        );

                      case 'CartSelectedDateFieldOption':
                        return (
                          <div key={selectedOption.entityId}>
                            <span>{selectedOption.name}:</span>{' '}
                            <span className="font-semibold">
                              {format.dateTime(new Date(selectedOption.date.utc))}
                            </span>
                          </div>
                        );
                    }

                    return null;
                  })}
                </div>
              )}

              <div className="hidden md:block">
                <RemoveItem currency={currencyCode} product={product} />
              </div>
            </div> */}

            {/* <div className="flex flex-col gap-2 md:items-end">
              <div>
                {product.originalPrice.value &&
                  product.originalPrice.value !== product.listPrice.value ? (
                  <p className="text-lg font-bold line-through">
                    {format.number(product.originalPrice.value * product.quantity, {
                      style: 'currency',
                      currency: currencyCode,
                    })}
                  </p>
                ) : null}
                <p className="text-lg font-bold">
                  {format.number(product.extendedSalePrice.value, {
                    style: 'currency',
                    currency: currencyCode,
                  })}
                </p>
              </div>

              <ItemQuantity product={product} />
            </div> */}

          </div>

          <div className="mt-4 md:hidden">
            <RemoveItem currency={currencyCode} product={product} />
          </div>
        </div>

      </div>

    </li>
  );
};
