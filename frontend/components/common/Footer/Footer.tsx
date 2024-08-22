import { FC } from 'react';
import { getConductScienceUrl } from '../../../common/utils';
import { FooterColumn } from './FooterColumn';
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaRedditAlien,
} from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Flex } from '@/components/ui/Flex';
import Image from 'next/image';

export const Footer: FC = () => {
  return (
    <div className='mt-12 bg-white py-6'>
      <Container>
        <Flex justify='between' wrap gap='lg'>
          <a href={getConductScienceUrl()}>
            <Image src='/images/logo.png' alt='logo' width={100} height={25} />
          </a>
          <Flex gap='md' className='w-full text-primary-800 md:w-auto'>
            <a href='https://www.facebook.com/ConductScience' target='_blank'>
              <FaFacebook />
            </a>
            <a href='https://twitter.com/ConductScience' target='_blank'>
              <FaTwitter />
            </a>
            <a className='cursor-pointer'>
              <FaYoutube />
            </a>
            <a href='https://www.instagram.com/ConductScience/' target='_blank'>
              <FaInstagram />
            </a>
            <a
              href='https://www.reddit.com/user/ConductScience-Inc/'
              target='_blank'
            >
              <FaRedditAlien />
            </a>
          </Flex>
        </Flex>
        <Flex gap='lg' className='mt-8 flex-wrap md:flex-nowrap'>
          <FooterColumn
            className='w-full md:w-2/12'
            title='Our Location'
            items={[
              {
                title: `5250 Old Orchard Rd Suite 300
              Skokie, IL 60077`,
              },
              {
                title: '(888) 267-4324',
              },
              {
                title: `Monday – Friday
                9 AM – 5 PM EST`,
              },
            ]}
          />
          <FooterColumn
            className='w-full md:w-2/12'
            title='Conduct Science'
            marker
            items={[
              {
                title: 'About Us',
                link: getConductScienceUrl('/about-us/'),
              },
              {
                title: 'News',
                link: getConductScienceUrl('/news/'),
              },
              {
                title: 'Resources',
                link: getConductScienceUrl('/resources/'),
              },
              {
                title: 'Contact Us',
                link: getConductScienceUrl('/contact/'),
              },
              {
                title: 'Become a Partner',
                link: getConductScienceUrl('/become-a-partner/'),
              },
            ]}
          />
          <FooterColumn
            className='w-full md:w-2/12'
            title='Resources'
            marker
            items={[
              {
                title: 'Blog',
                link: getConductScienceUrl('/resources/'),
              },
              {
                title: 'Social Media',
                link: getConductScienceUrl('/resources/social-media/'),
              },
              {
                title: 'Podcasts',
                link: getConductScienceUrl('/resources/podcast/'),
              },
              {
                title: 'Stories',
                link: getConductScienceUrl('/resources/stories/'),
              },
              {
                title: 'Career/Academia',
                link: getConductScienceUrl('/resources/academia/'),
              },
              {
                title: 'Science',
                link: getConductScienceUrl('/resources/science/'),
              },
              {
                title: 'Age When',
                link: getConductScienceUrl('/resources/age-when/'),
              },
            ]}
          />
          <FooterColumn
            className='w-full md:w-2/12'
            title='Support'
            marker
            items={[
              {
                title: 'FAQ',
                link: getConductScienceUrl(
                  '/human-lab/simian-scientific-virtual-reality/frequently-asked-questions/'
                ),
              },
              {
                title: 'Privacy Policy',
                link: getConductScienceUrl('/privacy-policy/'),
              },
              {
                title: 'Sitemap',
                link: getConductScienceUrl(),
              },
              {
                title: 'Shipping & Returns',
                link: getConductScienceUrl('/about-us/'),
              },
              {
                title: 'Request a quote',
                link: getConductScienceUrl('/request-quote/'),
              },
            ]}
          />
          <FooterColumn
            className='w-full md:w-2/12'
            title='Customer service'
            marker
            items={[
              {
                title: 'Orders',
                link: getConductScienceUrl('/my-account/orders/'),
              },
              {
                title: 'Quotes',
                link: getConductScienceUrl('/my-account/quotes/'),
              },
              {
                title: 'Account details',
                link: getConductScienceUrl('/my-account/edit-account/'),
              },
              {
                title: 'Shipping & Returns',
                link: getConductScienceUrl('/my-account/edit-account/'),
              },
              {
                title: 'Lost password',
                link: getConductScienceUrl('/my-account/lost-password/'),
              },
            ]}
          />
        </Flex>
        <Flex className='mt-8' justify='between' wrap gap='lg'>
          <span>© Conduct Science {new Date().getFullYear()}</span>
          <Flex gap='sm' justify='center' wrap>
            <Image src='icons/visa.svg' alt='visa' width={40} height={40} />
            <Image
              src='icons/dinersClub.svg'
              alt='diners club'
              width={40}
              height={40}
            />
            <Image src='icons/amex.svg' alt='amex' width={40} height={40} />
            <Image
              src='icons/discover.svg'
              alt='discover'
              width={40}
              height={40}
            />
            <Image
              src='icons/maestro.svg'
              alt='maestro'
              width={40}
              height={40}
            />
            <Image
              src='icons/mastercard.svg'
              alt='mastercard'
              width={40}
              height={40}
            />
            <Image src='icons/stripe.svg' alt='stripe' width={40} height={40} />
            <Image src='icons/payPal.svg' alt='paypal' width={40} height={40} />
          </Flex>
        </Flex>
      </Container>
    </div>
  );
};
