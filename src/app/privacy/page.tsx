import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Southbank Alumni Network",
  description:
    "How the Southbank Alumni Network collects, uses and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <section className="pt-32 pb-24 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            <strong className="text-gray-500">Southbank Alumni Network</strong>
            &nbsp;&middot;&nbsp;Last updated: 3 May 2026
          </p>

          <div className="mt-12 space-y-10 text-base text-gray-600 leading-relaxed">
            {/* Who we are */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Who we are
              </h2>
              <p>
                The Southbank Alumni Network (&ldquo;we&rdquo;,
                &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a student-led project
                that operates the website at southbank-alumni.vercel.app. This
                platform helps current Southbank International School students
                connect with alumni for advice, mentorship and project support.
              </p>
              <p className="mt-4">
                For any questions about this policy or your data, contact us at:{" "}
                <a
                  href="mailto:maxelijahcoppel@gmail.com"
                  className="text-[#7BAFD4] hover:underline"
                >
                  maxelijahcoppel@gmail.com
                </a>
              </p>
            </section>

            {/* What data we collect */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                What data we collect
              </h2>
              <p>
                When an alumni submits a profile to the network, we collect the
                following information:
              </p>
              <ul className="mt-3 space-y-1.5 list-disc list-outside pl-5 text-gray-500">
                <li>Full name</li>
                <li>Undergraduate degree</li>
                <li>University</li>
                <li>Location (city and country)</li>
                <li>
                  Higher Level IB subjects (and optionally, past teachers)
                </li>
                <li>Current profession</li>
                <li>Advice for current IB students</li>
                <li>Favourite memory at Southbank</li>
                <li>Whether you took a gap year</li>
                <li>Most interesting class in first year of university</li>
                <li>LinkedIn profile URL</li>
                <li>
                  Whether you are open to being contacted by students via
                  LinkedIn
                </li>
              </ul>

              <p className="mt-5">
                When students post on the project feed, we collect:
              </p>
              <ul className="mt-3 space-y-1.5 list-disc list-outside pl-5 text-gray-500">
                <li>Name</li>
                <li>Project description and details</li>
                <li>Subject tags and logistics</li>
              </ul>

              <p className="mt-5">
                We do not collect passwords, financial information, or any
                special category data (such as health, ethnicity, religion or
                political opinions).
              </p>
            </section>

            {/* How we use your data */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                How we use your data
              </h2>
              <p>
                We use the data we collect for the following purposes only:
              </p>
              <ul className="mt-3 space-y-1.5 list-disc list-outside pl-5 text-gray-500">
                <li>
                  Displaying alumni profiles on the Southbank Alumni Network
                  website so current students can browse and filter them
                </li>
                <li>
                  Displaying student project proposals on the public feed
                </li>
                <li>
                  Allowing students to find relevant alumni based on their
                  university, profession, location and other profile fields
                </li>
                <li>
                  Linking to your LinkedIn profile if you have opted in to being
                  contacted
                </li>
              </ul>
              <p className="mt-5">
                We will never use your data for marketing, advertising, or
                selling to third parties. We will never share your data with any
                third party unless required by law.
              </p>
            </section>

            {/* Lawful basis */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Our lawful basis for processing
              </h2>
              <p>
                Under the UK GDPR, we process your personal data on the basis of
                your explicit consent. You give this consent when you submit your
                profile through our alumni form and tick the consent checkbox.
                You can withdraw your consent at any time (see &ldquo;Your
                rights&rdquo; below).
              </p>
            </section>

            {/* Storage and protection */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                How we store and protect your data
              </h2>
              <p>
                Your data is stored in a secure PostgreSQL database hosted by
                Supabase. We take reasonable measures to protect your data,
                including:
              </p>
              <ul className="mt-3 space-y-1.5 list-disc list-outside pl-5 text-gray-500">
                <li>
                  All data is transmitted over encrypted HTTPS connections
                </li>
                <li>
                  Database access is restricted to authorised administrators only
                </li>
                <li>
                  Alumni profiles are reviewed and approved by an admin before
                  being published
                </li>
              </ul>
              <p className="mt-5">
                Your data is stored on servers located in the United Kingdom (AWS
                eu-west-2, London) via Supabase&apos;s managed cloud. Your data
                does not leave the UK.
              </p>
            </section>

            {/* Retention */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                How long we keep your data
              </h2>
              <p>
                We keep your profile data for as long as it is displayed on the
                platform and you have not withdrawn consent. We review all stored
                data annually to ensure it is still necessary and accurate.
              </p>
              <p className="mt-4">
                If you withdraw consent or request deletion, we will delete your
                data within 30 days of receiving your request.
              </p>
              <p className="mt-4">
                If the Southbank Alumni Network project is discontinued, all
                personal data will be securely deleted within 90 days unless the
                platform is transferred to Southbank International School, in
                which case the school&apos;s own data protection policies will
                apply and you will be notified.
              </p>
            </section>

            {/* Messaging and LinkedIn */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Messaging and LinkedIn
              </h2>
              <p>
                We do not operate any messaging or communication system on this
                website. If you have opted in to being contacted, students are
                directed to your LinkedIn profile via an external link. Any
                communication that takes place on LinkedIn is governed by
                LinkedIn&apos;s own privacy policy and terms of service. We have
                no access to, and take no responsibility for, any messages
                exchanged on LinkedIn.
              </p>
            </section>

            {/* Your rights */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Your rights
              </h2>
              <p>
                Under UK GDPR, you have the following rights regarding your
                personal data:
              </p>
              <ul className="mt-3 space-y-1.5 list-disc list-outside pl-5 text-gray-500">
                <li>
                  <strong className="text-gray-600">Right to access:</strong>{" "}
                  You can request a copy of all the data we hold about you.
                </li>
                <li>
                  <strong className="text-gray-600">
                    Right to rectification:
                  </strong>{" "}
                  You can ask us to correct any inaccurate data.
                </li>
                <li>
                  <strong className="text-gray-600">Right to erasure:</strong>{" "}
                  You can ask us to delete your data at any time. We will do so
                  within 30 days.
                </li>
                <li>
                  <strong className="text-gray-600">
                    Right to restrict processing:
                  </strong>{" "}
                  You can ask us to temporarily stop using your data while a
                  concern is resolved.
                </li>
                <li>
                  <strong className="text-gray-600">
                    Right to data portability:
                  </strong>{" "}
                  You can request your data in a commonly used format.
                </li>
                <li>
                  <strong className="text-gray-600">Right to object:</strong>{" "}
                  You can object to our processing of your data.
                </li>
                <li>
                  <strong className="text-gray-600">
                    Right to withdraw consent:
                  </strong>{" "}
                  You can withdraw your consent at any time by contacting us at{" "}
                  <a
                    href="mailto:maxelijahcoppel@gmail.com"
                    className="text-[#7BAFD4] hover:underline"
                  >
                    maxelijahcoppel@gmail.com
                  </a>
                  .
                </li>
              </ul>
              <p className="mt-5">
                To exercise any of these rights, email us at{" "}
                <a
                  href="mailto:maxelijahcoppel@gmail.com"
                  className="text-[#7BAFD4] hover:underline"
                >
                  maxelijahcoppel@gmail.com
                </a>
                . We will respond within 30 days.
              </p>
            </section>

            {/* Keeping data accurate */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Keeping your data accurate
              </h2>
              <p>
                We will contact alumni annually to ask them to review and confirm
                their profile information is still accurate and that they still
                consent to their data being displayed. If an alumni does not
                respond after two attempts, their profile will be removed from
                the site and their data deleted.
              </p>
            </section>

            {/* Children's data */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Children&apos;s data
              </h2>
              <p>
                This platform is designed for use by Southbank International
                School students, some of whom may be under 18. Students under 18
                who wish to post on the project feed should have parental or
                guardian consent. We do not knowingly collect profile data from
                anyone under 16 without parental consent.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Cookies
              </h2>
              <p>
                We use only essential cookies required for the website to
                function. We do not use tracking cookies, analytics cookies, or
                advertising cookies.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Changes to this policy
              </h2>
              <p>
                We may update this privacy policy from time to time. Any changes
                will be posted on this page with an updated date. If we make
                significant changes that affect how your data is used, we will
                make reasonable efforts to notify you.
              </p>
            </section>

            {/* Complaints */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Complaints
              </h2>
              <p>
                If you are unhappy with how we have handled your data, you have
                the right to complain to the Information Commissioner&apos;s
                Office (ICO):
              </p>
              <ul className="mt-3 space-y-1.5 list-disc list-outside pl-5 text-gray-500">
                <li>
                  Website:{" "}
                  <a
                    href="https://ico.org.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7BAFD4] hover:underline"
                  >
                    ico.org.uk
                  </a>
                </li>
                <li>Telephone: 0303 123 1113</li>
              </ul>
            </section>
          </div>

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="text-sm text-[#7BAFD4] hover:underline"
            >
              &larr; Back to the map
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
