'use client';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { getConductScienceUrl, redirect } from '../../../common/utils';
import { DesktopMenu } from './DesktopMenu';
import { MenuItem } from '../../../common/types';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MobileMenu } from './MobileMenu';
import { cx } from 'class-variance-authority';
import { css } from '@emotion/css';
import { MenuIcons } from './MenuIcons';
import { Container } from '@/components/ui/Container';
import { Flex } from '@/components/ui/Flex';
import Image from 'next/image';
import { SearchField } from '@/components/ui/SearchField';
import { ClientPortal } from '../ClientPortal';

export interface MenuProps {}

const menu: MenuItem[] = [
  {
    title: 'Shop',
    link: getConductScienceUrl('/shop/'),
    children: [
      [
        {
          title: 'Replicate',
          link: getConductScienceUrl('/replicate'),
        },
        {
          title: 'Sales',
          link: getConductScienceUrl('/sales'),
        },
      ],
    ],
  },
  {
    title: 'Specimen Lab',
    link: getConductScienceUrl('/product-category/specimen-lab/'),
    fullSize: true,
    children: [
      [
        {
          title: 'ANTIBODIES, CHEMICALS AND REAGENTS',
          heading: true,
          link: getConductScienceUrl(
            '/product-category/specimen-lab/antibodies-chemicals-and-reagents/'
          ),
        },
        {
          title: 'Chemicals',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/antibodies-chemicals-and-reagents/chemicals/'
          ),
        },
        {
          title: 'Elisa Kits',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/antibodies-chemicals-and-reagents/elisa-kits/'
          ),
        },
        {
          title: 'Mini Elisa Kits',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/antibodies-chemicals-and-reagents/mini-elisa-kit/'
          ),
        },
        {
          title: 'Polyclonal Custom Antibodies',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/antibodies-chemicals-and-reagents/polyclonal-custom-antibodies/'
          ),
        },
        {
          title: 'MICROTOMES',
          heading: true,
          link: getConductScienceUrl(
            '/product-category/animal-lab/electrophysiology/microtome/'
          ),
          break: true,
        },
      ],
      [
        {
          title: 'BENCHTOP EQUIPMENT',
          heading: true,
          link: getConductScienceUrl(
            '/product-category/specimen-lab/benchtop-equipment/'
          ),
        },
        {
          title: 'Autoclave',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/autoclave-research/'
          ),
        },
        {
          title: 'Balances, Scales and Weighing Equipment',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/balances/'
          ),
        },
        {
          title: 'Centrifuges',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/centrifuges/'
          ),
        },
        {
          title: 'Dry Baths',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/dry-baths/'
          ),
        },
        {
          title: 'Homogenizers',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/homogenizers/'
          ),
        },
        {
          title: 'Hotplates & Stirrers',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/benchtop-equipment/hot-plates-magnetic-stirrers/'
          ),
        },
        {
          title: 'Spectrophotometry',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/benchtop-equipment/spectrophotometry/'
          ),
        },
        {
          title: 'Vortex Mixers',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/vortex-mixer/'
          ),
        },
        {
          title: 'SLICE ELECTROPHYSIOLOGY',
          heading: true,
          link: getConductScienceUrl(
            '/product-category/animal-lab/electrophysiology/'
          ),
          break: true,
        },
        {
          title: 'Electrophysiology Chambers',
          link: getConductScienceUrl(
            '/product-category/animal-lab/electrophysiology/electrophysiology-chambers/'
          ),
        },
        {
          title: 'Semi Automated Slice Devices',
          link: getConductScienceUrl(
            '/product-category/animal-lab/electrophysiology/semi-automated-slice-lab/'
          ),
        },
        {
          title: 'Tissue Choppers',
          link: getConductScienceUrl(
            '/product-category/animal-lab/electrophysiology/tissue-choppers/'
          ),
        },
        {
          title: 'Visual Patching & Imaging Chamber',
          link: getConductScienceUrl(
            '/product-category/animal-lab/electrophysiology/visual-patching-imaging-chamber/'
          ),
        },
      ],
      [
        {
          title: 'MICROSCOPY',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/microscopy/'
          ),
          heading: true,
        },
        {
          title: 'Binocular Microscopes',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/microscopy/binocular-microscope/'
          ),
        },
        {
          title: 'Digital Microscopes',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/microscopy/digital-microscope/'
          ),
        },
        {
          title: 'Educational Microscopes',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/microscopy/educational-microscope/'
          ),
        },
        {
          title: 'Inverted Microscopes',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/microscopy/inverted-microscopes/'
          ),
        },
        {
          title: 'ELECTROPORATION',
          heading: true,
          break: true,
          link: getConductScienceUrl(
            '/product-category/specimen-lab/electroporation/'
          ),
        },
        {
          title: 'INCUBATORS',
          heading: true,
          link: getConductScienceUrl(
            '/product-category/specimen-lab/incubators/'
          ),
        },
        {
          title: 'Benchtop Incubators',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/incubators/benchtop-incubators/'
          ),
        },
        {
          title: 'Drying/Oven Incubators',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/incubators/drying-oven-incubators/'
          ),
        },
        {
          title: 'WATER QUALITY TESTING',
          heading: true,
          link: getConductScienceUrl(
            '/product-category/research-lab/environmental-science/water-quality-test-equipment/'
          ),
        },
      ],
      [
        {
          title: 'CRYOGENICS',
          heading: true,
          link: getConductScienceUrl(
            '/product-category/specimen-lab/cryogenics/'
          ),
        },
        {
          title: 'ELECTROPHORESIS',
          heading: true,
          link: getConductScienceUrl('/specimen-lab/electrophoresis/'),
        },
        {
          title: 'Automatic Gel Imaging System',
          link: getConductScienceUrl('/lab/automatic-gel-imaging-system/'),
        },
        {
          title: 'Fluorescent Quantitiaive PCR system',
          link: getConductScienceUrl(
            '/lab/fluroscent-quantitiaive-pcr-system/'
          ),
        },
        {
          title: 'Horizontal Electrophoresis Tank',
          link: getConductScienceUrl('/lab/horizontal-electrophoresis-tank/'),
        },
        {
          title: 'Vertical Electrophoresis Tank',
          link: getConductScienceUrl('/lab/vertical-electrophoresis-tank/'),
        },
        {
          title: 'HISTOLOGY AND CYTOLOGY',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/cytology/'
          ),
          heading: true,
        },
        {
          title: 'LAB GLASSWARE',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/glassware/'
          ),
          heading: true,
        },
        {
          title: 'LIQUID HANDLING',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/liquid-handling/'
          ),
          heading: true,
        },
        {
          title: 'MICROBIOLOGY',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/microbiology/'
          ),
          heading: true,
        },
      ],
    ],
  },
  {
    title: 'Animal Lab',
    fullSize: true,
    children: [
      [
        {
          title: 'ANESTHESIA',
          heading: true,
          link: getConductScienceUrl(
            '/product-category/animal-lab/anesthesia/'
          ),
        },
        {
          title: 'Anesthesia Accessories',
          link: getConductScienceUrl(
            '/product-category/animal-lab/anesthesia/anesthesia-accessories/'
          ),
        },
        {
          title: 'Anesthesia Machines',
          link: getConductScienceUrl(
            '/product-category/animal-lab/anesthesia/anesthesia-machines/'
          ),
        },
        {
          title: 'Anesthesia Masks',
          link: getConductScienceUrl(
            '/product-category/animal-lab/anesthesia/anesthesia-masks/'
          ),
        },
        {
          title: 'Animal Ventilation',
          link: getConductScienceUrl(
            '/product-category/animal-lab/animal-ventilation/'
          ),
        },
        {
          title: 'Drosophila Anesthesia',
          link: getConductScienceUrl(
            '/product-category/animal-lab/drosophila/drosophila-anesthesia/'
          ),
        },
      ],
      [
        {
          title: 'CAGES AND RESTRAINERS',
          heading: true,
          link: getConductScienceUrl(
            '/product-category/animal-lab/animal-cages-equipment/'
          ),
        },
        {
          title: 'Rodent Cages',
          link: getConductScienceUrl(
            '/product-category/animal-lab/animal-cages-equipment/rodent-cages/'
          ),
        },
        {
          title: 'Rodent Restrainers',
          link: getConductScienceUrl(
            '/product-category/animal-lab/animal-cages-equipment/restrainers/'
          ),
        },
        {
          title: 'MONITORING DEVICES',
          heading: true,
          break: true,
          link: getConductScienceUrl(
            '/product-category/animal-lab/monitoring-devices/'
          ),
        },
        {
          title: 'Cardiovascular Monitoning Systems',
          link: getConductScienceUrl(
            '/product-category/animal-lab/monitoring-devices/blood-pressure-monitoring-system/'
          ),
        },
        {
          title: 'Respiration Monitoring Systems',
          link: getConductScienceUrl(
            '/product-category/animal-lab/monitoring-devices/respiration-monitoring-system/'
          ),
        },
        {
          title: 'Rodent Monitoring Systems',
          link: getConductScienceUrl(
            'https://conductscience.com/product-category/animal-lab/rodent-monitoring-system/'
          ),
        },
        {
          title: 'Temperature Monitoring System',
          link: getConductScienceUrl(
            '/product-category/animal-lab/surgical-accessories/heat-temperature-controller/'
          ),
        },
      ],
      [
        {
          title: 'DROSOPHILA',
          heading: true,
          link: getConductScienceUrl(
            '/product-category/animal-lab/drosophila/'
          ),
        },
        {
          title: 'Drosophila Accessories',
          link: getConductScienceUrl(
            '/product-category/animal-lab/drosophila/drosophila-accesories-handling/'
          ),
        },
        {
          title: 'Drosophila Anesthesia',
          link: getConductScienceUrl(
            '/product-category/animal-lab/drosophila/drosophila-anesthesia/'
          ),
        },
        {
          title: 'Drosophila Food',
          link: getConductScienceUrl(
            '/product-category/animal-lab/drosophila/drosophila-food-and-media/'
          ),
        },
        {
          title: 'NEUROSCIENCE',
          link: getConductScienceUrl(
            '/product-category/animal-lab/neurosciences/'
          ),
          heading: true,
        },
        {
          title: 'MCAO Monofilament Sutures',
          link: getConductScienceUrl(
            '/product-category/animal-lab/imaging-system/mcao-sutures/'
          ),
        },
        {
          title: 'STEREOTAXIC INSTRUMENTS',
          link: getConductScienceUrl(
            '/product-category/animal-lab/stereotaxic/'
          ),
          heading: true,
          break: true,
        },
        {
          title: 'Stereotaxic Accessories',
          link: getConductScienceUrl(
            '/product-category/animal-lab/stereotaxic/stereotaxic-accesories/'
          ),
        },
        {
          title: 'Stereotaxic Impactors',
          link: getConductScienceUrl(
            '/product-category/animal-lab/stereotaxic/stereotaxic-impactors/'
          ),
        },
        {
          title: 'Stereotaxic Microscopes',
          link: getConductScienceUrl(
            '/product-category/animal-lab/drosophila/drosophila-food-and-media/#:~:text=Stereotaxic%20Microscopes'
          ),
        },
        {
          title: 'Stereotaxic Systems',
          link: getConductScienceUrl(
            '/product-category/animal-lab/stereotaxic/stereotaxic-systems-instruments/'
          ),
        },
      ],
      [
        {
          title: 'IMAGING SYSTEMS',
          heading: true,
          link: getConductScienceUrl(
            '/product-category/animal-lab/imaging-system/'
          ),
        },
        {
          title: 'Imaging Systems',
          link: getConductScienceUrl(
            '/product-category/animal-lab/imaging-system/'
          ),
        },
        {
          title: 'MRI Systems',
          link: getConductScienceUrl(
            '/product-category/animal-lab/imaging-system/'
          ),
        },
        {
          title: 'MICROINJECTION',
          heading: true,
          link: getConductScienceUrl(
            '/product-category/animal-lab/microinjection/'
          ),
        },
        {
          title: 'OPTOGENETICS',
          heading: true,
          link: getConductScienceUrl(
            '/product-category/animal-lab/optogenetics/'
          ),
        },
        {
          title: 'Fiber Photometry',
          link: getConductScienceUrl(
            '/product-category/animal-lab/optogenetics/fiber-photometry/'
          ),
        },
        {
          title: 'Optogenetic Accessories',
          link: getConductScienceUrl(
            '/product-category/animal-lab/optogenetics/optogenetic-accessories/'
          ),
        },
        {
          title: 'SURGICAL ACCESSORIES',
          heading: true,
          link: getConductScienceUrl(
            '/product-category/animal-lab/surgical-accessories/'
          ),
        },
        {
          title: 'Microdrill',
          link: getConductScienceUrl(
            '/product-category/animal-lab/optogenetics/fiber-photometry/'
          ),
        },
        {
          title: 'SURGICAL TOOLS',
          link: getConductScienceUrl(
            '/product-category/animal-lab/surgical-tools/'
          ),
          heading: true,
        },
        {
          title: 'SYRINGE PUMPS',
          link: getConductScienceUrl('/animal-lab/syringe-pumps/'),
          heading: true,
        },
        {
          title: 'TAIL INJECTION',
          link: getConductScienceUrl(
            '/product-category/specimen-lab/tail-injection/'
          ),
          heading: true,
        },
      ],
    ],
  },
  {
    title: 'Research Lab',
    link: getConductScienceUrl('/product-category/research-lab/'),
    children: [
      [
        {
          title: 'Conductor Software',
          link: getConductScienceUrl('/conductor/'),
        },
        {
          title: 'Digital Health',
          link: getConductScienceUrl('/digital-health'),
        },
        {
          title: 'Drones for Science',
          link: getConductScienceUrl('/software/drone-hypothesis/'),
        },
        {
          title: 'Environmental Science',
          link: getConductScienceUrl(
            '/product-category/environmental-science/'
          ),
          nested: [
            {
              title: 'Soil Studies',
              link: getConductScienceUrl(
                '/product-category/research-lab/environmental-science/soil-study/'
              ),
            },
            {
              title: 'Water Quality Test',
              link: getConductScienceUrl(
                '/product-category/research-lab/environmental-science/water-quality-test-equipment/'
              ),
            },
          ],
        },
        {
          title: 'Lab Safety Equipment',
          link: getConductScienceUrl(
            '/product-category/research-lab/lab-safety/'
          ),
          nested: [
            {
              title: 'Face Shields',
              link: getConductScienceUrl(
                '/product-category/research-lab/lab-safety/face-shields/'
              ),
            },
            {
              title: 'Gowns',
              link: getConductScienceUrl(
                '/product-category/research-lab/lab-safety/gowns/'
              ),
            },
            {
              title: 'Masks',
              link: getConductScienceUrl(
                '/product-category/research-lab/lab-safety/masks/'
              ),
            },
            {
              title: 'Safety Gloves',
              link: getConductScienceUrl(
                '/product-category/research-lab/lab-safety/safety-gloves/'
              ),
            },
          ],
        },
        {
          title: 'Microfluidic Chip',
          link: getConductScienceUrl(
            '/product-category/research-lab/microfluidics/'
          ),
        },
        {
          title: 'MRI Systems',
          link: getConductScienceUrl(
            '/product-category/research-lab/mri-systems-human-lab/'
          ),
        },
        {
          title: 'NMR Systems',
          link: getConductScienceUrl(
            '/product-category/research-lab/nmr-nuclear-magnetic-resonance/'
          ),
        },
        {
          title: 'Software',
          link: getConductScienceUrl('/software/'),
        },
        {
          title: 'Virtual Reality Science',
          link: getConductScienceUrl('/human-lab/simian-labs/'),
        },
        {
          title: 'Contact us',
          link: getConductScienceUrl('/contact-us/'),
        },
      ],
    ],
  },
  { title: 'Mazes', link: getConductScienceUrl('/maze/') },
  {
    title: 'Services',
    fullSize: true,
    link: getConductScienceUrl('/services/'),
    children: [
      [
        {
          title: 'CONTENT CREATION',
          heading: true,
          link: getConductScienceUrl('/content/'),
        },
        {
          title: 'WRITING',
          link: getConductScienceUrl('/writing/'),
          break: true,
          heading: true,
        },
      ],
      [
        {
          title: 'DATA',
          heading: true,
          link: getConductScienceUrl('/services/data/'),
        },
        {
          title: 'Data Analytics',
          link: getConductScienceUrl('/services/data/data-analytics/'),
        },
        {
          title: 'Data Statistics',
          link: getConductScienceUrl('/services/data/data-statistics/'),
        },
        {
          title: 'Data Visualization',
          link: getConductScienceUrl('/services/data/data-visualization/'),
        },
      ],
      [
        {
          title: 'DESIGN',
          heading: true,
          link: getConductScienceUrl('/services/design/'),
        },
        {
          title: 'Scientific Illustrations',
          link: getConductScienceUrl('/services/design/illustrations/'),
        },
        {
          title: 'GRANTS',
          heading: true,
          link: getConductScienceUrl('/grants/'),
        },
        {
          title: 'PROCUREMENT SERVICES',
          heading: true,
          link: getConductScienceUrl('/grants/grant-writing/'),
        },
        {
          title: 'TALENT',
          heading: true,
          link: getConductScienceUrl('/talent/'),
        },
      ],
      [
        {
          title: 'DEVELOPERS',
          heading: true,
          link: getConductScienceUrl('/services/developers/'),
        },
        {
          title: 'EDITING',
          heading: true,
          link: getConductScienceUrl('/editing/'),
        },
        {
          title: 'PROJECT MANAGEMENT',
          heading: true,
          link: getConductScienceUrl('/services/project-management/'),
        },
        {
          title: 'SOCIAL MEDIA',
          heading: true,
          link: getConductScienceUrl('/social-media/'),
        },
        {
          title: 'WEBSITES',
          heading: true,
          link: getConductScienceUrl('/websites/'),
        },
      ],
    ],
  },
  {
    title: 'Resources',
    fullSize: true,
    link: getConductScienceUrl('/resources/'),
    children: [
      [
        {
          title: 'CONDUCT',
          link: getConductScienceUrl('/resources/conduct/'),
        },
        {
          title: 'Academia',
          link: getConductScienceUrl('/academia/'),
        },
        {
          title: 'Career',
          link: getConductScienceUrl('/resources/career/'),
        },
        {
          title: 'Grants and Funding',
          link: getConductScienceUrl('/resources/grants/'),
        },
        {
          title: 'Lab Management',
          link: getConductScienceUrl('/resources/lab-management/'),
        },
        {
          title: 'Lifestyle',
          link: getConductScienceUrl('/resources/lifestyle/'),
        },
        {
          title: 'Purchasing Guides',
          link: getConductScienceUrl('/resources/purchasing-guides/'),
        },
        {
          title: 'Science and Public Policy',
          link: getConductScienceUrl(
            '/category/conduct/science-and-public-policy/'
          ),
        },
      ],
      [
        {
          title: 'SCIENCE',
          heading: true,
          link: getConductScienceUrl('/resources/science/'),
        },
        {
          title: 'Biomolecules',
          link: getConductScienceUrl('/category/science/biomolecules/'),
        },
        {
          title: 'Data Science',
          link: getConductScienceUrl('/category/science/data/'),
        },
        {
          title: 'DIY',
          link: getConductScienceUrl('/category/science/diy-science/'),
        },
        {
          title: 'Drone Science',
          link: getConductScienceUrl('/drone-science/'),
        },
        {
          title: 'Electrophysiology',
          link: getConductScienceUrl('/category/science/electrophysiology/'),
        },
        {
          title: 'Environmental Science',
          link: getConductScienceUrl(
            '/category/science/environmental-science/'
          ),
        },
        {
          title: 'Enzymology',
          link: getConductScienceUrl('/category/science/enzymology/'),
        },
        {
          title: 'Lab Basics',
          link: getConductScienceUrl('/category/science/lab-basics/'),
        },
        {
          title: 'Laboratory Techniques',
          link: getConductScienceUrl(
            '/category/science/laboratory-techniques/'
          ),
        },
        {
          title: 'Membranes',
          link: getConductScienceUrl('/category/science/membranes/'),
        },
        {
          title: 'Microbiology',
          link: getConductScienceUrl('/category/science/microbiology/'),
        },
        {
          title: 'Molecular Genetics',
          link: getConductScienceUrl('/category/science/molecular-genetics/'),
        },
        {
          title: 'Protocols',
          link: getConductScienceUrl('/resources/protocols/'),
        },
        {
          title: 'Soil Biology',
          link: getConductScienceUrl('/category/science/soil-biology/'),
        },
      ],
      [
        {
          title: 'DIGITAL HEALTH',
          heading: true,
          link: getConductScienceUrl('/category/digital-health/'),
        },
        {
          title: 'Health Sciences Research',
          link: getConductScienceUrl(
            '/category/digital-health/health-sciences-research/'
          ),
        },
        {
          title: 'Mobile Health',
          link: getConductScienceUrl('/category/digital-health/mobile-health/'),
        },
        {
          title: 'Virtual Reality Science',
          link: getConductScienceUrl(
            '/category/digital-health/virtual-reality-science/'
          ),
        },
        {
          title: 'METHODS',
          heading: true,
          link: getConductScienceUrl('/methods/'),
        },
        {
          title: 'Submission Guidelines',
          link: getConductScienceUrl('/methods/submission-methods-guidelines/'),
        },
        {
          title: 'Submit Methods',
          link: getConductScienceUrl('/methods/submit-your-research/'),
        },
        {
          title: 'Submit Methods',
          link: getConductScienceUrl('/methods/submit-your-research/'),
        },
        {
          title: 'Frequently Asked Questions',
          link: getConductScienceUrl('/methods/frequently-asked-questions/'),
        },
        {
          title: 'Contact',
          link: getConductScienceUrl('/methods/methods-contact/'),
        },
        {
          title: 'STORIES',
          heading: true,
          break: true,
          link: getConductScienceUrl('/resources/stories/'),
        },
        {
          title: 'VIEW ALL',
          heading: true,
          link: getConductScienceUrl('/resources/'),
        },
      ],
      [
        {
          title: 'LONG WHITE COAT',
          heading: true,
          link: getConductScienceUrl('/category/long-white-coat/'),
        },
        {
          title: 'Clinical Physical Exam',
          link: getConductScienceUrl(
            '/category/long-white-coat/clinical-physical-exam/'
          ),
        },
        {
          title: 'Clinical Tools & Guides',
          link: getConductScienceUrl(
            '/category/long-white-coat/clinical-tools-guides/'
          ),
        },
        {
          title: 'Coding & Billing',
          link: getConductScienceUrl(
            '/category/long-white-coat/coding-billing/'
          ),
        },
        { title: 'NEWS', heading: true, link: getConductScienceUrl('/news/') },
        {
          title: 'OPEN SCIENCE',
          heading: true,
          link: 'https://open.conductscience.com/',
        },
        {
          title: 'PODCAST',
          heading: true,
          link: getConductScienceUrl('/resources/podcast/'),
        },
        {
          title: 'Podcast: Conduct Science',
          link: getConductScienceUrl(
            '/category/podcast/podcast-data-analysis/'
          ),
        },
        {
          title: 'Podcast: Method Section',
          link: getConductScienceUrl(
            '/category/podcast/podcast-method-section/'
          ),
        },
        {
          title: 'Podcast: Under the Microscope',
          link: getConductScienceUrl(
            '/category/podcast/podcast-under-the-microscope/'
          ),
        },
        {
          title: 'SUBMIT',
          heading: true,
          link: getConductScienceUrl('/resources/submit/'),
        },
      ],
    ],
  },
  {
    title: 'About us',
    link: getConductScienceUrl('/about-us/'),
    children: [
      [
        {
          title: 'Our Story',
          link: getConductScienceUrl('/about-us/'),
          nested: [
            {
              title: 'Leadership',
              link: getConductScienceUrl('/about-us/leadership/'),
            },
            {
              title: 'Our Brands',
              link: getConductScienceUrl('/about-us/overview/'),
            },
            {
              title: 'Explorers',
              link: getConductScienceUrl('/about-us/explorers/'),
            },
            {
              title: 'Press',
              link: getConductScienceUrl('/about-us/press/'),
            },
            {
              title: 'Publications',
              link: getConductScienceUrl('/about-us/publications/'),
            },
            {
              title: 'Work',
              link: getConductScienceUrl('/about-us/work/'),
            },
          ],
        },
        {
          title: 'Our Partners',
          link: getConductScienceUrl('/partners/'),
        },
        {
          title: 'Privacy Policy',
          link: getConductScienceUrl('/privacy-policy/'),
        },
        {
          title: 'Career Opportunities',
          link: getConductScienceUrl('/career-opportunities/'),
        },
        {
          title: 'Scientific Scholarship',
          link: getConductScienceUrl('/about-us/scientific-scholarship/'),
        },
        {
          title: 'Tech Transfer',
          link: getConductScienceUrl('/tech-transfer/'),
          nested: [
            {
              title: 'About Tech Transfer',
              link: getConductScienceUrl('/tech-transfer-contracts/'),
            },
            {
              title: 'Easy Access IP',
              link: getConductScienceUrl('/tech-transfer/easy-access-ip/'),
            },
            {
              title: 'Why Tech Transfer',
              link: getConductScienceUrl('/why-tech-transfer/'),
            },
          ],
        },
        {
          title: 'Vendor',
          link: getConductScienceUrl('/vendor/'),
        },
      ],
    ],
  },
  {
    title: 'Contact',
    children: [
      [
        {
          title: 'Contact Us',
          link: getConductScienceUrl('/contact-us/contact-us-form/'),
        },
        {
          title: 'Track Order',
          link: getConductScienceUrl('/track/'),
        },
        {
          title: 'Book Appointment',
          link: getConductScienceUrl('/schedule/'),
        },
        {
          title: 'Request a Quote',
          link: getConductScienceUrl('/request-quote/'),
        },
        {
          title: 'Support Ticket',
          link: getConductScienceUrl(
            '/my-account/support-ticket/?wpsc-section=ticket-list/'
          ),
        },
        {
          title: '(888) 267-4324',
          link: '/contact-us/',
        },
      ],
    ],
  },
];

