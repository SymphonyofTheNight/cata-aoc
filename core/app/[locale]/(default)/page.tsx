import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getSessionCustomerAccessToken } from '~/auth';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { ProductCardCarousel } from '~/components/product-card-carousel';
import { ProductCardCarouselFragment } from '~/components/product-card-carousel/fragment';
import { Slideshow } from '~/components/slideshow';

// import SlickSlider from './SlickSlider/SlickSlider';
import Slick from './SlickSlider/Slick';
import { MdArrowForwardIos } from "react-icons/md";

const HomePageQuery = graphql(
  `
    query HomePageQuery {
      site {
        newestProducts(first: 12) {
          edges {
            node {
              ...ProductCardCarouselFragment
            }
          }
        }
        featuredProducts(first: 12) {
          edges {
            node {
              ...ProductCardCarouselFragment
            }
          }
        }
        bestSellingProducts(first: 12) {
          edges {
            node {
              ...ProductCardCarouselFragment
            }
          }
        }
      }
    }
  `,
  [ProductCardCarouselFragment],
);

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('Home');
  const customerAccessToken = await getSessionCustomerAccessToken();

  const { data } = await client.fetch({
    document: HomePageQuery,
    customerAccessToken,
    fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
  });

  const featuredProducts = removeEdgesAndNodes(data.site.featuredProducts);
  const newestProducts = removeEdgesAndNodes(data.site.newestProducts);
  const bestSellingProducts = removeEdgesAndNodes(data.site.bestSellingProducts);

  return (
    <>
      <div>
        <div className='bg-hero-banner bg-cover bg-no-repeat bg-center w-full h-[400px] sm:h-[583px] flex items-center justify-center bg-opacity-30'>
          <div className='text-center'>
            <span className='font-[400] text-white text-center text-[14px]'>UNWAVERING CRAFTSMANSHIP</span>
            <h2 className='font-[600] text-white text-center text-[30px] sm:text-[45px] px-[5vw] my-[10px]'>LAKESIDE DAYS & BONFIRE NIGHTS</h2>
            <button className='group h-auto w-auto bg-white hover:bg-[#AD1A2E] text-center py-[.75rem] px-[2.5rem]'>
              <span className='text-[#AD1A2E] group-hover:text-white text-[14px] font-[600]'>SHOP NOW</span>
            </button>
          </div>
        </div>

        <div className='max-w-[1440px] w-[92%] h-auto mx-auto'>
          <div className='flex flex-row items-center justify-between py-[15px]'>
            <div className='h-[30px] w-[0px] bg-[#AD1A2E] opacity-[.4]'></div>
            <span className='text-[#AD1A2E] text-[14px] font-[600] flex flex=row items-center justify-center'>
              <img className='w-auto h-[30px] object-contain mr-[10px]' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/thread-icon-01-2x.png?t=1730337324' />
              PROUD & PASSIONATE MAKERS
            </span>
            <div className='h-[30px] w-[1px] bg-[#AD1A2E] opacity-[.4]'></div>
            <span className='text-[#AD1A2E] text-[14px] font-[600] flex flex=row items-center justify-center'>
              <img className='w-auto h-[30px] object-contain mr-[10px]' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/strormycap-icon-02-2x.png?t=1730337325' />
              SINCE 1903
            </span>
            <div className='h-[30px] w-[1px] bg-[#AD1A2E] opacity-[.4]'></div>
            <span className='text-[#AD1A2E] text-[14px] font-[600] flex flex=row items-center justify-center'>
              <img className='w-auto h-[30px] object-contain mr-[10px]' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/family-icon-03-2x.png?t=1730337326' />
              FAMILY OWNED & OPERATED
            </span>
            <div className='h-[30px] w-[0px] bg-[#AD1A2E] opacity-[.4]'></div>
          </div>
          <div className='w-[100%] h-auto flex flex-row flex-wrap'>
            <div className='group w-[100%] lg:w-[50%] relative bg-red-700 overflow-hidden bg-opacity-30'>
              <div className='relative transition-transform duration-300 group-hover:scale-[1.1]'>
                <img className='w-full h-auto' src='https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/original/image-manager/hcapsf24.jpg' />
              </div>
              <div className='absolute transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] text-center w-[70%]'>
                <h4 className='text-white text-[14px] font-[400]'>STORMY KROMER®</h4>
                <h3 className='text-white text-[24px] font-[600]'>WARM WEATHER CAPS</h3>
                <button>
                  <span className='text-white text-[14px] underline'>SHOP NOW</span>
                </button>
              </div>
            </div>
            <div className='w-[100%] lg:w-[50%] bg-green-700'>
              <div className='w-[100%] flex flex-wrap items-center justify-center'>

                <div className='group w-[100%] sm:w-[50%] relative bg-red-700 overflow-hidden'>
                  <div className='relative transition-transform duration-300 group-hover:scale-[1.1] group-hover:brightness-100'>
                    <img className='w-full h-auto transition-all duration-300 brightness-50' src='https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/original/image-manager/fall-winter-collection.jpg?t=1715656670' />
                  </div>
                  <div className='absolute transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] text-center w-[70%]'>
                    <h3 className='text-white text-[24px] font-[600]'>SPRING & SUMMER NEW ARRIVALS</h3>
                    <button>
                      <span className='text-white text-[14px] underline'>SHOP NOW</span>
                    </button>
                  </div>
                </div>

                <div className='group w-[100%] sm:w-[50%] relative bg-red-700 overflow-hidden'>
                  <div className='relative transition-transform duration-300 group-hover:scale-[1.1] group-hover:brightness-100'>
                    <img className='w-full h-auto transition-all duration-300 brightness-50' src='https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/original/image-manager/hshopwf24.jpg' />
                  </div>
                  <div className='absolute transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] text-center w-[70%]'>
                    <h3 className='text-white text-[24px] font-[600]'>WOMEN</h3>
                    <button>
                      <span className='text-white text-[14px] underline'>SHOP NOW</span>
                    </button>
                  </div>
                </div>

                <div className='group w-[100%] sm:w-[50%] relative bg-red-700 overflow-hidden'>
                  <div className='relative transition-transform duration-300 group-hover:scale-[1.1] group-hover:brightness-100'>
                    <img className='w-full h-auto transition-all duration-300 brightness-50' src='https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/original/image-manager/hshopmf24.jpg' />
                  </div>
                  <div className='absolute transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] text-center w-[70%]'>
                    <h3 className='text-white text-[24px] font-[600]'>MEN</h3>
                    <button>
                      <span className='text-white text-[14px] underline'>SHOP NOW</span>
                    </button>
                  </div>
                </div>

                <div className='group w-[100%] sm:w-[50%] relative bg-red-700 overflow-hidden'>
                  <div className='relative transition-transform duration-300 group-hover:scale-[1.1] group-hover:brightness-100'>
                    <img className='w-full h-auto transition-all duration-300 brightness-50' src='https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/original/image-manager/bwl.jpg' />
                  </div>
                  <div className='absolute transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] text-center w-[70%]'>
                    <h3 className='text-white text-[24px] font-[600]'>GIFT <br /> CERTIFICATES</h3>
                    <button>
                      <span className='text-white text-[14px] underline'>SHOP NOW</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Slideshow /> */}

      <div className="max-w-[1440px] w-[92%] mx-auto mt-[50px]">
        {/* <ProductCardCarousel
          products={featuredProducts}
          showCart={false}
          showCompare={false}
          title={t('Carousel.featuredProducts')}
        /> */}
        <ProductCardCarousel
          products={bestSellingProducts}
          showCart={false}
          showCompare={false}
          title='OUR BESTSELLERS'
        />
      </div>

      <div className='max-w-[1440px] w-[92%] mx-auto mt-[50px]'>
        <div className='w-[100%] flex flex-row flex-wrap justify-between items-center'>

          <div className='group relative w-[100%] md:w-[32%] overflow-hidden'>
            <div className='relative transition-transform duration-300 group-hover:scale-[1.1]'>
              <img className='w-full h-auto transition-all duration-300' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/kids-img-2x.png?t=1730857387' />
            </div>
            <div className='absolute transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] text-center w-[70%]'>
              <h3 className='text-white text-[24px] font-[600]'>SHIRTS</h3>
              <button>
                <span className='text-white text-[14px] underline'>SHOP NOW</span>
              </button>
            </div>
          </div>

          <div className='group relative w-[100%] md:w-[32%] overflow-hidden'>
            <div className='relative transition-transform duration-300 group-hover:scale-[1.1]'>
              <img className='w-full h-auto transition-all duration-300' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/pet-img-2x.png?t=1730857390' />
            </div>
            <div className='absolute transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] text-center w-[70%]'>
              <h3 className='text-white text-[24px] font-[600]'>PET</h3>
              <button>
                <span className='text-white text-[14px] underline'>SHOP NOW</span>
              </button>
            </div>
          </div>

          <div className='group relative w-[100%] md:w-[32%] overflow-hidden'>
            <div className='relative transition-transform duration-300 group-hover:scale-[1.1]'>
              <img className='w-full h-auto transition-all duration-300' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/home-gifts-img-2x.png?t=1730857383' />
            </div>
            <div className='absolute transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] text-center w-[70%]'>
              <h3 className='text-white text-[24px] font-[600]'>HOME & GIFTS</h3>
              <button>
                <span className='text-white text-[14px] underline'>SHOP NOW</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className='bg-kromer-country bg-cover bg-no-repeat bg-center h-[580px] max-w-[1440px] w-[92%] mx-auto mt-[25px] relative'>
        <div className='absolute transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] text-center w-[70%]'>
          <img className='mx-auto h-auto w-[80%] lg:w-[40%] object-contain mb-[25px]' src='https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/original/image-manager/kromer-discover-logo.png?t=1712282804' />
          <p className='text-white text-[14px] font-[400] w-[80%] sm:w-[432px] md:w-[80%] mx-auto'>We are a community of adventurers, outdoor enthusiasts, farmers, hunters, ranchers and everything in between. Our mission is to bring you closer to the great outdoors, sharing stories of the iconic Stormy Kromer brand through the eyes of people who wear and love our products.</p>
          <button className='group h-auto w-auto bg-white hover:bg-[#AD1A2E] text-center py-[.75rem] px-[2.5rem] mt-[25px]'>
            <span className='text-[#AD1A2E] group-hover:text-white text-[14px] font-[600]'>DISCOVER STORIES</span>
          </button>
        </div>
      </div>

      <div className='bg-red-700 h-auto w-full mt-[50px] flex flex-col lg:flex-row flex-wrap'>
        <div className='bg-kromer-footer-bg1 h-[480px] w-[100%] lg:w-[50%] bg-cover bg-center grid items-center justify-center'>
          <div className='grid items-center justify-center px-[7vw] lg:px-[0px]'>
            <span className='text-center text-[28px] font-[600] text-[#ffffff]'>
              SIGN UP FOR EXCLUSIVE OFFERS, <br /> SALE ALERTS & MORE
            </span>
            <div className='bg-white mt-[50px] flex flex-row]'>
              <input className='h-[50px] pl-[16px] w-full text-[#58595b] outline-none' placeholder='Enter your email' />
              <button className='text-[#AD1A2E] pl-[25px] pr-[25px] text-[14px] font-[600] hover:bg-[#AD1A2E] hover:text-[#FFFFFF]'>
                SUBSCRIBED
              </button>
            </div>
          </div>
        </div>
        <div className='bg-kromer-footer-bg2 h-[480px] w-[100%] lg:w-[50%] bg-cover bg-center grid items-center justify-center'>
          <div className='grid items-center justify-center px-[7vw] lg:px-[0px]'>
            <span className='text-center text-[28px] font-[600] text-[#ffffff]'>
              MAKE YOUR RESERVATION TODAY <br /> FOR THE FREE FACTORY TOUR
            </span>
            <div className='mt-[50px] flex flex-row items-center justify-center'>
              <button className='bg-white h-[50px] text-[#AD1A2E] pl-[35px] pr-[35px] text-[14px] font-[600] hover:bg-[#AD1A2E] hover:text-[#FFFFFF]'>
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export const runtime = 'edge';
