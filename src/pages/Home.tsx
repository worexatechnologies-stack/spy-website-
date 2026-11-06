import Hero from '../components/home/Hero';
import AboutPreview from '../components/home/AboutPreview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ServicesPreview from '../components/home/ServicesPreview';
import Testimonials from '../components/home/Testimonials';
import HomeFAQ from '../components/home/HomeFAQ';
import CTA from '../components/home/CTA';

export default function Home() {
  return (
    <>
    <head>
   <title id="metaTitle">Private Investigator Near Me | SpySense Detective Agency</title>
   <meta name="description" id="metaDescription" content="Looking for a trusted private investigator near me? SpySense provides professional background checks, surveillance, and confidential detective services"/>
   <meta name="keywords" id="metaKeywords" content="private investigator near me, secret detective agency, good private investigator, private detective near me, spy detective agency in bangalore, private detectives and investigators near me, best detective agencies, special detective agency, private investigation agency near me, best private detective agency, trusted detective agency"/>
   <meta id="ogTitle" property="og:title" content="Private Investigator Near Me | SpySense Detective Agency"/>
   <meta id="ogType" property="og:type" content="website"/>
   <meta id="ogDescription" property="og:description" content="Looking for a trusted private investigator near me? SpySense provides professional background checks, surveillance, and confidential detective services"/>
   <meta id="ogUrl" property="og:url" content="https://spysense.in/"/>
   <meta id="ogSiteName" property="og:site_name" content="Private Investigator Near Me | SpySense Detective Agency"/>
   <meta id="ogImage" property="og:image" content="https://spysense.in/images/spy-sense-logo2.png"/>
   <meta id="twitterSite" name="twitter:site" content="https://twitter.com/"/>
   <meta id="twitterTitle" name="twitter:title" content="Private Investigator Near Me | SpySense Detective Agency"/>
   <meta id="twitterDescription" name="twitter:description" content="Looking for a trusted private investigator near me? SpySense provides professional background checks, surveillance, and confidential detective services"/>
   <meta id="author" name="author" content="Akshay"/>
   <link id="canonical" rel="canonical" href="https://spysense.in/"/>
   <meta id="indexingStatus" name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
   <meta id="Publisher" property="publisher" content="Worexa Technologies"/>
   <meta property="og:locale" content="en_US"/>
</head>
      <Hero />
      <AboutPreview />
      <WhyChooseUs />
      <ServicesPreview />
      <Testimonials />
      <HomeFAQ />
      <CTA />
    </>
  );
}