export const Menu: FC<MenuProps> = () => {
  const [search, setSearch] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const handleSearchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    redirect(getConductScienceUrl(`/#f705/fullscreen/m=f&q=${search}`));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsSticky(true);
      } else if (window.scrollY < 80) {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={cx('z-20 bg-white pb-4 xl:pb-0', {
          'sticky left-0 top-0': isSticky,
        })}
      >
        <Container className='relative pt-4'>
          <Flex className='flex-wrap md:flex-nowrap md:gap-14' justify='center'>
            <Flex className='w-full justify-center md:w-auto'>
              <a href={getConductScienceUrl()}>
                <Image
                  src='/images/logo.png'
                  alt='logo'
                  width={80}
                  height={80}
                />
              </a>
            </Flex>
            <form
              onSubmit={handleSearchSubmit}
              className={cx('mt-4 w-10/12 md:mt-0 md:w-full', {
                'mb-2 hidden xl:flex': isSticky,
              })}
            >
              <SearchField
                value={search}
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  setSearch(target.value);
                }}
                placeholder='Find anything for your science'
                containerClassName='w-full'
              />
            </form>
            <Flex gap='sm' items='center'>
              <MenuIcons className='hidden text-xl md:flex' hideShopIcon />
              <RxHamburgerMenu
                className={cx(
                  'absolute right-6 top-6 cursor-pointer text-2xl text-primary-800 md:static',
                  {
                    'xl:hidden': !isSticky,
                  }
                )}
                onClick={() => setIsMobileMenuOpen(true)}
              />
            </Flex>
          </Flex>
          {!isSticky && (
            <DesktopMenu menu={menu} className='mt-1 hidden xl:flex' />
          )}
        </Container>
      </div>
      <ClientPortal selector='portal'>
        <div
          className={cx(
            'sticky bottom-0 left-0 z-20 w-full bg-white py-6 shadow-md md:hidden',
            { hidden: !isSticky },
            css`
              box-shadow:
                rgba(0, 0, 0, 0.16) 0px 3px 6px,
                rgba(0, 0, 0, 0.23) 0px 3px 6px;
            `
          )}
        >
          <MenuIcons className='px-10' />
        </div>
      </ClientPortal>
      <ClientPortal selector='portal'>
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          menu={menu}
        />
      </ClientPortal>
    </>
  );
};
