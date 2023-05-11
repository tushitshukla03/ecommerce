import React from 'react';
import moment from 'moment/moment';
const TermsOfUse = () => {
    const date = moment();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Terms of Use for DamnGood</h1>
      <p className="text-gray-600 mb-4">Effective Date: {date.format('DD/MM/YYYY')}</p>
      <p className="text-gray-700 mb-4">Welcome to DamnGood! These Terms of Use &#34;Terms&#34; govern your access to and use of the DamnGood website the &#34;Website&#34;. Please read these Terms carefully before using the Website. By accessing or using the Website, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms or our Privacy Policy, please do not use the Website.</p>
      
      <h2 className="text-xl font-bold text-gray-800 mb-2">1. Acceptance of Terms</h2>
      <p className="text-gray-700 mb-4">By accessing or using the Website, you affirm that you are at least 18 years old and capable of entering into a legally binding agreement.</p>

      <h2 className="text-xl font-bold text-gray-800 mb-2">2. Intellectual Property Rights</h2>
      <p className="text-gray-700 mb-4">The Website and its original content, features, and functionality are owned by DamnGood and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
      <p className="text-gray-700 mb-4">You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Website, use of the Website, or access to the Website without our express written permission.</p>

      <h2 className="text-xl font-bold text-gray-800 mb-2">3. User Content</h2>
      <p className="text-gray-700 mb-4">You grant DamnGood a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use any content that you post, upload, or otherwise submit to the Website &#34;User Content&#34;. You represent and warrant that you own or have the necessary licenses, rights, consents, and permissions to grant this license.</p>
      <p className="text-gray-700 mb-4">You agree not to post, upload, or otherwise submit any User Content that: (i) infringes on any third party&#39;s intellectual property rights; (ii) is defamatory, obscene, abusive, or otherwise violates any law or right of any third party; or (iii) contains viruses or other harmful code.</p>
      
      <h2 className="text-xl font-bold text-gray-800 mb-2">4. Prohibited Activities</h2>
      <p className="text-gray-700 mb-4">You agree not to engage in any of the following prohibited activities:</p>
      <ul className="list-disc list-inside text-gray-700 ml-8 mb-4">
        <li>Violating any law, regulation, or judicial or governmental order;</li>
        <li>Interfering with, disrupting, or causing damage to the Website, its servers, or its networks;</li>
        <li>Impersonating any person or entity or falsely stating or otherwise misrepresenting your affiliation with a person or entity;</li>
        <li>Collecting or storing personal information about other users without their consent;</li>
        <li>Engaging in any other activity that DamnGood determines is harmful to the Website, its users, or its partners.</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mb-2">5. Disclaimer of Warranties</h2>
<p className="text-gray-700 mb-4">The Website is provided on an &#34;as is&#34; and &#34;as available&#34; basis, without any warranties of any kind, express or implied.</p>
<p className="text-gray-700 mb-4">DamnGood does not make any representations or warranties of any kind, whether express or implied, regarding the operation, availability, accuracy, reliability, or completeness of the Website.</p>
<p className="text-gray-700 mb-4">DamnGood disclaims all warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. Additionally, DamnGood does not warrant that the Website will be error-free, uninterrupted, secure, or free of viruses or other harmful components.</p>
<p className="text-gray-700 mb-4">You acknowledge and agree that your use of the Website is at your own risk and that DamnGood shall not be liable for any damages or losses resulting from the use of the Website.</p>

      </div>)}

export default TermsOfUse