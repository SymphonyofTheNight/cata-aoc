"use client";

import React, { useState, useEffect } from "react";
import classNames from "classnames";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useTranslations } from 'next-intl';
import { ProductFormFragment } from '../_components/product-form/fragment';
import { ProductSchemaFragment } from '../_components/product-schema';
import { ReviewSummaryFragment } from '../_components/review-summary';
import { ProductItemFragment } from '~/client/fragments/product-item';
import { PricingFragment } from '~/client/fragments/pricing';
import dynamic from 'next/dynamic';

// Dynamic import for ReactPlayer with SSR disabled
const ReactPlayer = dynamic(() => import('react-player'), {
    ssr: false, // Prevent server-side rendering
});

import { FragmentOf, graphql } from '~/client/graphql';

export const DescriptionFragment = graphql(`
    fragment DescriptionFragment on Product {
        description
    }
`);

export const DetailsFragment = graphql(
    `
    fragment DetailsFragment on Product {
        ...ReviewSummaryFragment
        ...ProductSchemaFragment
        ...ProductFormFragment
        ...ProductItemFragment
        entityId
        name
        sku
        upc
        minPurchaseQuantity
        maxPurchaseQuantity
        condition
        weight {
        value
        unit
        }
        availabilityV2 {
        description
        }
        customFields {
        edges {
            node {
            entityId
            name
            value
            }
        }
        }
        brand {
        name
        }
        ...PricingFragment
    }
`,
    [
        ReviewSummaryFragment,
        ProductSchemaFragment,
        ProductFormFragment,
        ProductItemFragment,
        PricingFragment,
    ],
);

interface Video {
    title: string;
    url: string;
}

interface Props {
    product: FragmentOf<typeof DetailsFragment>;
    description: FragmentOf<typeof DescriptionFragment>;
    videos: Video[];
}

// AccordionDemo component
const AccordionDemo = ({ product, description, videos }: Props) => {
    const t = useTranslations('Product.Details');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        console.log(product);
    }, []);

    if (!isMounted) return null; // Prevent rendering on the server

    return (
        <Accordion.Root
            className="w-[auto] bg-mauve6 shadow-black/5 !shadow-none outline-none !rounded-none mt-[30px] accordion-main"
            type="single"
            defaultValue="item-1"
            collapsible
        >
            <AccordionItem className="border-[2px] border-t-[#a2a2a3] border-b-[#a2a2a3] border-l-0 border-r-0 !rounded-none py-[10px]" value="item-1">
                <AccordionTrigger className="!px-[0px] text-[#111] text-[18px] font-[700] !shadow-none">Videos</AccordionTrigger>
                <AccordionContent className="accordion-dropdown-container">
                    <div className="flex flex-row items-center justify-between gap-[20px]">
                        {videos?.map((state, index) => (
                            <ReactPlayer key={index} url={state.url} height={240} />
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem className="border-[2px] border-b-[#a2a2a3] border-t-0 border-l-0 border-r-0 !rounded-none py-[10px]" value="item-2">
                <AccordionTrigger className="!px-[0px] text-[#111] text-[18px] font-[700] !shadow-none">Description</AccordionTrigger>
                <AccordionContent className="accordion-dropdown-container">
                    <div id='product-description' dangerouslySetInnerHTML={{ __html: description.description }} />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem className="border-[2px] border-b-[#a2a2a3] border-t-0 border-l-0 border-r-0 !rounded-none py-[10px]" value="item-3">
                <AccordionTrigger className="!px-[0px] text-[#111] text-[18px] font-[700] !shadow-none">Details</AccordionTrigger>
                <AccordionContent className="accordion-dropdown-container">
                    <div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {Boolean(product.sku) && (
                                <div>
                                    <h3 className="font-semibold">{t('sku')}</h3>
                                    <p>{product.sku}</p>
                                </div>
                            )}
                            {Boolean(product.upc) && (
                                <div>
                                    <h3 className="font-semibold">{t('upc')}</h3>
                                    <p>{product.upc}</p>
                                </div>
                            )}
                            {Boolean(product.minPurchaseQuantity) && (
                                <div>
                                    <h3 className="font-semibold">{t('minPurchase')}</h3>
                                    <p>{product.minPurchaseQuantity}</p>
                                </div>
                            )}
                            {Boolean(product.maxPurchaseQuantity) && (
                                <div>
                                    <h3 className="font-semibold">{t('maxPurchase')}</h3>
                                    <p>{product.maxPurchaseQuantity}</p>
                                </div>
                            )}
                            {Boolean(product.availabilityV2.description) && (
                                <div>
                                    <h3 className="font-semibold">{t('availability')}</h3>
                                    <p>{product.availabilityV2.description}</p>
                                </div>
                            )}
                            {Boolean(product.condition) && (
                                <div>
                                    <h3 className="font-semibold">{t('condition')}</h3>
                                    <p>{product.condition}</p>
                                </div>
                            )}
                            {Boolean(product.weight) && (
                                <div>
                                    <h3 className="font-semibold">{t('weight')}</h3>
                                    <p>
                                        {product.weight?.value} {product.weight?.unit}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion.Root>
    );
};

// Props interface for AccordionItem
interface AccordionItemProps extends React.ComponentProps<typeof Accordion.Item> {
    children: React.ReactNode;
    className?: string;
}

// AccordionItem component
const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Item
            className={classNames(
                "mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px] focus-within:shadow-mauve12",
                className
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
        </Accordion.Item>
    )
);

AccordionItem.displayName = "AccordionItem"; // Helpful for debugging

// Props interface for AccordionTrigger
interface AccordionTriggerProps extends React.ComponentProps<typeof Accordion.Trigger> {
    children: React.ReactNode;
    className?: string;
}

// AccordionTrigger component
const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Header className="flex">
            <Accordion.Trigger
                className={classNames(
                    "group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none text-violet11 shadow-[0_1px_0] shadow-mauve6 outline-none hover:bg-mauve2",
                    className
                )}
                {...props}
                ref={forwardedRef}
            >
                {children}
                <ChevronDownIcon
                    className="text-violet10 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
                    aria-hidden
                />
            </Accordion.Trigger>
        </Accordion.Header>
    )
);

AccordionTrigger.displayName = "AccordionTrigger"; // Helpful for debugging

// Props interface for AccordionContent
interface AccordionContentProps extends React.ComponentProps<typeof Accordion.Content> {
    children: React.ReactNode;
    className?: string;
}

// AccordionContent component
const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Content
            className={classNames(
                "overflow-hidden bg-mauve2 text-[15px] text-mauve11 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown",
                className
            )}
            {...props}
            ref={forwardedRef}
        >
            <div className="px-5 py-[15px]">{children}</div>
        </Accordion.Content>
    )
);

AccordionContent.displayName = "AccordionContent"; // Helpful for debugging

export default AccordionDemo;
